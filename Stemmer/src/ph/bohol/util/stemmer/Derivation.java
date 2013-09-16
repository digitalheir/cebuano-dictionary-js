package ph.bohol.util.stemmer;

import java.util.Iterator;
import java.util.LinkedList;

public class Derivation
{
	private String root;
	private LinkedList<Affix> affixes = new LinkedList<Affix>();
	
	Derivation(String root)
	{
		this.root = root;
	}
	
	Derivation(String root, Affix affix)
	{
		this.root = root;
		affixes.addFirst(affix);
	}
	
	public String getRoot()
	{
		return root;
	}
	
	void addAffix(Affix affix)
	{
		affixes.addFirst(affix);		
	}
	
	public String toString()
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

