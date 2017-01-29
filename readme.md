# Cebuano dictionary and stemmer
[![Build Status](https://travis-ci.org/digitalheir/cebuano-stemmer-js.svg?branch=master)](https://travis-ci.org/digitalheir/cebuano-stemmer-js)
[![npm version](https://badge.fury.io/js/cebuano-stemmer.svg)](https://www.npmjs.com/package/cebuano-stemmer)
[![License](https://img.shields.io/npm/l/cebuano-stemmer.svg)](https://github.com/digitalheir/cebuano-stemmer-js/blob/master/LICENSE)

A dictionary and stemmer for the Cebuano language spoken in the Philippines.

Written in TypeScript, compiled to [ES6 CommonJS module](https://www.npmjs.com/package/cebuano-stemmer) (for use in Node.js) and a [single-file ES5 UMD module](https://github.com/digitalheir/cebuano-stemmer-js/releases) (for use in the browser).

Based on [J. Hellingman's Cebuano stemmer for Java and dictionary for Android](https://bitbucket.org/jhellingman/cebuano-dictionary-app).

## Dictionary
The dictionary data is converted from [a SQLite database](https://bitbucket.org/jhellingman/cebuano-dictionary-app/src/a5dd59e660434915e2128557aad8ead3c2339004/app/src/main/assets/databases/?at=master) to a publicly-readable CouchDB instance hosted at https://publicdomainreview.cloudant.com/cebuano_dictionary.

The primary index for an entry is the normalize root form of the Cebuano word.

You can use the regular [CouchDB API](http://docs.couchdb.org/en/2.0.0/api/) to query. For instance, to get the first 20 entries starting with "k":

[https://publicdomainreview.cloudant.com/cebuano_dictionary/_all_docs?include_docs=true&limit=20&startkey="k"](https://publicdomainreview.cloudant.com/cebuano_dictionary/_all_docs?include_docs=true&limit=20&startkey=%22k%22)



### Search
The database provides full-text search for English and Cebuano. You can query using the [Lucene Query Parser Syntax](http://lucene.apache.org/core/4_3_0/queryparser/org/apache/lucene/queryparser/classic/package-summary.html#Overview).

Examples:

|description|url|
|---|---|
|English full text search through entries for "fire"|https://publicdomainreview.cloudant.com/cebuano_dictionary/_design/search/_search/fromEnglish?q=fire|
|English synonym search for "fire"|https://publicdomainreview.cloudant.com/cebuano_dictionary/_design/search/_search/fromEnglish?q=synonym:fire|
|Cebuano full text search through entries for "abat"|https://publicdomainreview.cloudant.com/cebuano_dictionary/_design/search/_search/fromCebuano?q=abat|
|Cebuano synonym search for "abat"|https://publicdomainreview.cloudant.com/cebuano_dictionary/_design/search/_search/fromCebuano?q=synonym:abat|


A Cebuano [analyzer](https://docs.cloudant.com/search.html#analyzers) that normalizes text input remains to be implemented. Take care.

## Stemmer

