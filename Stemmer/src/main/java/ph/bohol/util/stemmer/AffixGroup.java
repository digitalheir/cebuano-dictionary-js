package ph.bohol.util.stemmer;

import java.util.LinkedList;
import java.util.Map;

class AffixGroup {
    private String name;
    private final LinkedList<Affix> affixes = new LinkedList<Affix>();

    final void addAffix(final Affix pattern) {
        affixes.addLast(pattern);
    }

    final void compile(final Map<String, String> constants) {
        for (Affix affix : affixes) {
            affix.compile(constants);
        }
    }

    public final void setName(final String newName) {
        name = newName;
    }

    public final String toString() {
        String result = "\n<group name='" + name + "'>\n";

        for (Affix affix : affixes) {
            result += affix.toString();
        }
        result += ("</group>\n");
        return result;
    }

    public final LinkedList<Affix> getAffixes() {
        return affixes;
    }
}
