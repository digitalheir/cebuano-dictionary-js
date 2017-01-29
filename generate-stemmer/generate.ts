import {createReadStream, writeFileSync} from "fs";
import parseStream from "./StemmerParser";

const path = "src/stemmer/CebuanoStemmer.ts";

parseStream(createReadStream("test/stemmerTest.xml"))
    .then((stemmer) => {
        // Write stemmer
        writeFileSync(
            path,
            "import {Stemmer} from \"./Stemmer\";\nconst stemmer: Stemmer = "
            + JSON.stringify(stemmer, undefined, 4)
            + ";\nexport default stemmer;"
        );
    })
    .catch((e) => {
        throw e;
    });