import {createReadStream, writeFileSync} from "fs";
import {parseStream} from "./StemmerParser";

const writePath = "src/stemmer/CebuanoStemmer.ts";
const readPath = "generate-stemmer/xml/stemmerCebuano.xml";

const stream = createReadStream(
    readPath,
    {encoding: "utf8"}
);

parseStream(stream)
    .then((stemmer) => {
        // Write stemmer
        writeFileSync(
            writePath,
            "import {Stemmer} from \"./Stemmer\";\n\nexport const stemmer: Stemmer = "
            + JSON.stringify(stemmer, undefined, 4)
            + ";"
        );
    })
    .catch((e) => {
        throw e;
    });