import {removeDiacritics} from "./FoldToAscii";

// Ported from https://github.com/jhellingman/cebuano-dictionary-app/blob/master/Stemmer/src/main/java/ph/bohol/util/normalizer/CebuanoNormalizer.java

export function normalize(word: string): string {
    return removeDiacritics(word)
        .toLowerCase() // Go to lower-case

        // NOTE: requires ES6
        .normalize("NFD") // Decompose Unicode (NFD — Normalization Form Canonical Decomposition)

        // NOTE: requires ES6
        // https://stackoverflow.com/questions/280712/how-can-i-use-unicode-aware-regular-expressions-in-javascript
        //   The ECMAScript language specification, edition 6 (also commonly known as ES2015), includes Unicode-aware regular expressions. Support must be enabled with the u modifier on the regex. See Unicode-aware regular expressions in ES6 for a break-down of the feature and some caveats.
        //   ES6 is widely adopted in both browsers and stand-alone Javascript runtimes such as Node.js, so using this feature won't require extra effort in most cases. Full compatibility list: https://kangax.github.io/compat-table/es6/
        .replace(/\p{M}/gu, "") // Drop all diacritics


        .replace(/z/g, "s") // Old orthography stuff
        .replace(/ce/g, "si")
        .replace(/ci/g, "si")
        .replace(/gui/g, "gi")
        .replace(/qui/g, "ki")
        .replace(/c/g, "k")
        .replace(/j/g, "h")

        // Wolff's spelling
        .replace(/f/g, "p") // f -> p;
        .replace(/v/g, "b") // v -> b;
        .replace(/o/g, "u") // o -> u;
        .replace(/e/g, "i") // e -> i
        ;
}