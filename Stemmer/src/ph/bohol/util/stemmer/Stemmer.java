package ph.bohol.util.stemmer;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.Map;
import java.util.Set;
import java.util.Vector;

public class Stemmer
{
    private String language;
    private boolean compiled = false;
    private Map<String, String> constants = new HashMap<String, String>();
    private Vector<AffixGroup> groups = new Vector<AffixGroup>();
    private RootWordProvider rootWordProvider = null;

    final void addGroup(final AffixGroup group)
    {
        groups.addElement(group);
        compiled = false;
    }

    final void compile()
    {
        Iterator<AffixGroup> iterator = groups.iterator();
        while (iterator.hasNext())
        {
            iterator.next().compile(constants);
        }
        compiled = true;
    }

    final void addConstant(final String key, final String value)
    {
        constants.put(key, value);
    }

    public final LinkedList<Derivation> findDerivations(final String word)
    {
        if (!compiled)
        {
            compile();
        }
        Set<String> roots = new HashSet<String>();
        return innerFindDerivations(word, roots, 0);
    }


    private LinkedList<Derivation> innerFindDerivations(final String word, final Set<String> roots, final int level)
    {
        LinkedList<Derivation> derivations = null;
        if (groups.size() <= level)
        {
            derivations = new LinkedList<Derivation>();
            if (!roots.contains(word) && isRootWord(word))
            {
                Derivation derivation = new Derivation(word);
                derivations.add(derivation);
                roots.add(word);
            }
            return derivations;
        }
        else
        {
            derivations = innerFindDerivations(word, roots, level + 1);
        }

        AffixGroup group = groups.get(level);
        LinkedList<Affix> affixes = group.getAffixes();
        Iterator<Affix> iterator = affixes.iterator();
        while (iterator.hasNext())
        {
            Affix affix = iterator.next();
            LinkedList<String> rootCandidates = affix.rootCandidates(word);
            Iterator<String> rootIterator = rootCandidates.iterator();
            while (rootIterator.hasNext())
            {
                String root = rootIterator.next();

                if (!roots.contains(root) && isRootWord(root))
                {
                    Derivation derivation = new Derivation(root);
                    derivation.addAffix(affix);
                    derivations.add(derivation);
                    roots.add(root);
                }

                LinkedList<Derivation> innerDerivations = innerFindDerivations(root, roots, level + 1);

                // Copy the found derivations to the result list with the current affix as additional affix:
                Iterator<Derivation> iteratorDerivations = innerDerivations.iterator();
                while (iteratorDerivations.hasNext())
                {
                    Derivation derivation = iteratorDerivations.next();
                    derivation.addAffix(affix);
                    derivations.add(derivation);
                }
            }
        }
        return derivations;
    }

    private boolean isRootWord(final String word)
    {
        return (rootWordProvider == null || rootWordProvider.isRootWord(word));
    }

    public final String getLanguage()
    {
        return language;
    }

    final void setLanguage(final String newLanguage)
    {
        this.language = newLanguage;
    }

    public final String toString()
    {
        String result = "<stemmer language='" + language + "'>";

        Iterator<String> iteratorConstants = constants.keySet().iterator();
        while (iteratorConstants.hasNext())
        {
            String key = iteratorConstants.next().toString();
            String value = constants.get(key).toString();
            result += "\n<constant name='" + key + "' value='" + value + "'/>";
        }

        Iterator<AffixGroup> iteratorGroups = groups.iterator();
        while (iteratorGroups.hasNext())
        {
            result += iteratorGroups.next().toString();
        }

        return result + "</stemmer>\n";
    }

    public final RootWordProvider getRootProvider()
    {
        return rootWordProvider;
    }

    public final void setRootProvider(final RootWordProvider rootProvider)
    {
        this.rootWordProvider = rootProvider;
    }
}
