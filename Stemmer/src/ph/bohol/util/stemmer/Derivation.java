package ph.bohol.util.stemmer;

import java.util.Iterator;
import java.util.LinkedList;

public class Derivation
{
    private String root;
    private LinkedList<Affix> affixes = new LinkedList<Affix>();

    Derivation(final String newRoot)
    {
        this.root = newRoot;
    }

    Derivation(final String newRoot, final Affix affix)
    {
        this.root = newRoot;
        affixes.addFirst(affix);
    }

    public final String getRoot()
    {
        return root;
    }

    final void addAffix(final Affix affix)
    {
        affixes.addFirst(affix);
    }

    public final String toString()
    {
        String result = "";
        Iterator<Affix> iterator = affixes.iterator();
        while (iterator.hasNext())
        {
            result += iterator.next().getForm() + " + ";
        }
        result += root;
        return result;
    }
}

