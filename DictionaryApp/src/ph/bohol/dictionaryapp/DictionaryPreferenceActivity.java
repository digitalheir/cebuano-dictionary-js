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
	public static final String KEY_SEARCH_FONT_SIZE = "search_font_size";
	public static final String KEY_PRESENTATION_FONT_SIZE = "font_size";
	public static final String KEY_EXPAND_ABBREVIATIONS = "expand_abbreviations";
    public static final String KEY_PRESENTATION_STYLE = "presentation_style";
    public static final String KEY_REVERSE_LOOKUP = "reverse_lookup";
    public static final String KEY_MEASURE_UNITS = "measure_units";
    
    private ListPreference searchFontSizeListPreference;
    private ListPreference presentationFontSizeListPreference;
    private ListPreference presentationStyleListPreference;
    private ListPreference measureUnitListPreference;
		
	@SuppressWarnings("deprecation")
	@Override
	protected void onCreate(Bundle savedInstanceState)
	{
		super.onCreate(savedInstanceState);
		addPreferencesFromResource(R.xml.preferences);
		
		searchFontSizeListPreference = (ListPreference) getPreferenceScreen().findPreference(KEY_SEARCH_FONT_SIZE);
		presentationFontSizeListPreference = (ListPreference) getPreferenceScreen().findPreference(KEY_PRESENTATION_FONT_SIZE);
		presentationStyleListPreference = (ListPreference) getPreferenceScreen().findPreference(KEY_PRESENTATION_STYLE);	
		measureUnitListPreference = (ListPreference) getPreferenceScreen().findPreference(KEY_MEASURE_UNITS);
	}
	
	@Override
    protected void onResume() 
	{
        super.onResume();        
		SharedPreferences sharedPreferences = PreferenceManager.getDefaultSharedPreferences(this);
        
        presentationStyleListPreference.setSummary(presentationStyleToText(sharedPreferences.getString(KEY_PRESENTATION_STYLE, "")));
        presentationFontSizeListPreference.setSummary(fontSizeToText(sharedPreferences.getString(KEY_PRESENTATION_FONT_SIZE, "")));
        searchFontSizeListPreference.setSummary(fontSizeToText(sharedPreferences.getString(KEY_SEARCH_FONT_SIZE, "")));
		measureUnitListPreference.setSummary(measureUnitToText(sharedPreferences.getString(KEY_MEASURE_UNITS, "")));

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
	
	private String measureUnitToText(String measureUnit)
	{
		if (measureUnit.equalsIgnoreCase("metric"))
			return getString(R.string.measure_metric);		
		return getString(R.string.measure_original);
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
	    else if (key.equals(KEY_PRESENTATION_FONT_SIZE)) 
	    {    	
	    	presentationFontSizeListPreference.setSummary(fontSizeToText(sharedPreferences.getString(KEY_PRESENTATION_FONT_SIZE, "")));
	    }
	    else if (key.equals(KEY_SEARCH_FONT_SIZE)) 
	    {    	
	    	searchFontSizeListPreference.setSummary(fontSizeToText(sharedPreferences.getString(KEY_SEARCH_FONT_SIZE, "")));
	    }
	    else if (key.equals(KEY_MEASURE_UNITS)) 
	    {    	
	    	measureUnitListPreference.setSummary(measureUnitToText(sharedPreferences.getString(KEY_MEASURE_UNITS, "")));
	    }
	}
}
