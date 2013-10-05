package ph.bohol.util.stemmer;

/**
 * Interface to decouple the determination of what are root-words from the stemming logic.
 * @author Jeroen Hellingman
 */
public interface RootWordProvider
{
	/**
	 * Determine whether a word is known as a root-word.
	 * @param word The word to be tested.
	 * @return true if the word is a root-word; false otherwise.
	 */
	public boolean isRootWord(String word);
}
