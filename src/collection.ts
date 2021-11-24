import type { CollectionName, CollectionData, StorageConfig, DocumentID, DocumentData } from "./type";
import type { FieldName, FieldData } from "./type";
import type { Options, OrderBy, SearchOptions } from "./type";
import type { EncryptionOptions } from "./type";

import type { QueryType, StringQuery, ConditionalQuery, QueryCondition, QueryOperator } from "./search-query";
import SearchQuery from "./search-query";
import type { StrategyFunc } from "./search-strategy";

import DocumentOrder from "./order";

export default abstract class Collection {
	// General information of document collection
	protected _storageName: string;
	protected _name: CollectionName;
	protected _order: DocumentOrder;

	// Default search options
	protected _searchOptions: SearchOptions = {
		fuzzy: false,
		limit: Number.MAX_SAFE_INTEGER,
	};

	// TODO: Default data encryption options
	protected _encryptionOptions: EncryptionOptions = {
		algorithm: "sha256",
	};

	// Document collection data
	protected _collection: any;

	constructor(name: CollectionName, order: DocumentOrder, options: Options) {
		this._order = order;
		this._storageName = options.name;
		this._name = name;

		Object.assign(this._searchOptions, options.search);

		// TODO: Encryption options
	}

	protected _isValidConfig = (config: StorageConfig | undefined, necessaries: Array<string>): boolean => {
		if (!config) return false;
		let result: boolean = true;
		for (let i = 0; i < necessaries.length; i++) {
			if (!(necessaries[i] in config)) {
				result = false;
				break;
			}
		}
		return result;
	};

	abstract keys(): Promise<Array<DocumentID>>;

	abstract get(docId: DocumentID): Promise<DocumentData | null>;

	abstract set(docId: DocumentID, doc: DocumentData): Promise<boolean>;

	abstract update(docId: DocumentID, doc: DocumentData): Promise<boolean>;

	abstract sort(orderBy: OrderBy, range?: Array<DocumentID>): Promise<Array<DocumentID>>;

	/**
	 * Collection.search is asynchronous.
	 *
	 * Note that `search()` does not perform sorting.
	 *
	 * @param query Search query
	 * @param options Search options
	 */
	abstract search(query: SearchQuery, options: SearchOptions): Promise<Array<DocumentID>>;

	abstract remove(docId: DocumentID): Promise<boolean>;

	abstract clear(): Promise<boolean>;

	abstract destroy(): Promise<boolean>;

	protected _findStringMatches = (
		query: SearchQuery,
		docData: DocumentData,
		strategy: StrategyFunc,
		exclude: string[]
	): boolean => {
		for (const field in docData) {
			if (field[0] === "_") continue;
			const data: FieldData = docData[field].toString();
			if (!this._isExcluded(data, exclude) && strategy(query.data() as string, data)) return true;
		}
		return false;
	};

	protected _findConditionalMatches = (query: SearchQuery, docData: DocumentData): boolean => {
		for (const [field, condition] of Object.entries(query.data() as ConditionalQuery)) {
			if (!(field in docData)) return false;
			const data: FieldData = docData[field];

			// Query operators: ["<", "<=", "==", "!=", ">=", ">", "array-contains", "array-contains-any", "in", "not-in"]
			const operator: QueryOperator = condition[0];
			const value: FieldData = condition[1];
			if (typeof data === typeof value) {
				if (typeof data === "string" || typeof data === "number" || typeof data === "boolean") {
					if (operator === "<") {
						if (!(data < value)) return false;
					} else if (operator === "<=") {
						if (!(data <= value)) return false;
					} else if (operator === "==") {
						if (!(data == value)) return false;
					} else if (operator === "!=") {
						if (!(data != value)) return false;
					} else if (operator === ">=") {
						if (!(data >= value)) return false;
					} else if (operator === ">") {
						if (!(data > value)) return false;
					} else return false;
				} else {
					// data(array) "array-contains-any" value(array)
					if (operator === "array-contains-any") {
						if (Array.isArray(data) && Array.isArray(value)) {
							let contains: boolean = false;
							for (const v of value) {
								if (data.includes(v)) {
									contains = true;
									break;
								}
							}
							if (!contains) return false;
						} else return false;
					} else return false;
				}
			} else {
				// data(array) "array-contains" value(string | number | boolean)
				if (operator === "array-contains") {
					if (Array.isArray(data)) {
						if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
							if (!data.includes(value)) return false;
						} else return false;
					} else return false;
				}
				// data(string | number | boolean) "in" value(array)
				else if (operator === "in") {
					if (Array.isArray(value)) {
						if (typeof data === "string" || typeof data === "number" || typeof data === "boolean") {
							if (!value.includes(data)) return false;
						} else return false;
					} else return false;
				}
				// (data: string | number | boolean) "not-in" (value: array | value.toString(): string)
				else if (operator === "not-in") {
					if (typeof data === "string" || typeof data === "number" || typeof data === "boolean") {
						if (Array.isArray(value)) {
							if (value.includes(data)) return false;
						} else if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
							if (!new RegExp(data.toString()).test(value.toString())) return false;
						} else return false;
					} else return false;
				} else return false;
			}
		}
		return true;
	};

	protected _isExcluded = (docData: string, exclude: string[]): boolean => {
		for (let i = 0, len = exclude.length; i < len; i++) {
			if (new RegExp(exclude[i]).test(docData)) return true;
		}
		return false;
	};

	public import = async (data: CollectionData): Promise<boolean> => {
		// TODO:

		return true;
	};

	public export = async (range: Array<DocumentID>): Promise<CollectionData> => {
		if (!range) return {};
		const allDocuments = await Promise.all(
			range.map(async (docId: DocumentID): Promise<CollectionData> => {
				let singleDocument: CollectionData = {};
				const docData: DocumentData | null = await this.get(docId);
				if (docData) singleDocument[docId] = docData;
				return singleDocument;
			})
		);
		let jsonified: CollectionData = {};
		allDocuments.forEach((singleDocument: CollectionData) => {
			Object.assign(jsonified, singleDocument);
		});
		return jsonified;
	};
}
