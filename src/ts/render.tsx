import * as React from "react";
import {renderToStaticMarkup} from "react-dom/server";
import {Html} from "./components/static/Html";

// Client render (optional):
if (typeof document !== "undefined") {
    // Client render code goes here...
    console.log("...");
}
]


// todo

const map: {[key: string]: CebuanoDoc} = {};
docs.rows.forEach(doc => map[`words/${doc._id}`] = doc)

function splitPath(path: string): string[] {
    const match = path.match(/\//g);
    if (!match) throw new Error("!!!");
    else return match;
}

function getComponent(path: string, definition?: CebuanoWord) {
    const relativePath = splitPath(path).slice(1).map(a => "../").join("");
    switch (path) {
        case "/":
            return <Html/>;
        default:
        if(definition)
            return <Html word={definition}/>
        else
            throw new Error("Could not make component for path " + path);
    }
}

export default (locals: any, callback: any) => {
    callback(undefined, "<!DOCTYPE html>\n" + renderToStaticMarkup(
        getComponent(locals.path, locals.definition)
    ).replace("</li>", "</li>\n"));
};
