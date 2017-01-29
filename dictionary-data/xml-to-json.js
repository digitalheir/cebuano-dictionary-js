// Changes XML to JSON
exports.default = function xmlToJson(xml) {

    // Create the return object
    let obj = {};

    if (xml.nodeType == 1) { // element
        // do attributes
        if (xml.attributes.length > 0) {
            obj["@attributes"] = {};
            for (let j = 0; j < xml.attributes.length; j++) {
                const attribute = xml.attributes.item(j);
                obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
            }
        }
    } else if (xml.nodeType == 3) { // text
        obj = xml.nodeValue;
    }

    // do children
    if (xml.hasChildNodes()) {
        for (let i = 0; i < xml.childNodes.length; i++) {
            const item = xml.childNodes.item(i);
            const nodeName = item.nodeName;
            const chunk = xmlToJson(item);
            // if (!(nodeName === "#text" && chunk.match(/^\s*$/))) {
            if (typeof(obj[nodeName]) == "undefined") {
                obj[nodeName] = chunk;
            } else {
                if (typeof(obj[nodeName].push) == "undefined") {
                    const old = obj[nodeName];
                    obj[nodeName] = [];
                    obj[nodeName].push(old);
                }
                obj[nodeName].push(chunk);
            }
            // }
        }
    }
    return obj;
};
