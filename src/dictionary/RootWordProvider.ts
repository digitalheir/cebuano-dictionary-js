/**
 * Interface to decouple the determination of what are root-words from the stemming logic.
 */
export interface RootWordProvider {
    /**
     * Determine whether a word is known as a root-word.
     *
     * @param word The word to be tested.
     * @return true if the word is a root-word; false otherwise.
     */
    isRootWord(word: string): boolean ;

    /**
     * Determine whether a word is known as a root-word with a certain type.
     *
     * @param word The word to be tested.
     * @param type The type of the word to be tested.
     * @return true if the word is a root-word of the specified type; false otherwise.
     */
    isRootWordWithType(word: string, type: string): boolean;
}

export function isRootWord(rootWordProvider: RootWordProvider, word: string): boolean {
    return (!rootWordProvider || rootWordProvider.isRootWord(word));
}