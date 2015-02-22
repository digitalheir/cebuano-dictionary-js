package ph.bohol.util.stemmer;

/**
 * Interface to decouple the determination of what are root-words from the stemming logic.
 *
 * @author Jeroen Hellingman
 */
public interface RootWordProvider {
    /**
     * Determine whether a word is known as a root-word.
     *
     * @param word The word to be tested.
     * @return true if the word is a root-word; false otherwise.
     */
    boolean isRootWord(String word);

    /**
     * Determine whether a word is known as a root-word with a certain type.
     *
     * @param word The word to be tested.
     * @param type The type of the word to be tested.
     * @return true if the word is a root-word of the specified type; false otherwise.
     */
    boolean isRootWordWithType(String word, String type);
}
