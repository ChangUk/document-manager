import SimpleAsyncLock from "simple-async-lock";

import type { CollectionName, DocumentID, DocumentData } from "./type";
import type { FieldName, FieldData } from "./type";
import type { Options, OrderBy } from "./type";

import CollectionWrapper from "./wrapper";

import CollectionJSON from "./collection-json";
import CollectionIDB from "./collection-indexeddb";
import CollectionFirestore from "./collection-firestore";

export const orderCollectionName = "_orders";

export type OrdersData = {
	[field: FieldName]: Array<DocumentID>;
};
export type OrderIndexes = {
	[field: FieldName]: number;
};

export default class DocumentOrder {
	private _orderCollection: CollectionJSON | CollectionIDB | CollectionFirestore;

	private _docCollection: CollectionWrapper;
	private _options: Options;

	// Order data
	private _overall: Array<DocumentID> = [];
	private _foreach: OrdersData = {};

	// Mutex
	private _mutex: SimpleAsyncLock = new SimpleAsyncLock(1);

	constructor(docCollection: CollectionWrapper, options: Options) {
		this._docCollection = docCollection;
		this._options = options;

		// `options.storage` is always existing.
		const storage = options.storage.toLowerCase();
		if (storage === "json") {
			this._orderCollection = new CollectionJSON(orderCollectionName, this, options);
		} else if (storage === "indexeddb") {
			this._orderCollection = new CollectionIDB(orderCollectionName, this, options);
		} else if (storage === "firestore") {
			this._orderCollection = new CollectionFirestore(orderCollectionName, this, options);
		} else {
			throw new Error(`Invalid storage: ${options.storage}`);
		}
	}

	/**
	 * Load all order data from the storage.
	 */
	public load = async () => {
		// Initialize comprehensive document order
		const range = await this._docCollection.keys();
		this._overall = range;

		// Load document orders for each field
		const orderData = await this._orderCollection.get(this._docCollection.name());
		if (orderData) {
			this._foreach = orderData as OrdersData;

			// Sort the comprehensive documents if ordering options are given.
			const orderBy = this._options?.search?.orderBy;
			if (orderBy) this._overall = await this.sort(orderBy, range);
		} else {
			this._foreach = {};
			await this._orderCollection.set(this._docCollection.name(), this._foreach);
		}
	};

	/**
	 * Get comprehensive document order.
	 *
	 * @returns Comprehensive document order.
	 */
	public order = () => {
		return this._overall;
	};

	/**
	 * Get document order data for the given field names.
	 *
	 * @param docId Document ID.
	 * @param fields Array of field names.
	 * @returns Document order data for each field.
	 */
	public get = (docId: DocumentID, fields: Array<FieldName>): OrderIndexes => {
		let indexes: OrderIndexes = {};
		fields.forEach((field: FieldName) => {
			if (field in this._foreach) indexes[field] = this._foreach[field].indexOf(docId);
		});
		return indexes;
	};

	/**
	 * Set document order.
	 *
	 * @param docData Document data
	 * @returns `true` if success, `false` otherwise.
	 */
	public set = async (docData: DocumentData): Promise<boolean> => {
		if (!docData) return false;
		let tasks: Array<Promise<any>> = [];
		let indexes: OrderIndexes = {};

		await this._mutex.lock();

		for (const field in docData) {
			if (field[0] === "_") continue;
			if (typeof docData[field] === "string" || typeof docData[field] === "number") {
				if (!(field in this._foreach)) this._foreach[field] = [];
				tasks.push(
					this._findIdx(field, docData, 0, this._foreach[field].length).then((result: OrderIndexes) => {
						Object.assign(indexes, result);
					})
				);
			}
		}

		// Wait for all tasks done.
		await Promise.all(tasks);

		// Insert indexes
		for (const [field, index] of Object.entries(indexes)) {
			if (!this._foreach[field].includes(docData._id as DocumentID))
				this._foreach[field].splice(index, 0, docData._id as DocumentID);
		}
		const result = await this._orderCollection.set(this._docCollection.name(), this._foreach);

		this._mutex.unlock();

		return result;
	};

	private _findIdx = async (
		field: FieldName,
		newData: DocumentData,
		start: number,
		length: number
	): Promise<OrderIndexes> => {
		let result: OrderIndexes = {};
		const newValue: FieldData = newData[field];

		if (length === 0) {
			if (typeof newValue === "number" || typeof newValue === "string") {
				result[field] = 0;
				return result;
			} else return {};
		} else if (length === 1) {
			const pivot: number = start;
			const pivotData = await this._docCollection.get(this._foreach[field][pivot]);
			if (pivotData) {
				const pivotValue: FieldData = pivotData[field];
				try {
					if (typeof newValue === "number") {
						result[field] = newValue <= (pivotValue as number) ? pivot : pivot + 1;
						return result;
					} else if (typeof newValue === "string") {
						result[field] = newValue <= (pivotValue as string) ? pivot : pivot + 1;
						return result;
					}
				} catch (err) {}
			}
			return {};
		} else {
			// O(log_2) time complexity
			const pivot: number = start + ~~((length - 1) / 2);
			const pivotData = await this._docCollection.get(this._foreach[field][pivot]);
			if (pivotData) {
				const pivotValue: FieldData = pivotData[field];
				try {
					if (typeof newValue === "number") {
						return newValue <= (pivotValue as number)
							? await this._findIdx(field, newData, start, pivot + 1 - start)
							: await this._findIdx(field, newData, pivot + 1, start + length - 1 - pivot);
					} else if (typeof newValue === "string") {
						return newValue <= (pivotValue as string)
							? await this._findIdx(field, newData, start, pivot + 1 - start)
							: await this._findIdx(field, newData, pivot + 1, start + length - 1 - pivot);
					}
				} catch (err) {}
			}
			return {};
		}
	};

	/**
	 * Make order data as an empty array.
	 *
	 * @returns True if the task is successfully done, false otherwise.
	 */
	public reset = async (): Promise<boolean> => {
		for (const field in this._foreach) this._foreach[field] = [];
		return await this._orderCollection.set(this._docCollection.name(), this._foreach);
	};

	/**
	 * Get the sorting result.
	 *
	 * @param orderBy Sorting options.
	 * @param range Array of documents to be sorted.
	 * @returns	The sorting result.
	 */
	public sort = async (orderBy: OrderBy, range: Array<DocumentID>): Promise<Array<DocumentID>> => {
		const compare = (orderBy: OrderBy): ((a: DocumentID, b: DocumentID) => number) => {
			if (!orderBy) {
				return (a: DocumentID, b: DocumentID) => {
					return 0;
				};
			}
			let directions: Array<number> = [];
			const fields = orderBy.map((field: string, i: number) => {
				if (field[0] === "-") {
					directions[i] = -1;
					field = field.substring(1);
				} else directions[i] = 1;
				return field;
			});
			return (a: DocumentID, b: DocumentID) => {
				if (fields) {
					const ordersA = this.get(a, fields);
					const ordersB = this.get(b, fields);
					for (let i = 0; i < fields.length; i++) {
						const field = fields[i];
						if (ordersA[field] > ordersB[field]) return directions[i];
						if (ordersA[field] < ordersB[field]) return -directions[i];
					}
				}
				return 0;
			};
		};
		return range.sort(compare(orderBy));
	};

	/**
	 * Remove document ID from the indexes data.
	 *
	 * @param docId Document ID to be removed from the indexes data.
	 * @returns True if the task is successfully done, false otherwise.
	 */
	public remove = async (docId: DocumentID): Promise<boolean> => {
		for (const field in this._foreach) {
			this._foreach[field] = this._foreach[field].filter((id) => id !== docId);
		}
		return await this._orderCollection.set(this._docCollection.name(), this._foreach);
	};

	/**
	 * Remove the order data for the target document collection.
	 *
	 * @returns True if the task is successfully done, false otherwise.
	 */
	public destroy = async (): Promise<boolean> => {
		return await this._orderCollection.remove(this._docCollection.name());
	};
}
