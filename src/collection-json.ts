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

export default class CollectionJSON extends Collection {
	constructor(name: CollectionName, order: DocumentOrder, options: Options) {
		super(name, order, options);

		// Object with JSON format
		this._collection = {};
	}

	public keys = async (): Promise<Array<DocumentID>> => {
		return Object.keys(this._collection);
	};

	public get = async (docId: DocumentID): Promise<DocumentData | null> => {
		if (!(docId in this._collection)) return null;
		return this._collection[docId];
	};

	public set = async (docId: DocumentID, docData: DocumentData): Promise<boolean> => {
		if (!docData) return false;
		try {
			this._collection[docId] = docData;
			return true;
		} catch (e) {
			return false;
		}
	};

	public update = async (docId: DocumentID, updates: DocumentData): Promise<boolean> => {
		if (!updates) return false;
		let docData = await this.get(docId);
		if (!docData) return false;
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
		for (let i = 0; i < range.length; i++) {
			const docId = range[i];
			const docData = await this.get(docId);
			if (!docData) continue;

			if (isStringQuery) {
				if (this._findStringMatches(query, docData, strategy, exclude)) {
					matches.push(docId);
					if (matches.length >= limit) break;
					rangeCopy = rangeCopy.filter((id) => id !== docId);
					if (!rangeCopy.length) break;
				}
			} else {
				if (this._findConditionalMatches(query, docData)) {
					matches.push(docId);
					if (matches.length >= limit) break;
					rangeCopy = rangeCopy.filter((id) => id !== docId);
					if (!rangeCopy.length) break;
				}
			}
		}
		return matches;
	};

	public remove = async (docId: DocumentID): Promise<boolean> => {
		if (!(docId in this._collection)) return false;
		try {
			delete this._collection[docId];
			return true;
		} catch (err: any) {
			return false;
		}
	};

	public clear = async (): Promise<boolean> => {
		try {
			for (const docId in this._collection) {
				delete this._collection[docId];
			}
			return true;
		} catch (err: any) {
			return false;
		}
	};

	public destroy = async (): Promise<boolean> => {
		delete this._collection;
		return true;
	};
}
