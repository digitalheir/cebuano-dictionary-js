package ph.bohol.dictionaryapp;

import android.content.SharedPreferences;
import android.content.SharedPreferences.OnSharedPreferenceChangeListener;
import android.os.Bundle;
import android.preference.ListPreference;
import android.preference.PreferenceActivity;
import android.preference.PreferenceManager;

// See http://stackoverflow.com/questions/531427/ for OnSharedPreferenceChangeListener

public class DictionaryPreferenceActivity extends PreferenceActivity
        implements OnSharedPreferenceChangeListener {
    public static final String KEY_SEARCH_FONT_SIZE = "search_font_size";
    public static final String KEY_PRESENTATION_FONT_SIZE = "font_size";
    public static final String KEY_EXPAND_ABBREVIATIONS = "expand_abbreviations";
    public static final String KEY_PRESENTATION_STYLE = "presentation_style";
    public static final String KEY_REVERSE_LOOKUP = "reverse_lookup";
    public static final String KEY_MEASURE_UNITS = "measure_units";
    public static final String KEY_USE_STEMMING = "use_stemming";
    public static final String KEY_LAST_SEARCHWORD = "last_searchword";

    public static final String VALUE_MEASURE_ORIGINAL = "original";
    public static final String VALUE_MEASURE_METRIC = "metric";


    private ListPreference searchFontSizeListPreference;
    private ListPreference presentationFontSizeListPreference;
    private ListPreference presentationStyleListPreference;
    private ListPreference measureUnitListPreference;

    @SuppressWarnings("deprecation")
    @Override
    protected final void onCreate(final Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        addPreferencesFromResource(R.xml.preferences);

        searchFontSizeListPreference = (ListPreference) getPreferenceScreen().findPreference(KEY_SEARCH_FONT_SIZE);
        presentationFontSizeListPreference = (ListPreference) getPreferenceScreen().
                findPreference(KEY_PRESENTATION_FONT_SIZE);
        presentationStyleListPreference = (ListPreference) getPreferenceScreen().findPreference(KEY_PRESENTATION_STYLE);
        measureUnitListPreference = (ListPreference) getPreferenceScreen().findPreference(KEY_MEASURE_UNITS);
    }

    @Override
    protected final void onResume() {
        super.onResume();
        SharedPreferences sharedPreferences = PreferenceManager.getDefaultSharedPreferences(this);

        presentationStyleListPreference.setSummary(
                presentationStyleToText(sharedPreferences.getString(KEY_PRESENTATION_STYLE, "")));
        presentationFontSizeListPreference.setSummary(
                fontSizeToText(sharedPreferences.getString(KEY_PRESENTATION_FONT_SIZE, "")));
        searchFontSizeListPreference.setSummary(fontSizeToText(sharedPreferences.getString(KEY_SEARCH_FONT_SIZE, "")));
        measureUnitListPreference.setSummary(measureUnitToText(sharedPreferences.getString(KEY_MEASURE_UNITS, "")));

        sharedPreferences.registerOnSharedPreferenceChangeListener(this);
    }


    private String presentationStyleToText(final String presentationStyle) {
        if (presentationStyle.equalsIgnoreCase(EntryTransformer.STYLE_STRUCTURAL)) {
            return getString(R.string.presentation_structural);
        }
        if (presentationStyle.equalsIgnoreCase(EntryTransformer.STYLE_COMPACT)) {
            return getString(R.string.presentation_compact);
        }
        if (presentationStyle.equalsIgnoreCase(EntryTransformer.STYLE_DEBUG)) {
            return getString(R.string.presentation_debug);
        }
        return getString(R.string.presentation_traditional);
    }

    private String fontSizeToText(final String fontSize) {
        if (fontSize.equalsIgnoreCase("12")) {
            return getString(R.string.fontsize_tiny);
        }
        if (fontSize.equalsIgnoreCase("16")) {
            return getString(R.string.fontsize_small);
        }
        if (fontSize.equalsIgnoreCase("24")) {
            return getString(R.string.fontsize_large);
        }
        return getString(R.string.fontsize_medium);
    }

    private String measureUnitToText(final String measureUnit) {
        if (measureUnit.equalsIgnoreCase(VALUE_MEASURE_METRIC)) {
            return getString(R.string.measure_metric);
        }
        return getString(R.string.measure_original);
    }

    @Override
    protected final void onPause() {
        super.onPause();
        SharedPreferences sharedPreferences = PreferenceManager.getDefaultSharedPreferences(this);
        sharedPreferences.unregisterOnSharedPreferenceChangeListener(this);
    }

    public final void onSharedPreferenceChanged(final SharedPreferences sharedPreferences, final String key) {
        if (key.equals(KEY_PRESENTATION_STYLE)) {
            presentationStyleListPreference.setSummary(presentationStyleToText(
                    sharedPreferences.getString(KEY_PRESENTATION_STYLE, "")));
        } else if (key.equals(KEY_PRESENTATION_FONT_SIZE)) {
            presentationFontSizeListPreference.setSummary(fontSizeToText(
                    sharedPreferences.getString(KEY_PRESENTATION_FONT_SIZE, "")));
        } else if (key.equals(KEY_SEARCH_FONT_SIZE)) {
            searchFontSizeListPreference.setSummary(fontSizeToText(
                    sharedPreferences.getString(KEY_SEARCH_FONT_SIZE, "")));
        } else if (key.equals(KEY_MEASURE_UNITS)) {
            measureUnitListPreference.setSummary(measureUnitToText(sharedPreferences.getString(KEY_MEASURE_UNITS, "")));
        }
    }
}
