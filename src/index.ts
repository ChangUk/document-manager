import ShortUuidV4 from "./short-uuidv4";

import type { CollectionName, CollectionData, DocumentID, DocumentData, JsonString } from "./type";
import type { Options, OrderBy, SearchOptions } from "./type";
import type { EncryptionOptions } from "./type";

import CollectionWrapper from "./wrapper";
import { orderCollectionName } from "./order";

/**
 * Main class
 */
export default class DocumentManager {
	// Default options
	private _options: Options = {
		storage: "indexeddb",
		name: "document-manager",
		search: {
			fuzzy: false,
			limit: Number.MAX_SAFE_INTEGER,
		},
	};

	// Collection instances
	private _collections: Record<CollectionName, CollectionWrapper> = {};

	constructor(options?: Options) {
		// Merge the given options with the default
		Object.assign(this._options, options);
	}

	public randomId = (): DocumentID => {
		return new ShortUuidV4().new();
	};

	public getCollectionNames = (): Array<CollectionName> => {
		return Object.keys(this._collections);
	};

	public collection = async (name: CollectionName, another?: CollectionWrapper): Promise<CollectionWrapper | null> => {
		name = name ? name.toLowerCase() : "";
		if (!name.length || name === orderCollectionName) return null;

		// If the collection instance already exists, just return it.
		if (name in this._collections) {
			if (this._collections[name]) return this._collections[name];
			else delete this._collections[name];
		}

		// Newly create collection instance
		let instance = new CollectionWrapper(name.toLowerCase(), this._options);
		if (instance) {
			// Given another collection instance as parameter, copy its data to new instance.
			if (another) await instance.import(await another.export());

			// Initialize the collection
			await instance.init();

			// Register collection instance
			this._collections[name] = instance;

			return instance;
		} else return null;
	};

	public removeCollection = async (name: CollectionName): Promise<boolean> => {
		if (!name || !name.length) return false;
		if (name in this._collections) {
			let result: boolean = await this._collections[name].destory();
			if (result) delete this._collections[name];
			return result;
		} else return false;
	};

	public removeStorage = () => {
		for (const name in this._collections) {
			if (this._collections[name]) this.removeCollection(name);
		}

		// TODO: remove database itself
	};
}
