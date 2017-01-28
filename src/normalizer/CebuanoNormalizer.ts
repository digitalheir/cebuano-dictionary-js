import removeDiacritics from "./FoldToAscii";

export default function normalize(word: string): string {
    return removeDiacritics(word)
        .toLowerCase() // Go to lower-case
        // .normalize("NFD") // Decompose Unicode (NFD — Normalization Form Canonical Decomposition)
        // .replace(/\p{M}/g, "") // Drop all diacritics
        .replace(/z/, "s") // Old orthography stuff
        .replace(/ce/, "si")
        .replace(/ci/, "si")
        .replace(/gui/, "gi")
        .replace(/qui/, "ki")
        .replace(/c/, "k")
        .replace(/j/, "h")

        // Wolff's spelling
        .replace(/f/g, "p") // f -> p;
        .replace(/v/g, "b") // v -> b;
        .replace(/o/g, "u") // o -> u;
        .replace(/e/g, "i") // e -> i
        ;
}