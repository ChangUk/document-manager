import * as Firebase from "firebase/app";
import * as Firestore from "firebase/firestore";

import type { CollectionName, CollectionData, FirebaseAppConfig, DocumentID, DocumentData } from "./type";
import type { FieldName, FieldData } from "./type";
import type { Options, OrderBy, SearchOptions } from "./type";
import type { EncryptionOptions } from "./type";

import type { QueryType, StringQuery, ConditionalQuery, QueryCondition } from "./search-query";
import SearchQuery from "./search-query";
import type { StrategyFunc } from "./search-strategy";
import SearchStrategy from "./search-strategy";

import DocumentOrder from "./order";
import Collection from "./collection";

export default class CollectionFirestore extends Collection {
	private _firebaseApp: Firebase.FirebaseApp;
	private _firestore: Firestore.Firestore;

	constructor(name: CollectionName, order: DocumentOrder, options: Options) {
		super(name, order, options);

		// Configuration data test
		if (!this._isValidConfig(options.config, ["apiKey", "authDomain", "projectId"])) {
			throw new Error(`Invalid configuration: ${options.config}`);
		}

		// Create firebase app
		this._firebaseApp = Firebase.initializeApp({
			apiKey: (options.config as FirebaseAppConfig).apiKey,
			authDomain: (options.config as FirebaseAppConfig).authDomain,
			projectId: (options.config as FirebaseAppConfig).projectId,
		});

		// Get firestore instance
		this._firestore = Firestore.getFirestore(this._firebaseApp);

		// `CollectionReference` of Firestore
		this._collection = Firestore.collection(this._firestore, this._name);
	}

	public keys = async (): Promise<Array<DocumentID>> => {
		let docIds: Array<DocumentID> = [];
		try {
			const querySnap = await Firestore.getDocs(this._collection);
			querySnap.forEach((doc) => {
				docIds.push(doc.id);
			});
			return docIds;
		} catch (e) {
			return [];
		}
	};

	public get = async (docId: DocumentID): Promise<DocumentData | null> => {
		try {
			const docRef: Firestore.DocumentReference = Firestore.doc(this._firestore, this._name, docId);
			const docSnap = await Firestore.getDoc(docRef);
			if (docSnap.exists()) return docSnap.data() as DocumentData;
			else return null;
		} catch (e) {
			return null;
		}
	};

	public set = async (docId: DocumentID, docData: DocumentData): Promise<boolean> => {
		if (!docData) return false;
		try {
			const docRef: Firestore.DocumentReference = Firestore.doc(this._firestore, this._name, docId);
			await Firestore.setDoc(docRef, docData);
			return true;
		} catch (e) {
			return false;
		}
	};

	public update = async (docId: DocumentID, updates: DocumentData): Promise<boolean> => {
		if (!updates) return false;
		try {
			const docRef: Firestore.DocumentReference = Firestore.doc(this._firestore, this._name, docId);
			await Firestore.updateDoc(docRef, updates);
			return true;
		} catch (e) {
			return false;
		}
	};

	public sort = async (orderBy: OrderBy, range: Array<DocumentID>): Promise<Array<DocumentID>> => {
		// TODO: Firestore search
		return range;
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

		// TODO:

		return [];
	};

	public remove = async (docId: DocumentID): Promise<boolean> => {
		// TODO:
		return false;
	};

	public clear = async (): Promise<boolean> => {
		// TODO:
		return false;
	};

	public destroy = async (): Promise<boolean> => {
		// TODO: destroy collection

		delete this._collection;
		return true;
	};
}
