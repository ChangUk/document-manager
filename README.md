# DocumentManager.js

**DocumentManager** is a javascript library to manage document data.

## Features

- Store documents in local or remote database
    1. [JSON Object](https://en.wikipedia.org/wiki/JSON) in memory
    1. [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) in web browser
    1. [Cloud Firestore](https://firebase.google.com/products/firestore) powered by [Google](https://google.com/) (being developed...)
- Search
    1. Full-text search
    1. Conditional search
- Data encryption (not support yet...)

### Browser support

- Modern browsers such as Chrome
- Internet explorer 11 (by [Babel.js](https://babeljs.io/))

## Data model

The **database** consists of a number of **collections**:

```js
// Database
{
    [CollectionName: string]: CollectionData
}
```

The **collection** consists of a number of <`DocumentID`-`DocumentData`> pairs:

```js
// CollectionData
{
    [DocumentID: string]: DocumentData
}
```

The **document** consists of a number of fields:

```js
// DocumentData
{
    [FieldName: string]: string | number | boolean | Array<string | number | boolean>,
    _id: DocumentID
}
```

The `DocumentID` is string identifier to distinguish a document from another. Once a document is stored via **DocumentManager** API, the private field `_id` is assigned to `DocumentData` automatically.

## Usage

Most of APIs are **asynchronous**.

### Create an instance (ESM)

```js
import DocumentManager from "document-manager.esm.js";

// Create a DocumentManager instance
const dm = new DocumentManager(options);
```

#### Options

The options work as default settings.

```
// Options
{
    storage?: "json" | "indexeddb" | "firestore";
    name?: string;
    config?: { [key: string]: string };
    search?: SearchOptions;
    encryption?: EncryptionOptions;     // Not support yet...
}
```

- `storage` (optional):
    - Default: `"indexeddb"`
    - Database type
- `name` (optional):
    - Default: `"document-manager"`
    - Database name
- `config` (optional):
    - No default value
    - Configuration data which is used to make database.
    - In case of firestore, the data `{ apiKey, authDomain, projectId }` is necessarily needed.
- `search` (optional):
    - No default value
    - Described below
- `encryption` (optional):
    - No default value
    - Described below

#### Search options

```js
// SearchOptions
{
    range?: Array<string>;
    orderBy?: Array<string>;
    fuzzy?: boolean;
    limit?: number;
    exclude?: Array<string>;
}
```
- `range`(optional)
    - No default value
    - Specify document IDs to search for.
- `orderBy`(optional)
    - No default value
    - Specify field names to sort search results. Using prefix `-` in front of field name makes the resulting order descending. For example, if you are going to sort the search result by the field `"title"` in ascending order and `"date"` in descending order, set this option as follows: `"orderBy": ["title", "-date"]`.
- `fuzzy`(optional)
    - Default: `false`
    - Fuzzy search enables to find documents whose words are similar to the given string query.
- `limit`(optional)
    - Default: `Number.MAX_SAFE_INTEGER`
    - Specify the maximum number of search results
- `exclude`(optional)
    - No default value
    - If a document contains words which is in exclude list, the document is not selected for the search result.

#### Encryption options

Not support yet...

### Create collection instance

The `collection()` method is asynchronous.

The following code creates instances of document collections named `documents` and `users` respectively:

```js
const dm = new DocumentManager();

// Create an instance for collection "documents"
const docs = await dm.collection("documents");

// Create an instance for collection "users"
const users = await dm.collection("users");
```

#### Copy the existing collection data on instance creation

Being developed...

```js
// Create an instance for collection "documents"
const docs = await dm.collection("documents");

// Copy the "documents" collection data to the new one
const copied = await dm.collection("copied", docs);
```

### Verify document IDs in a collection

```js
collection.order().then((results) => {
    console.log(results);
});
```

```
// Output: We assume there are 3 documents in the collection
["AHJpTQVYVFYl1U1GvTaODa", "FhzAudNRikbs2Mv6I3dYqx", "F5Qu4vD97iXXsvWbiQhfp1"]
```

### Add document data

```js
collection.set(null, {
    title: "Sample Document",
    date: 1633958686179,
    content: "...",
    category: ["test"],
    tags: ["sample", "test"]
}).then((added) => {
    console.log(`Successfully added: "${added._id}"`);
});
```
```
// Output
Successfully added: "C1b6iSaUYH64vkJHshAORT"
```

Unless the document ID is given, **DocumentManager** generate a random UUID(length-22) as a key.

### Get document data

```js
collection.get("C1b6iSaUYH64vkJHshAORT").then((doc) => {
    console.log(doc);
});
```
```
// Output
{
    title: "Sample Document",
    date: 1633958686179,
    content: "...",
    category: ["test"],
    tags: ["sample", "test"]
}
```

### Search documents with a query

#### For string query

```js
collection.search("sample query").then((results) => {
    // Array of `DocumentID`
    console.log(results);
});
```
```
// Output
["C1b6iSaUYH64vkJHshAORT"]
```

#### For conditional query

The conditional query is an object-typed data and its keys are field names of document data. To make conditiona query, `[operator, comparison_value]` should be given for a field. The comparison operator can be one of the followings: `"<"`, `"<="`, `"=="`, `"!="`, `">="`, `">"`, `"array-contains"`, `"array-contains-any"`, `"in"`, `"not-in"`.

```js
collection.search({
    date: [">=", 1633958686100],
    tags: ["array-contains", "sample"]
}).then((results) => {
    // Array of `DocumentID`
    console.log(results);
});
```
```
// Output
["C1b6iSaUYH64vkJHshAORT"]
```

### Remove document data

```js
collection.remove("C1b6iSaUYH64vkJHshAORT").then((result) => {
    console.log(result);
});
```
```
// Output
true
```

### Destroy database

```js
const dm = new DocumentManager();
dm.destroy();
```

## Dependents

- [localForage](https://localforage.github.io/localForage)
- [short-uuidv4](https://github.com/ChangUk/short-uuidv4)

## MIT License

Copyright (c) 2021 Park ChangUk

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
