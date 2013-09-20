package ph.bohol.dictionaryapp;

import android.os.Bundle;
import android.preference.PreferenceActivity;

public class DictionaryPreferenceActivity extends PreferenceActivity
{
	@Override
	protected void onCreate(Bundle savedInstanceState)
	{
		super.onCreate(savedInstanceState);
		addPreferencesFromResource(R.xml.preferences);
	}
}
