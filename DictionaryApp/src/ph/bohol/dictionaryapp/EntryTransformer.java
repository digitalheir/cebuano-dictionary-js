package ph.bohol.dictionaryapp;

import android.content.Context;

public class EntryTransformer
{
	public final String STYLE_COMPACT = "compact";
	public final String STYLE_STRUCTURAL = "structural";
	public final String STYLE_TRADITIONAL = "traditional";
	public final String STYLE_DEBUG = "debug";
	
	private final String XSLT_COMPACT = "xslt/compact.xsl";
	private final String XSLT_STRUCTURAL = "xslt/structural.xsl";
	private final String XSLT_TRADITIONAL = "xslt/typographical.xsl";
	private final String XSLT_DEBUG = "xslt/debug.xsl";
	
	private boolean expandAbbreviations = false;
	private int fontSize = 20;
	
	
	private Context context;

	EntryTransformer(Context context)
	{
		this.context = context;		
	}
	
	
	public String transform(String entry, String presentationStyle)
	{
		String xsltFile = findXsltFile(presentationStyle);
		
		
		return "";
	}


	private String findXsltFile(String presentationStyle)
	{
		if (presentationStyle.equalsIgnoreCase(STYLE_TRADITIONAL))
		{
			return XSLT_TRADITIONAL;
		}
		if (presentationStyle.equalsIgnoreCase(STYLE_DEBUG))
		{
			return XSLT_DEBUG;
		}
		if (presentationStyle.equalsIgnoreCase(STYLE_COMPACT))
		{
			return XSLT_COMPACT;
		}
		return XSLT_STRUCTURAL;
	}


	public boolean isExpandAbbreviations()
	{
		return expandAbbreviations;
	}


	public void setExpandAbbreviations(boolean expandAbbreviations)
	{
		this.expandAbbreviations = expandAbbreviations;
	}


	public int getFontSize()
	{
		return fontSize;
	}


	public void setFontSize(int fontSize)
	{
		this.fontSize = fontSize;
	}
	
	
	
	
}
