import {createStream} from "sax";
import {Stemmer, addGroup, compileStemmer} from "../src/stemmer/Stemmer";
import {AffixGroup} from "../src/stemmer/AffixGroup";
import {Affix} from "../src/stemmer/Affix";
import {AffixPattern} from "../src/stemmer/AffixPattern";


const strictXml = true;

export const parseStream = function parse(stream: any) {
    return new Promise((resolve, reject) => {
            const parseStream = createStream(strictXml, {});

            let stemmer: Stemmer;
            let temporaryAffix: Affix;
            let temporaryGroup: AffixGroup;

            parseStream.on("error", reject);

            parseStream.on("closetag", function (elementName: string) {
                if (elementName === ("group")) {
                    addGroup(stemmer, temporaryGroup);
                    temporaryGroup = undefined;
                } else if (elementName === ("affix")) {
                    temporaryGroup.affixes.push(temporaryAffix);
                    temporaryAffix = undefined;
                } else if (elementName === ("stemmer")) {
                    compileStemmer(stemmer);
                }
            });
            parseStream.on("opentag", function (tag: any) {
                if (tag.name === "stemmer") {
                    const language = tag.attributes.language;
                    if (!language) throw new Error("Expected language to be set on stemmer");
                    stemmer = {
                        language,
                        compiled: false,
                        constants: {},
                        groups: []
                    };
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
                        const pattern: AffixPattern = {
                            pattern: tag.attributes.pattern,
                            root: tag.attributes.root,
                            compiledPattern: undefined
                        };
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
};
