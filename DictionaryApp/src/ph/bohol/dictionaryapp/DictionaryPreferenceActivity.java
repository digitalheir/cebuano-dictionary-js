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
	public static final String KEY_FONT_SIZE = "font_size";
    public static final String KEY_PRESENTATION_STYLE = "presentation_style";
    private ListPreference fontSizeListPreference;
    private ListPreference presentationStyleListPreference;
		
	@SuppressWarnings("deprecation")
	@Override
	protected void onCreate(Bundle savedInstanceState)
	{
		super.onCreate(savedInstanceState);
		addPreferencesFromResource(R.xml.preferences);
		
		fontSizeListPreference = (ListPreference) getPreferenceScreen().findPreference(KEY_FONT_SIZE);
		presentationStyleListPreference = (ListPreference) getPreferenceScreen().findPreference(KEY_PRESENTATION_STYLE);		
	}
	
	@Override
    protected void onResume() 
	{
        super.onResume();        
		SharedPreferences sharedPreferences = PreferenceManager.getDefaultSharedPreferences(this);
        
        presentationStyleListPreference.setSummary("Current value is " + sharedPreferences.getString(KEY_PRESENTATION_STYLE, ""));
        fontSizeListPreference.setSummary("Current value is " + sharedPreferences.getString(KEY_FONT_SIZE, ""));

        sharedPreferences.registerOnSharedPreferenceChangeListener(this);
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
	    	String value = sharedPreferences.getString(key, "");	    	
	    	presentationStyleListPreference.setSummary("Current value is " + value);
	    }
	    else if (key.equals(KEY_FONT_SIZE)) 
	    {
	    	String value = sharedPreferences.getString(key, "");	    	
	    	fontSizeListPreference.setSummary("Current value is " + value);
	    }
	}
}
