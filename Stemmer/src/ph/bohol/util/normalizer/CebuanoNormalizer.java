package ph.bohol.util.normalizer;

import java.text.Normalizer;

public class CebuanoNormalizer implements SpellingNormalizer
{
	@Override
 	public String normalize(String word)
	{	
		// Go to lower-case and decompose Unicode
		String normalizedString = Normalizer.normalize(word.toLowerCase(), Normalizer.Form.NFD);
		
		// Drop all diacritics
		normalizedString = normalizedString.replaceAll("\\p{M}", "");

		// Old orthography stuff
		normalizedString = normalizedString.replaceAll("z", "s");
		normalizedString = normalizedString.replaceAll("ca", "ka");
		normalizedString = normalizedString.replaceAll("ce", "si");
		normalizedString = normalizedString.replaceAll("ci", "si");		
		normalizedString = normalizedString.replaceAll("gui", "gi");
		normalizedString = normalizedString.replaceAll("qui", "ki");
						
		// Wolff's spelling.
		// f -> p; v -> b; o -> u; e -> i
		normalizedString = normalizedString.replaceAll("f", "p");
		normalizedString = normalizedString.replaceAll("v", "b");
		normalizedString = normalizedString.replaceAll("o", "u");
		normalizedString = normalizedString.replaceAll("e", "i");
		
		return normalizedString;
	}	
}
