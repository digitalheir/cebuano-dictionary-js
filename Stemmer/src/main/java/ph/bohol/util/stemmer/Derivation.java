package ph.bohol.util.stemmer;

import java.util.LinkedList;

public class Derivation {
    private final String root;
    private final LinkedList<Affix> affixes = new LinkedList<Affix>();

    Derivation(final String newRoot) {
        this.root = newRoot;
    }

    Derivation(final String newRoot, final Affix affix) {
        this.root = newRoot;
        affixes.addFirst(affix);
    }

    public final String getRoot() {
        return root;
    }

    final void addAffix(final Affix affix) {
        affixes.addFirst(affix);
    }

    public final String toString() {
        String result = "";
        for (Affix affix : affixes) {
            result += affix.getForm() + " + ";
        }
        result += root;
        return result;
    }
}

