package ph.bohol.util.stemmer;

import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.Map;

// import org.apache.commons.digester3.Digester;

public class Stemmer 
{
	private String language;
	private boolean compiled = false;
	private Map<String, String> constants = new HashMap<String, String>();
	private LinkedList<Affix> affixes = new LinkedList<Affix>();

	public void addAffix(Affix pattern)
	{
		affixes.addLast(pattern);
		compiled = false;
	}
	
//	public void load(String filename)
//	{
//		Digester digester = new Digester();
//		addDigesterRules(digester);
//		
//		digester.push(this);
//		
//        try
//        {
//            java.io.File srcfile = new java.io.File( filename );
//            digester.parse( srcfile );
//        }
//        catch ( java.io.IOException ioe )
//        {
//            System.out.println( "Error reading input file:" + ioe.getMessage() );
//            System.exit( -1 );
//        }
//        catch ( org.xml.sax.SAXException se )
//        {
//            System.out.println( "Error parsing input file:" + se.getMessage() );
//            System.exit( -1 );
//        }
//		
//		compile();
//	}

//	public void load(InputStream stream)
//	{
//		Digester digester = new Digester();
//		addDigesterRules(digester);
//		digester.push(this);
//		
//		try
//		{
//			digester.parse(stream);
//		}
//		catch (IOException e)
//		{			
//			e.printStackTrace();
//		}
//		catch (SAXException e)
//		{
//			e.printStackTrace();
//		}
//		compile();		
//	}
	
	
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
		results.add(new Derivation(word));
		
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
	
	
//	private static void addDigesterRules( Digester d )
//    {
//		d.addSetProperties( "stemmer" ); 
//		
//        d.addCallMethod( "stemmer/constant", "addConstant", 2 );
//        d.addCallParam( "stemmer/constant", 0, "name" );
//        d.addCallParam( "stemmer/constant", 1, "value" );
//		
//        d.addObjectCreate( "stemmer/affix", Affix.class );
//        d.addSetProperties( "stemmer/affix" );
//        d.addSetNext( "stemmer/affix", "addAffix" );
//
//        d.addObjectCreate( "stemmer/affix/pattern", AffixPattern.class );
//        d.addSetProperties( "stemmer/affix/pattern" );
//        d.addSetNext( "stemmer/affix/pattern", "addPattern" );
//    }

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
}
