package ph.bohol.util.stemmer;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.util.Iterator;
import java.util.LinkedList;

import org.junit.Test;

public class StemmerTest 
{
	@Test
	public void testLoad() throws FileNotFoundException 
	{
		FileInputStream stream = new FileInputStream("src/ph/bohol/util/stemmer/stemmerTest.xml");		
		StemmerParser parser = new StemmerParser();
		Stemmer stemmer = parser.parse(stream);
		
		stemmer.print();	
		
		testDerivations(stemmer, "makasabot");
		testDerivations(stemmer, "balaya");
	}

	private void testDerivations(Stemmer stemmer, String word) 
	{
		LinkedList<Derivation> derivations = stemmer.findDerivations(word);
		
		Iterator<Derivation> iterator = derivations.iterator();	
		while (iterator.hasNext()) 
		{
			System.out.println("Potential derivation: " + iterator.next().toString());
		}
	}
}
