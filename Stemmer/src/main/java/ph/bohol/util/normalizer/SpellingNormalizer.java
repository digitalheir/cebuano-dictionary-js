package ph.bohol.util.normalizer;

interface SpellingNormalizer {
    /**
     * Normalizes the orthography of a given word.
     *
     * @param word The word of which the spelling is to be normalized.
     * @return the normalized word.
     */
    String normalize(String word);
}
