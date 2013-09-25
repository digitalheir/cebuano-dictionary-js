package ph.bohol.dictionaryapp;

import android.content.SharedPreferences;
import android.content.SharedPreferences.OnSharedPreferenceChangeListener;
import android.os.Bundle;
import android.preference.ListPreference;
import android.preference.PreferenceActivity;
import android.preference.PreferenceManager;

// See http://stackoverflow.com/questions/531427/ for OnSharedPreferenceChangeListener

public class DictionaryPreferenceActivity extends PreferenceActivity 
	implements OnSharedPreferenceChangeListener
{
	public static final String SEARCH_KEY_FONT_SIZE = "search_font_size";
	public static final String PRESENTATION_KEY_FONT_SIZE = "font_size";
    public static final String KEY_PRESENTATION_STYLE = "presentation_style";
    private ListPreference searchFontSizeListPreference;
    private ListPreference presentationFontSizeListPreference;
    private ListPreference presentationStyleListPreference;
		
	@SuppressWarnings("deprecation")
	@Override
	protected void onCreate(Bundle savedInstanceState)
	{
		super.onCreate(savedInstanceState);
		addPreferencesFromResource(R.xml.preferences);
		
		searchFontSizeListPreference = (ListPreference) getPreferenceScreen().findPreference(SEARCH_KEY_FONT_SIZE);
		presentationFontSizeListPreference = (ListPreference) getPreferenceScreen().findPreference(PRESENTATION_KEY_FONT_SIZE);
		presentationStyleListPreference = (ListPreference) getPreferenceScreen().findPreference(KEY_PRESENTATION_STYLE);		
	}
	
	@Override
    protected void onResume() 
	{
        super.onResume();        
		SharedPreferences sharedPreferences = PreferenceManager.getDefaultSharedPreferences(this);
        
        presentationStyleListPreference.setSummary(presentationStyleToText(sharedPreferences.getString(KEY_PRESENTATION_STYLE, "")));
        presentationFontSizeListPreference.setSummary(fontSizeToText(sharedPreferences.getString(PRESENTATION_KEY_FONT_SIZE, "")));
        searchFontSizeListPreference.setSummary(fontSizeToText(sharedPreferences.getString(SEARCH_KEY_FONT_SIZE, "")));

        sharedPreferences.registerOnSharedPreferenceChangeListener(this);
    }

	
	private String presentationStyleToText(String presentationStyle)
	{
		if (presentationStyle.equalsIgnoreCase("structural"))
			return getString(R.string.presentation_structural);		
		if (presentationStyle.equalsIgnoreCase("compact"))
			return getString(R.string.presentation_compact);	
		if (presentationStyle.equalsIgnoreCase("debug"))
			return getString(R.string.presentation_debug);	
		return getString(R.string.presentation_traditional);
	}
	
	private String fontSizeToText(String fontSize)
	{	
		if (fontSize.equalsIgnoreCase("12"))
			return getString(R.string.fontsize_tiny);	
		if (fontSize.equalsIgnoreCase("16"))
			return getString(R.string.fontsize_small);		
		if (fontSize.equalsIgnoreCase("24"))
			return getString(R.string.fontsize_large);	
		return getString(R.string.fontsize_medium);
	}
	
    @Override
    protected void onPause() 
    {
        super.onPause();
        SharedPreferences sharedPreferences = PreferenceManager.getDefaultSharedPreferences(this);
        sharedPreferences.unregisterOnSharedPreferenceChangeListener(this);
    }
	
	public void onSharedPreferenceChanged(SharedPreferences sharedPreferences, String key) 
	{
	    if (key.equals(KEY_PRESENTATION_STYLE)) 
	    {  	
	    	presentationStyleListPreference.setSummary(presentationStyleToText(sharedPreferences.getString(KEY_PRESENTATION_STYLE, "")));
	    }
	    else if (key.equals(PRESENTATION_KEY_FONT_SIZE)) 
	    {    	
	    	presentationFontSizeListPreference.setSummary(fontSizeToText(sharedPreferences.getString(PRESENTATION_KEY_FONT_SIZE, "")));
	    }
	    else if (key.equals(SEARCH_KEY_FONT_SIZE)) 
	    {    	
	    	searchFontSizeListPreference.setSummary(fontSizeToText(sharedPreferences.getString(SEARCH_KEY_FONT_SIZE, "")));
	    }
	}
}
