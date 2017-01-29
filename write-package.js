const fs = require('fs');

const base = 'dist/';
const pathPackage = base + "package.json";

const VERSION = require('./version').default;

const p = {
    "name": "cebuano-stemmer",
    "description": "A stemmer for the Cebuano language spoken in the Philippines",
    "version": VERSION,
    "main": "index.js",
    "types": "index.d.ts",
    "repository": "git@github.com:digitalheir/cebuano-stemmer-js.git",
    "author": "Maarten Trompper",
    "license": "GPL-3.0",
    "dependencies": {
    }
};

function writePackageFileInDist() {
    fs.writeFile(pathPackage, JSON.stringify(p, null, 2), "utf8", function (err) {
        if (err) {
            console.error(err);
        }
        else {
            console.log("Written " + pathPackage);
        }
    });
}

writePackageFileInDist();