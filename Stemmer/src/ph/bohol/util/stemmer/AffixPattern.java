package ph.bohol.util.stemmer;

import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class AffixPattern 
{
	private String pattern;
	private String root;
	private String compiledPattern;
	
	public AffixPattern()
	{
		
	}
	
	public AffixPattern(String pattern, String root)
	{
		this.setPattern(pattern);
		this.setRoot(root);
	}

	public boolean applies(String word)
	{
		return word.matches(compiledPattern);
	}
	
	public String strip(String word)
	{
		if (word.matches(compiledPattern))
		{
			String result = word.replaceAll(compiledPattern, root);
			return result;
		}
		else
		{
			return null;
		}
	}
	
	public String getPattern() 
	{
		return pattern;
	}

	public void setPattern(String pattern) 
	{
		this.pattern = pattern;
	}

	public String getRoot() 
	{
		return root;
	}

	public void setRoot(String root) 
	{
		this.root = root;
	}

	public void print() 
	{
		System.out.println(toString());
	}

	public String toString()
	{
		return "<pattern pattern='" + pattern + "' root='" + root + "'/>\n";
	}
	
	void compile(Map<String, String> constants) 
	{
		// Replace constants given as "...{key}..." in pattern.		
		Pattern constantPattern = Pattern.compile("\\{(\\w+)\\}");
		Matcher matcher = constantPattern.matcher(pattern);
	    
		int position = 0;
		String result = "";
		while (matcher.find()) 
	    {
			result += pattern.substring(position, matcher.start());
			result += constants.get(matcher.group(1));
			position = matcher.end();
	    }
		result += pattern.substring(position);
				
		compiledPattern = result;
	}
}
