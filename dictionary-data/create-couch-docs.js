// const entries = require('./data/wced_entry.json');
// const ceb = require('./couchdb-functions/en-search').default;
// const heads = require('./data/wced_head.json');
// const translations = require('./data/wced_translation.json');
// const xmlToJson = require('./xml-to-json').default;
// const DOMParser = require('xmldom').DOMParser;
//
//
// console.log("Entries: " + entries.length);
// const entriesById = {};
// entries.forEach((entry) => {
//     entry.sqlid = entry._id;
//     entry._id = entry.head.replace(/[^a-z0-9]/ig, "") + "-" + entry.sqlid;
//     entry.heads = [];
//     entry.translations = [];
//     const doc = new DOMParser().parseFromString(entry.entry);
//     const convertedXml = xmlToJson(doc);
//
//     entry.entry = undefined;
//     if (convertedXml[0] !== 9) throw new Error();
//     for(let i=0; i< convertedXml[1].length; i++) {
//         const childNode = convertedXml[1][i];
//         if(typeof childNode === "object") {
//             if(childNode[1] !== "entry") throw new Error("Expected entry as a child");
//             entry.entry = childNode[2]?childNode[2]:[];
//         }
//     }
//     if(!entry.entry) throw new Error("Could not find entry: "+JSON.stringify(convertedXml));
//
//     entriesById[entry.sqlid] = entry;
// });
// console.log("Heads: " + heads.length);
// heads.forEach(head => {
//     const entryid = head.entryid;
//     head.entryid = undefined;
//     head._id = undefined;
//     if (!entriesById[entryid]) throw new Error("No entry for id " + JSON.stringify(head));
//     else entriesById[entryid].heads.push(head);
// });
//
// console.log("Translations: " + translations.length);
//
// translations.forEach(transl => {
//     const entryid = transl.entryid;
//     transl.entryid = undefined;
//     if (!entriesById[entryid]) throw new Error("No entry for id " + entryid);
//     // TODO Some translations have empty string?
//     if (transl._id !== 7526
//         && transl._id !== 7534
//         && transl._id !== 7831
//         && transl._id !== 7997
//         && !transl.translation)
//         throw new Error("No translation for " + JSON.stringify(transl));
//     entriesById[entryid].translations.push(transl.translation);
// });
//
//
// // const fs = require("fs");
// // const path = "couchdocs/docs.json";
// // fs.writeFileSync(
// //     path, JSON.stringify(entries[0], undefined, 2)
// // );
//
// // console.log(JSON.stringify(entries[0], undefined, 2));

const PouchDB = require("pouchdb");
const secret = require("./secret");
const db = new PouchDB('cebuano_dictionary');
// db.bulkDocs(entries).then(() => {
//     console.log("added entries to local database");
db.replicate.to(
    'https://publicdomainreview.cloudant.com/cebuano_dictionary',
    {
        auth: secret.auth
    }
).catch(err => {
    console.error(err);
});
// }).catch(err => {
//     console.error(err);
// });


//
// function index(){}
// const tryme = function (doc) {
//     function getString(xml) {
//         if (typeof xml === "string") return xml;
//         const strs = [];
//
//         for (let key in xml) if (xml.hasOwnProperty(key) && key !== "@attributes" && key !== "pos" && key !== "form") {
//             let val = xml[key];
//             if (key === "#text") {
//                 if (typeof val === "string") {
//                     val = val.replace(/\s+/g, " ").trim();
//                     if (val.length > 0) strs.push(val);
//                 } else {
//                     if (val.push)
//                         for (let i = 0; i < val.length; i++) {
//                             const str = val[i].replace(/\s+/g, " ").trim();
//                             if (str.length > 0) strs.push(str);
//                         }
//                     else return "VALUE DID NOT HAVE PUSH?!?!";
//                 }
//             } else {
//                 if (typeof val === "object") strs.push(getString(val));
//                 else return "VALUE WAS NOT OBJECT?!?!?!!";
//             }
//         }
//
//
//         return strs.join(' ');
//     }
//
//     if (doc.entry) index("default", getString(doc.entry), {"store": true});
//     if (doc.translations) index("synonym", doc.translations.join(' '), {"store": true});
// };
// entries.forEach(tryme);
