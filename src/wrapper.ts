import ShortUuidV4 from "./short-uuidv4";

import type { CollectionName, CollectionData, DocumentID, DocumentData, JsonString } from "./type";
import type { FieldName } from "./type";
import type { Options, OrderBy, SearchOptions } from "./type";
import type { EncryptionOptions } from "./type";

import type { QueryType, StringQuery, ConditionalQuery, QueryCondition } from "./search-query";
import SearchQuery from "./search-query";

import DocumentOrder from "./order";

import CollectionJSON from "./collection-json";
import CollectionIDB from "./collection-indexeddb";
import CollectionFirestore from "./collection-firestore";

export default class CollectionWrapper {
	private _collection: CollectionJSON | CollectionIDB | CollectionFirestore;
	private _order: DocumentOrder;

	private _name: CollectionName;
	private _options: Options;

	constructor(name: CollectionName, options: Options) {
		this._name = name;
		this._options = options;

		this._order = new DocumentOrder(this, options);

		// `this._options.storage` is always existing.
		const storage = this._options.storage.toLowerCase();
		if (storage === "json") {
			this._collection = new CollectionJSON(name, this._order, this._options);
		} else if (storage === "indexeddb") {
			this._collection = new CollectionIDB(name, this._order, this._options);
		} else if (storage === "firestore") {
			this._collection = new CollectionFirestore(name, this._order, this._options);
		} else {
			throw new Error(`Invalid storage: ${this._options.storage}`);
		}
	}

	/**
	 * Perform initialization task.
	 */
	public init = async () => {
		await this._order.load();
	};

	/**
	 * Get collection name.
	 *
	 * @returns Collection name
	 */
	public name = (): CollectionName => {
		return this._name;
	};

	/**
	 * Get document IDs in the collection.
	 *
	 * @returns An array containing document IDs.
	 */
	public keys = async (): Promise<Array<DocumentID>> => {
		return this._collection.keys();
	};

	/**
	 * Read document content by ID.
	 *
	 * @param docId Document ID
	 * @returns A Promise resolved with a document data.
	 */
	public get = async (docId: DocumentID): Promise<DocumentData | null> => {
		if (!docId) return null;
		return await this._collection.get(docId);
	};

	/**
	 * Save document data.
	 *
	 * @param docId Document ID
	 * @param docData Document data. This should be either string or JSON object.
	 * @returns `true` if the transaction is successfully done, `false` otherwise.
	 */
	public set = async (docId: DocumentID, docData: JsonString | DocumentData): Promise<boolean> => {
		if (!docData) return false;
		try {
			if (typeof docData === "string") docData = JSON.parse(docData as JsonString);
			if (typeof docData === "object" && Array.isArray(docData) === false) {
				// Generate new random UUID
				docId = docId ? docId : new ShortUuidV4().new();

				// Set metadata
				Object.assign(docData, {
					_id: docId,
					_date: new Date().getTime(),
				});

				let result: boolean = await this._collection.set(docId, docData as DocumentData);
				if (result) return await this._order.set(docData);
				return result;
			}
		} catch (err) {}
		return false;
	};

	/**
	 * Update document data.
	 *
	 * If the given document ID is not valid, this returns `false`.
	 * If a field name of the given `updtData`, the modification is ignored.
	 *
	 * @param docId Document ID
	 * @param updtData Modification data. The data is an object containing `fieldName`-`new value` pairs.
	 * @returns `true` if the transaction is successfully done, `false` otherwise.
	 */
	public update = async (docId: DocumentID, updtData: string | DocumentData): Promise<boolean> => {
		if (!docId || !updtData) return false;
		try {
			if (typeof updtData === "string") return await this._collection.update(docId, JSON.parse(updtData as string));
			else if (typeof updtData === "object") return await this._collection.update(docId, updtData as DocumentData);
		} catch (err) {}
		return false;
	};

	/**
	 * Sort documents in the given range.
	 *
	 * @param orderBy Array of field names. If descending order, use prefix `-` in front of field name.
	 * @param range Array of Document IDs. If not specified, the range is whole documents.
	 * @returns A Promise resolved with the sorted array containing document IDs.
	 */
	public sort = async (orderBy: OrderBy, range?: Array<DocumentID>): Promise<Array<DocumentID>> => {
		range =
			range && Array.isArray(range)
				? range
				: "range" in (this._options.search as SearchOptions)
				? ((this._options.search as SearchOptions).range as Array<DocumentID>)
				: await this.keys();

		orderBy =
			orderBy && Array.isArray(orderBy)
				? orderBy
				: "orderBy" in (this._options.search as SearchOptions)
				? ((this._options.search as SearchOptions).orderBy as OrderBy)
				: [];

		if (!range.length || !orderBy.length) return range;

		return this._collection.sort(orderBy, range);
	};

	/**
	 * Search documents by the given query.
	 *
	 * @param query Search query. It can be either string or conditionals.
	 * @param options Search options. The given value is merged into the default one.
	 * @returns A Promise resolved with an array containing document IDs.
	 */
	public search = async (query: StringQuery | ConditionalQuery, options?: SearchOptions): Promise<Array<DocumentID>> => {
		const searchQuery = new SearchQuery(query);

		// The base options have properties: "fuzzy", "limit".
		let baseOptions: SearchOptions = Object.assign({}, this._options.search);
		options = options ? Object.assign(baseOptions, options) : baseOptions;

		// `options.range`
		options.range = "range" in options && Array.isArray(options.range) ? options.range : await this.keys();
		if (!options.range.length) return [];

		// `options.orderBy`
		options.orderBy = "orderBy" in options && Array.isArray(options.orderBy) ? options.orderBy : [];

		// `options.fuzzy`
		options.fuzzy = "fuzzy" in options && typeof options.fuzzy === "boolean" ? options.fuzzy : baseOptions.fuzzy;

		// `options.limit`
		options.limit = "limit" in options && typeof options.limit === "number" ? options.limit : baseOptions.limit;

		// `options.exclude`
		options.exclude = "exclude" in options && Array.isArray(options.exclude) ? options.exclude : [];

		if (searchQuery && searchQuery.type() !== "invalid") {
			// In case that the query is valid.
			const limited = await this._collection.search(searchQuery, options);
			if (options.orderBy.length) return this.sort(options.orderBy, limited);
			return limited;
		} else {
			// In case that the query is invalid.
			const sliced = options.range.slice(0, options.limit);
			if (options.orderBy.length) return this.sort(options.orderBy, sliced);
			return sliced;
		}
	};

	public remove = async (docId: DocumentID): Promise<boolean> => {
		if (!docId) return false;
		let result: boolean = await this._collection.remove(docId);
		if (result) this._order.remove(docId);
		return result;
	};

	public clear = async (): Promise<boolean> => {
		let result: boolean = await this._collection.clear();
		if (result) this._order.reset();
		return result;
	};

	public destory = async (): Promise<boolean> => {
		let result: boolean = await this._collection.destroy();
		if (result) this._order.destroy();
		return result;
	};

	public import = async (data: CollectionData): Promise<boolean> => {
		if (!data) return false;
		return await this._collection.import(data);
	};

	public export = async (range?: Array<DocumentID>): Promise<CollectionData> => {
		if (!range) range = this._order.order();
		return await this._collection.export(range);
	};
}
