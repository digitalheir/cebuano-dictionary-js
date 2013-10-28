package ph.bohol.util.stemmer;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.Map;
import java.util.Set;

public class Stemmer
{
    private String language;
    private boolean compiled = false;
    private Map<String, String> constants = new HashMap<String, String>();
    private LinkedList<Affix> affixes = new LinkedList<Affix>();
    private RootWordProvider rootWordProvider = null;

    final void addAffix(final Affix pattern)
    {
        affixes.addLast(pattern);
        compiled = false;
    }

    final void compile()
    {
        Iterator<Affix> iterator = affixes.iterator();
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

        HashSet<String> roots = new HashSet<String>();
        return innerFindDerivations(word, roots);
    }

    private LinkedList<Derivation> innerFindDerivations(final String word, final Set<String> roots)
    {
        LinkedList<Derivation> results = new LinkedList<Derivation>();

        // The trivial case: the entire word is a root:
        if (!roots.contains(word) && isRootWord(word))
        {
            results.add(new Derivation(word));
            roots.add(word);
        }

        Iterator<Affix> iterator = affixes.iterator();
        while (iterator.hasNext())
        {
            Affix affix = iterator.next();
            if (affix.applies(word))
            {
                String root = affix.strip(word);

                // Recursively look for derivations of the current root:
                LinkedList<Derivation> innerDerivations = innerFindDerivations(root, roots);

                // Copy the found derivations to the result list with the current affix as additional affix:
                Iterator<Derivation> iteratorDerivations = innerDerivations.iterator();
                while (iteratorDerivations.hasNext())
                {
                    Derivation derivation = iteratorDerivations.next();
                    derivation.addAffix(affix);
                    results.add(derivation);
                }
            }
        }

        return results;
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

    public final void print()
    {
        System.out.println("<stemmer language='" + language + "'>");

        Iterator<String> iteratorConstants = constants.keySet().iterator();
        while (iteratorConstants.hasNext())
        {
            String key = iteratorConstants.next().toString();
            String value = constants.get(key).toString();
            System.out.println("<constant name='" + key + "' value='" + value + "'/>");
        }

        Iterator<Affix> iteratorAffixes = affixes.iterator();
        while (iteratorAffixes.hasNext())
        {
            iteratorAffixes.next().print();
        }

        System.out.println("</stemmer>");
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
