package ph.bohol.util.stemmer;

import java.util.Iterator;
import java.util.LinkedList;
import java.util.Map;

public class AffixGroup
{
    private String name;
    private LinkedList<Affix> affixes = new LinkedList<Affix>();

    final void addAffix(final Affix pattern)
    {
        affixes.addLast(pattern);
    }

    final void compile(final Map<String, String> constants)
    {
        Iterator<Affix> iterator = affixes.iterator();
        while (iterator.hasNext())
        {
            iterator.next().compile(constants);
        }
    }

    public final void setName(final String newName)
    {
        name = newName;
    }

    public final String toString()
    {
        String result = "\n<group name='" + name + "'>\n";

        Iterator<Affix> iterator = affixes.iterator();
        while (iterator.hasNext())
        {
            result += iterator.next().toString();
        }
        result += ("</group>\n");
        return result;
    }

    public final LinkedList<Affix> getAffixes()
    {
        return affixes;
    }
}
