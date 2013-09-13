package ph.bohol.util.stemmer;

import static org.junit.Assert.*;

import java.util.HashMap;
import org.junit.Test;

public class AffixPatternTest 
{
	@Test
	public void testApply() 
	{
		AffixPattern p = new AffixPattern("maka([a-z]+)", "$1");
		p.compile(new HashMap<String, String>());
		
		assertTrue(p.applies("makasabot")); 
		assertFalse(p.applies("nakasabot")); 
	}
	
	@Test
	public void testStrip() 
	{
		AffixPattern p = new AffixPattern("maka([a-z]+)", "$1");
		p.compile(new HashMap<String, String>());
		
		assertTrue(p.strip("makasabot").equals("sabot")); 
		assertTrue(p.strip("nakasabot") == null); 
	}
	
	@Test
	public void testToString()
	{
		AffixPattern p = new AffixPattern("maka([a-z]+)", "$1");
		
		assertTrue(p.toString().equals("<pattern pattern='maka([a-z]+)' root='$1'/>\n"));
	}
}
