import {createStream} from "sax";


const strict = true; // set to false for html-mode
// const parser = p(strict, {});
//
// parser.onerror = function (ignored) {
//     // an error happened.
// };
// parser.ontext = function (text) {
//     console.log(text);
// };
// parser.onopentag = function (node) {
//     // opened a tag.  node has "name" and "attributes"
//     console.log(node);
// };
// parser.onattribute = function (attr) {
//     // an attribute.  attr has "name" and "value"
//     console.log(attr);
// };
// parser.onend = function () {
//     // parser stream is done, and ready to have more stuff written to it.
// };

// stream usage
// takes the same options as the parser
const parseStream = createStream(strict, {});

parseStream.on("error", function (e: any) {
    // unhandled errors will throw, since this is a proper node
    // event emitter.
    console.error("error!", e);
    // clear the error
    this._parser.error = undefined;
    this._parser.resume();
});
parseStream.on("text", function (t: any) {
    console.log(t);
});
parseStream.on("attribute", function (t: any) {
    console.log(t);
});

parseStream.on("opentag", function (tag: any) {
    // same object as above
    console.log(tag);
});

export default parseStream;