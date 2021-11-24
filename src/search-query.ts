import type { FieldName, FieldData } from "./type";

export type QueryType = "string" | "conditional" | "invalid";

export type StringQuery = string;
export type ConditionalQuery = { [field: FieldName]: QueryCondition };

export type QueryCondition = [QueryOperator, FieldData];
export type QueryOperator =
	| "<"
	| "<="
	| "=="
	| "!="
	| ">="
	| ">"
	| "array-contains"
	| "array-contains-any"
	| "in"
	| "not-in";

export default class SearchQuery {
	private queryType: QueryType = "invalid";
	private query: StringQuery | ConditionalQuery | null = null;

	constructor(query: StringQuery | ConditionalQuery) {
		// Search documents by multiple conditions
		if (typeof query === "object") {
			try {
				if (!Array.isArray(query) && Object.keys(query).length) this.queryType = "conditional";
			} catch (e) {}
		}
		// Search documents by string match
		else if (typeof query === "string") {
			if (query.length) this.queryType = "string";
		}

		if (this.queryType !== "invalid") this.query = query;
	}

	public type = () => {
		return this.queryType;
	};

	public data = () => {
		return this.query;
	};

	public isValidOperator = (op: string): op is QueryOperator => {
		return ["<", "<=", "==", "!=", ">=", ">", "array-contains", "array-contains-any", "in", "not-in"].includes(op);
	};
}
