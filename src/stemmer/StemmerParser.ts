import {createStream} from "sax";
import Stemmer from "./Stemmer";
import {AffixGroup} from "./AffixGroup";
import {Affix} from "./Affix";
import AffixPattern from "./AffixPattern";


const strict = true;

export default function parse(stream: any) {
    return new Promise((resolve, reject) => {
            const parseStream = createStream(strict, {});

            let stemmer: Stemmer;
            let temporaryAffix: Affix;
            let temporaryGroup: AffixGroup;

            parseStream.on("error", reject);

            parseStream.on("closetag", function (elementName: string) {
                if (elementName === ("group")) {
                    stemmer.addGroup(temporaryGroup);
                    temporaryGroup = undefined;
                } else if (elementName === ("affix")) {
                    temporaryGroup.affixes.push(temporaryAffix);
                    temporaryAffix = undefined;
                } else if (elementName === ("stemmer")) {
                    stemmer.compile();
                }
            });
            parseStream.on("opentag", function (tag: any) {
                if (tag.name === "stemmer") {
                    stemmer = new Stemmer();
                    const language = tag.attributes.language;
                    if (!language) throw new Error("Expected language to be set on stemmer");
                    stemmer.language = language;
                } else {
                    if (!stemmer) throw new Error("Expected stemmer to be set at this point");
                    if (tag.name === "group") {
                        temporaryGroup = {name: tag.attributes.name, affixes: []};
                    } else if (tag.name === "affix") {
                        if (!temporaryGroup) throw new Error("Expected temporaryGroup to be set at this point");
                        temporaryAffix = {
                            form: tag.attributes.form,
                            label: tag.attributes.label,
                            rootType: tag.attributes.rootType,
                            patterns: []
                        };
                    } else if (tag.name === "pattern") {
                        if (!temporaryAffix) throw new Error("Expected temporaryAffix to be set at this point");
                        const pattern = new AffixPattern(tag.attributes.pattern, tag.attributes.root);
                        temporaryAffix.patterns.push(pattern);
                    } else if (tag.name === "constant") {
                        const key = tag.attributes.name;
                        if (!!stemmer.constants[key]) throw new Error("Constant " + key + " was already set: " + stemmer.constants[key]);
                        stemmer.constants[key] = tag.attributes.value;
                    }
                }
            });


            stream.on("close", () => {
                resolve(stemmer);
            });
            stream.pipe(parseStream);
        }
    );
}