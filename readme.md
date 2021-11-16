# Cebuano dictionary and stemmer
[![Build Status](https://travis-ci.org/digitalheir/cebuano-dictionary-js.svg?branch=master)](https://travis-ci.org/digitalheir/cebuano-dictionary-js)
[![npm version](https://badge.fury.io/js/cebuano-stemmer.svg)](https://www.npmjs.com/package/cebuano-stemmer)
[![License](https://img.shields.io/npm/l/cebuano-stemmer.svg)](https://github.com/digitalheir/cebuano-dictionary-js/blob/master/LICENSE)

[Live demo in browser](https://digitalheir.github.io/cebuano-dictionary-js/)

A dictionary and stemmer for the Cebuano language spoken in the Philippines.

Written in TypeScript, compiled to [ES5 CommonJS module](https://www.npmjs.com/package/cebuano-stemmer) (for use in Node.js) and a [single-file ES5 UMD module](https://github.com/digitalheir/cebuano-stemmer-js/releases) (for use in the browser).

Based on [J. Hellingman's Cebuano stemmer for Java and dictionary for Android](https://github.com/jhellingman/cebuano-dictionary-app/), which is in turn based on J. Wolff's seminal work [*A Dictionary of Cebuano Visayan*](http://www.gutenberg.org/files/40074/40074-h/40074-h.htm).

## Dictionary
The dictionary data is converted from [a SQLite database](https://github.com/jhellingman/cebuano-dictionary-app/tree/master/app/src/main/assets/databases) to a publicly-readable CouchDB instance hosted at https://publicdomainreview.cloudant.com/cebuano_dictionary.

The primary index for an entry is the normalized root form of the Cebuano word plus an identification number.

You can use the regular [CouchDB API](http://docs.couchdb.org/en/2.0.0/api/) to query. For instance, to get the first 20 entries starting with "k":

[https://publicdomainreview.cloudant.com/cebuano_dictionary/_all_docs?include_docs=true&limit=20&startkey="k"](https://publicdomainreview.cloudant.com/cebuano_dictionary/_all_docs?include_docs=true&limit=20&startkey=%22k%22)



### Search
The database provides full-text search for English and Cebuano. You can query using the [Lucene Query Parser Syntax](https://docs.cloudant.com/search.html#query-syntax).

Examples:

|description|url|
|---|---|
|English full text search through entries for "fire"|https://publicdomainreview.cloudant.com/cebuano_dictionary/_design/search/_search/fromEnglish?q=fire|
|English synonym search for "fire"|https://publicdomainreview.cloudant.com/cebuano_dictionary/_design/search/_search/fromEnglish?q=synonym:fire|
|Cebuano full text search through entries for "abat"|https://publicdomainreview.cloudant.com/cebuano_dictionary/_design/search/_search/fromCebuano?q=abat|
|Cebuano synonym search for "abat"|https://publicdomainreview.cloudant.com/cebuano_dictionary/_design/search/_search/fromCebuano?q=synonym:abat|


(for more information, add the query parameter `include_docs=true`)

## Stemmer

A JSON list of word roots used in the stemmer is available at https://publicdomainreview.cloudant.com/cebuano_dictionary/_design/show/_list/keyset/normalized_heads_where_pos_is_not_empty_string?group_level=1

A JSON list of all heads is available at https://publicdomainreview.cloudant.com/cebuano_dictionary/_design/show/_list/keyset/heads?group_level=1
