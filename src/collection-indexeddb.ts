import localForage from "localforage";

import type { CollectionName, CollectionData, DocumentID, DocumentData } from "./type";
import type { FieldName, FieldData } from "./type";
import type { Options, OrderBy, SearchOptions } from "./type";
import type { EncryptionOptions } from "./type";

import type { QueryType, StringQuery, ConditionalQuery, QueryCondition } from "./search-query";
import SearchQuery from "./search-query";
import type { StrategyFunc } from "./search-strategy";
import SearchStrategy from "./search-strategy";

import DocumentOrder from "./order";
import Collection from "./collection";

export default class CollectionIDB extends Collection {
	constructor(name: CollectionName, order: DocumentOrder, options: Options) {
		super(name, order, options);

		try {
			// `LocalForage` instance
			this._collection = localForage.createInstance({
				name: this._storageName,
				storeName: this._name,
			});
		} catch (err: any) {
			throw new Error("Unable to create IndexedDB instance.");
		}
	}

	public keys = async (): Promise<Array<DocumentID>> => {
		try {
			return await this._collection.keys();
		} catch (err) {
			return [];
		}
	};

	public get = async (docId: DocumentID): Promise<DocumentData | null> => {
		try {
			return await this._collection.getItem(docId);
		} catch (err) {
			return null;
		}
	};

	public set = async (docId: DocumentID, docData: DocumentData): Promise<boolean> => {
		return new Promise((resolve, reject) => {
			this._collection
				.setItem(docId, docData)
				.then((docData: DocumentData) => {
					resolve(true);
				})
				.catch((err: any) => {
					resolve(false);
				});
		});
	};

	public update = async (docId: DocumentID, updates: DocumentData): Promise<boolean> => {
		let docData = await this.get(docId);
		if (!docData) return Promise.resolve(false);
		Object.keys(docData).forEach((fieldName: FieldName) => {
			docData = docData as DocumentData;
			if (fieldName in updates) docData[fieldName];
		});
		return this.set(docId, docData);
	};

	public sort = async (orderBy: OrderBy, range: Array<DocumentID>): Promise<Array<DocumentID>> => {
		return this._order.sort(orderBy, range);
	};

	public search = async (query: SearchQuery, options: SearchOptions): Promise<Array<DocumentID>> => {
		// The given query type is either "string" or "conditional".
		const isStringQuery: boolean = query.type() === "string";

		// Search options
		const range = options.range as Array<DocumentID>;
		const strategy: StrategyFunc = (options.fuzzy as boolean) ? SearchStrategy.Fuzzy : SearchStrategy.Literal;
		const exclude = options.exclude as string[];
		const limit = options.limit as number;

		// Necessary for stopping task when the search target is out of range.
		let rangeCopy = [...range];

		let matches = <Array<DocumentID>>[];
		try {
			await this._collection.iterate((docData: DocumentData, docId: DocumentID) => {
				if (range.includes(docId)) {
					if (isStringQuery) {
						if (this._findStringMatches(query, docData, strategy, exclude)) {
							matches.push(docId);
							if (matches.length >= limit) return;
							rangeCopy = rangeCopy.filter((id) => id !== docId);
							if (!rangeCopy.length) return;
						}
					} else {
						if (this._findConditionalMatches(query, docData)) {
							matches.push(docId);
							if (matches.length >= limit) return;
							rangeCopy = rangeCopy.filter((id) => id !== docId);
							if (!rangeCopy.length) return;
						}
					}
				}
			});
			return matches;
		} catch (e) {
			return [];
		}
	};

	public remove = async (docId: DocumentID): Promise<boolean> => {
		return new Promise((resolve, reject) => {
			this._collection
				.removeItem(docId)
				.then(() => {
					resolve(true);
				})
				.catch((err: any) => {
					resolve(false);
				});
		});
	};

	public clear = async (): Promise<boolean> => {
		return new Promise((resolve, reject) => {
			this._collection
				.clear()
				.then(() => {
					resolve(true);
				})
				.catch((err: any) => {
					resolve(false);
				});
		});
	};

	public destroy = async (): Promise<boolean> => {
		// TODO: destroy collection

		delete this._collection;
		return true;
	};
}
