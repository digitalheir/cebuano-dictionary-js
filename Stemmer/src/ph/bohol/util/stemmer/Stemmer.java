package ph.bohol.util.stemmer;

import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.Map;

public class Stemmer 
{
	private String language;
	private boolean compiled = false;
	private Map<String, String> constants = new HashMap<String, String>();
	private LinkedList<Affix> affixes = new LinkedList<Affix>();
	private RootWordProvider rootProvider = null;

	public void addAffix(Affix pattern)
	{
		affixes.addLast(pattern);
		compiled = false;
	}
	
	void compile()
	{
		Iterator<Affix> iterator = affixes.iterator();		 
		while (iterator.hasNext()) 
		{
			iterator.next().compile(constants);
		}
		compiled = true;
	}
	
	public void addConstant(String key, String value)
	{
		constants.put(key, value);
	}
	
	public LinkedList<Derivation> findDerivations(String word)
	{
		if (!compiled)
		{
			compile();
		}
				
		LinkedList<Derivation> results = new LinkedList<Derivation>();
		
		if (isRootWord(word))
		{
			results.add(new Derivation(word));
		}
		
		Iterator<Affix> iterator = affixes.iterator();
		while (iterator.hasNext()) 
		{
			Affix affix = iterator.next();
			if (affix.applies(word))
			{	
				String root = affix.strip(word);
				
				// Recursively look for derivations of the current root:
				LinkedList<Derivation> innerDerivations = findDerivations(root);
				
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
	
	private boolean isRootWord(String word)
	{
		return (rootProvider == null || rootProvider.isRootWord(word));		
	}
	
	public String getLanguage() 
	{
		return language;
	}

	public void setLanguage(String language) 
	{
		this.language = language;
	}

	public void print() 
	{		
		System.out.println( "<stemmer language='" + language + "'>" );
		
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
				
		System.out.println( "</stemmer>" );	
	}

	public RootWordProvider getRootProvider()
	{
		return rootProvider;
	}

	public void setRootProvider(RootWordProvider rootProvider)
	{
		this.rootProvider = rootProvider;
	}	
}
