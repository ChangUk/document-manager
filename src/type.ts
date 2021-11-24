export type CollectionName = string;
export type CollectionData = {
	[document_id: DocumentID]: DocumentData;
};

export type DocumentID = string;
export type DocumentData = {
	[field: FieldName]: FieldData;
};
export type JsonString = string;

export type FieldName = string;
export type FieldData = string | number | boolean | Array<string | number | boolean>;

// Options for database instance creation
export type StorageType = "json" | "indexeddb" | "firestore";
export type Options = {
	storage: StorageType;
	name: string;
	config?: StorageConfig;
	search?: SearchOptions;
	encryption?: {};
};

// Configuration
export type StorageConfig = { [key: string]: string };
export type FirebaseAppConfig = {
	apiKey: string;
	authDomain: string;
	projectId: string;
};

// Sort options
export type OrderBy = Array<FieldName>;

// Search options
export type SearchOptions = {
	range?: Array<DocumentID>;
	orderBy?: OrderBy;
	fuzzy?: boolean;
	limit?: number;
	exclude?: Array<string>;
};

// Data encryption options
export type EncryptionOptions = {
	algorithm: "sha256";
};
