// Changes XML to JSON
getChildren = function (xml) {
    const children = [];
    for (let i = 0; i < xml.childNodes.length; i++) {
        children.push(xmlToJson(xml.childNodes.item(i)));
    }
    return children;
};
const xmlToJson = function xmlToJson(xml) {
    // Create the return object
    let obj;
    switch (xml.nodeType) {
        case 9: // document
            return [xml.nodeType, getChildren(xml)];
        case 1: // element
            obj = [xml.nodeType, xml.nodeName];

            // do children
            if (xml.hasChildNodes()) {
                obj.push(getChildren(xml));
            }

            // do attributes
            if (xml.attributes.length > 0) {
                if (obj.length < 3) obj.push([]);
                if (obj.length != 3) throw new Error();

                const attributes = {};
                for (let j = 0; j < xml.attributes.length; j++) {
                    const attribute = xml.attributes.item(j);
                    if (attributes[attribute.nodeName]) throw new Error(attribute.nodeName + " already defined");
                    attributes[attribute.nodeName] = attribute.nodeValue;
                }
                obj.push(attributes);
            }

            return obj;
        case 3: // string
            return xml.nodeValue;
        default:
            throw new Error("How to deal with nodeType " + xml.nodeType)
    }
};
exports.default = xmlToJson;
