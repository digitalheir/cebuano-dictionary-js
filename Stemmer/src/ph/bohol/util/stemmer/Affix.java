
package ph.bohol.util.stemmer;

import java.util.Iterator;
import java.util.LinkedList;
import java.util.Map;

public class Affix 
{
	private String form;
	private String label;
	private LinkedList<AffixPattern> patterns = new LinkedList<AffixPattern>();

	/**
	 * Add a pattern to the list of patterns for this Affix.
	 * @param pattern the pattern to be added.
	 */
	public void addPattern(AffixPattern pattern)
	{
		patterns.addLast(pattern);
	}
	
	public String getForm() 
	{
		return form;
	}

	public void setForm(String form) 
	{
		this.form = form;
	}

	public String getLabel() 
	{
		return label;
	}

	public void setLabel(String label)
	{
		this.label = label;
	}

	/**
	 * Determine whether this affix is applied to the given word.
	 * @param word the word to be tested for the presence of this affix.
	 * @return true if the affix is applied to this word, false otherwise.
	 */
	public boolean applies(String word)
	{
		Iterator<AffixPattern> iterator = patterns.iterator();		
		while (iterator.hasNext()) 
		{
			if (iterator.next().applies(word))
				return true;
		}	
		return false;
	}
	
	/**
	 * Remove this affix from a given word.
	 * @param word the word from which the affix is to be removed.
	 * @return the word with the affix removed, or null if the affix was not present.
	 */
	public String strip(String word)
	{
		Iterator<AffixPattern> iterator = patterns.iterator();		
		while (iterator.hasNext()) 
		{
			AffixPattern pattern = iterator.next();
			if (pattern.applies(word))
			{	
				return pattern.strip(word);
			}
		}	
		return null;
	}
	
	public void print()
	{
		System.out.println(toString());
	}
	
	public String toString()
	{
		String result = "<affix form='" + form + "' label='" + label + "'>\n";
		
		Iterator<AffixPattern> iterator = patterns.iterator();		 
		while (iterator.hasNext()) 
		{
			result += iterator.next().toString();
		}	
		
		result += ("</affix>\n");
		return result;
	}

	void compile(Map<String, String> constants) 
	{
		Iterator<AffixPattern> iterator = patterns.iterator();		 
		while (iterator.hasNext()) 
		{
			iterator.next().compile(constants);
		}	
	}
}
