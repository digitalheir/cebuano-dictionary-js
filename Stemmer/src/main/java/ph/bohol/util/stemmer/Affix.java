package ph.bohol.util.stemmer;

import java.util.LinkedList;
import java.util.Map;

public class Affix {
    private String form;
    private String label;
    private String rootType;
    private final LinkedList<AffixPattern> patterns = new LinkedList<AffixPattern>();

    /**
     * Add a pattern to the list of patterns for this Affix.
     *
     * @param pattern the pattern to be added.
     */
    public final void addPattern(final AffixPattern pattern) {
        patterns.addLast(pattern);
    }

    public final String getForm() {
        return form;
    }

    public final void setForm(final String newForm) {
        this.form = newForm;
    }

    public final String getLabel() {
        return label;
    }

    public final void setLabel(final String newLabel) {
        this.label = newLabel;
    }

    /**
     * Determine whether this affix is applied to the given word.
     *
     * @param word the word to be tested for the presence of this affix.
     * @return true if the affix is applied to this word, false otherwise.
     */
    final boolean applies(final String word) {
        for (AffixPattern pattern : patterns) {
            if (pattern.applies(word)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Remove this affix from a given word.
     *
     * @param word the word from which the affix is to be removed.
     * @return the word with the affix removed, or null if the affix was not present.
     */
    public final String strip(final String word) {
        for (AffixPattern pattern : patterns) {
            if (pattern.applies(word)) {
                return pattern.strip(word);
            }
        }
        return null;
    }

    public final LinkedList<String> rootCandidates(final String word) {
        LinkedList<String> rootCandidates = new LinkedList<String>();
        for (AffixPattern pattern : patterns) {
            if (pattern.applies(word)) {
                rootCandidates.add(pattern.strip(word));
            }
        }
        return rootCandidates;
    }

    public final String toString() {
        String result = "<affix form='" + form + "' label='" + label + "'";

        if (rootType != null && !rootType.isEmpty()) {
            result += "rootType='" + rootType + "'";
        }
        result += ">\n";

        for (AffixPattern pattern : patterns) {
            result += pattern.toString();
        }

        result += ("</affix>\n");
        return result;
    }

    final void compile(final Map<String, String> constants) {
        for (AffixPattern pattern : patterns) {
            pattern.compile(constants);
        }
    }

    public final String getRootType() {
        return rootType;
    }

    public final void setRootType(final String newRootType) {
        this.rootType = newRootType;
    }
}
