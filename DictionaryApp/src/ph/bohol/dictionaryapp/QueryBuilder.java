package ph.bohol.dictionaryapp;

import java.util.Iterator;
import java.util.List;

import ph.bohol.util.stemmer.Derivation;

public class QueryBuilder
{
	String buildQuery(List<Derivation> derivations)
	{
		String query = "";
		
		// Build complex queries to find derived forms, similar to:
		// SELECT *, "makasulud" AS searchword, "maka-" AS derivation FROM WCED_head WHERE normalized_head = "sulud"
		// UNION
	    // SELECT *, "masulud" AS searchword, "ma-" AS derivation FROM WCED_head WHERE normalized_head = "sulud"
		// ORDER BY derivation
		
		String querySnippet = "SELECT *, ? AS derivation FROM wced_head WHERE normalized_head = ?";
		
		Iterator<Derivation> iterator = derivations.iterator();	
		while (iterator.hasNext()) 
		{
			Derivation derivation = iterator.next();

			String root = derivation.getRoot();
			String d = derivation.toString();			
		}
			
		return query;
	}	
}

