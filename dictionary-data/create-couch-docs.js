const entries = require('./data/wced_entry.json');
const heads = require('./data/wced_head.json');
const translations = require('./data/wced_translation.json');

console.log("Entries: " + entries.length);
const entriesById = {};
entries.forEach((entry) => {
    entry.sqlid = entry._id;
    entry._id = entry.head.replace(/[^a-z0-9]/ig, "")+"-"+entry.sqlid;
    entry.heads = [];
    entry.translations = [];
    entriesById[entry.sqlid] = entry
});
console.log("Heads: " + heads.length);
heads.forEach(head => {
    const entryid = head.entryid;
    head.entryid = undefined;
    head._id = undefined;
    if (!entriesById[entryid]) throw new Error("No entry for id " + JSON.stringify(head));
    else entriesById[entryid].heads.push(head);
});

console.log("Translations: " + translations.length);

translations.forEach(transl => {
    const entryid = transl.entryid;
    transl.entryid = undefined;
    if (!entriesById[entryid]) throw new Error("No entry for id " + entryid);
    // TODO Some translations have empty string?
    if (transl._id !== 7526
        && transl._id !== 7534
        && transl._id !== 7831
        && transl._id !== 7997
        && !transl.translation)
        throw new Error("No translation for " + JSON.stringify(transl));
    entriesById[entryid].translations.push(transl.translation);
});


// const fs = require("fs");
// const path = "couchdocs/docs.json";
// fs.writeFileSync(
//     path, JSON.stringify(entries[0], undefined, 2)
// );

const PouchDB = require("pouchdb");
const secret = require("./secret");
const db = new PouchDB('cebuano_dictionary');
db.bulkDocs(entries).then(() => {
    console.log("added entries to local database");
    db.replicate.to(
        'https://publicdomainreview.cloudant.com/cebuano_dictionary',
        {
            auth: secret.auth
        }
    ).catch(err => {
        console.error(err);
    });
}).catch(err => {
    console.error(err);
});