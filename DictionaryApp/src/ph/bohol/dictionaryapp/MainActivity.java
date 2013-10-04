package ph.bohol.dictionaryapp;

import java.io.IOException;
import java.io.InputStream;

import ph.bohol.util.stemmer.Stemmer;
import ph.bohol.util.stemmer.StemmerParser;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.SharedPreferences.OnSharedPreferenceChangeListener;
import android.database.Cursor;
import android.os.AsyncTask;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.webkit.WebView;
import android.widget.AdapterView;
import android.widget.ListView;
import android.widget.SearchView;


public class MainActivity extends Activity
	implements SearchView.OnQueryTextListener
{	
	static final String SEARCH_WORD = "ph.bohol.dictionaryapp.SEARCH_WORD";
	static final String ENTRY_ID = "ph.bohol.dictionaryapp.ENTRY_ID";
		
	private static final String TAG = "MainActivity";
	private static final int RESULT_SETTINGS = 1;
	private static final int RESULT_SHOW_ENTRY = 2;
	private static final String ASSET_STEMMER_CEBUANO = "xml/stemmerCebuano.xml";
	
	private SearchView searchView;	
	private ListView listView = null;
	private WebView webView = null;
	private Cursor cursor = null;
	private String searchWord;	
	private Stemmer stemmer = null;
	private boolean reverseLookup = false;
					
	@Override
	protected void onCreate(Bundle savedInstanceState)
	{
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
		
		Log.d(TAG, "OnCreate");

		retrievePreferences();
		intializeStemmer();
		
	    listView = (ListView) findViewById(R.id.listview);	
    	webView = (WebView) findViewById(R.id.webview);	
			    
		// Get searchWord after resume (e.g. after a rotation).
        if (savedInstanceState != null)
        {
        	searchWord = savedInstanceState.getString(SEARCH_WORD);
        	Log.d(TAG, "Got searchWord '" + searchWord + "' from savedInstanceState");
        }
        else
        {
        	Intent intent = getIntent();
        	searchWord = intent.getStringExtra(MainActivity.SEARCH_WORD);
        	Log.d(TAG, "Got searchWord '" + searchWord + "' from intent");
        }
		update();
	}

	private void update()
	{
		if (searchWord == null || searchWord.isEmpty())
		{			
			searchWord = "";
			showFrontPage();
		}
		else
		{
			populateList(searchWord);
		}
	}

    private void showFrontPage()
	{		
    	listView.setVisibility(View.INVISIBLE);
    	webView.setVisibility(View.VISIBLE);
    	webView.loadUrl("file:///android_asset/html/frontpage.html");
	}

	@Override
    public void onSaveInstanceState(Bundle outState) 
    {
         outState.putString(SEARCH_WORD, searchWord);
         super.onSaveInstanceState(outState);
    }
	
	private void populateList(String searchWord)
	{
		webView.setVisibility(View.INVISIBLE);
		listView.setVisibility(View.VISIBLE);
		PrepareCursorTask cursorTask = new PrepareCursorTask(this);
		cursorTask.execute(searchWord);
	}

	private void setCursorAdapter(Cursor newCursor)
	{
		// First cleanup our previous cursor, to prevent resource leaks.
		if (cursor != null)
		{
			cursor.close();
		}
		cursor = newCursor;
		
		HeadCursorAdapter h = new HeadCursorAdapter(this, cursor);
	    listView.setAdapter(h);	 	
	    	    
		listView.setOnItemClickListener(new AdapterView.OnItemClickListener() 
		{
		    @Override
		    public void onItemClick(AdapterView<?> parent, final View view, int position, long id) 
		    {
				cursor.moveToPosition(position);
				String entryId = cursor.getString(cursor.getColumnIndex(DictionaryDatabase.HEAD_ENTRY_ID));
				  	
				// Result will be search word if cross-reference is followed.
				Intent intent = new Intent(MainActivity.this, ShowEntryActivity.class);
				intent.putExtra(ENTRY_ID, entryId);
				startActivityForResult(intent, RESULT_SHOW_ENTRY);				
		    }
		});
	}

	private void retrievePreferences()
	{
		SharedPreferences preferences = PreferenceManager.getDefaultSharedPreferences(this);		
		reverseLookup  = preferences.getBoolean(DictionaryPreferenceActivity.KEY_REVERSE_LOOKUP, false);		
	}
	
	private void intializeStemmer()
	{
		if (stemmer == null)
		{
			InputStream stream = null;
			try
			{
				stream = getAssets().open(ASSET_STEMMER_CEBUANO);
			}
			catch (IOException e)
			{
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		    
			StemmerParser parser = new StemmerParser();
		    stemmer = parser.parse(stream);			
		}
	}
		
	@Override
	public boolean onCreateOptionsMenu(Menu menu)
	{
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.main, menu);
		
	    MenuItem searchItem = menu.findItem(R.id.search);
	    searchView = (SearchView) searchItem.getActionView();
	    searchView.setOnQueryTextListener(this);	  
	    searchView.setIconifiedByDefault(false);
		
	    // Set search word already retrieved from the intent in onCreate();
	    searchView.setQuery(searchWord, false);	    
		return true;
	}
	
	@Override
	public boolean onOptionsItemSelected(MenuItem item) 
	{
		switch (item.getItemId()) 
		{
			case R.id.action_settings:
				Intent i = new Intent(this, DictionaryPreferenceActivity.class);
				startActivityForResult(i, RESULT_SETTINGS);
				break;
		}
		return true;
	}
	
	@Override
	protected void onActivityResult(int requestCode, int resultCode, Intent data) 
	{
		super.onActivityResult(requestCode, resultCode, data);
		
		// TODO use OnSharedPreferenceChangeListener to detect preference changes.
		if (resultCode == Activity.RESULT_CANCELED && !(requestCode == RESULT_SETTINGS)) 
		{
			return;
	    }
		
		switch (requestCode) 
		{
			case RESULT_SHOW_ENTRY:
				overridePendingTransition(R.anim.left_in, R.anim.right_out);
				
				// User followed a cross-reference to another entry, search for it.
				if (resultCode == Activity.RESULT_OK)
				{
					searchWord = data.getStringExtra(MainActivity.SEARCH_WORD);
					searchView.setQuery(searchWord, false);						
					Log.d(TAG, "Activity returned with '" + searchWord + "'");
					update();
				}
				break;
			case RESULT_SETTINGS:
				retrievePreferences();
				update();
				break;
		}
	}
	
	@Override
	protected void onDestroy() 
	{
		super.onDestroy();
		if (cursor != null)
		{
			cursor.close();
		}
	}

	@Override
	public boolean onQueryTextChange(String newText)
	{
		if (!newText.equals(searchWord))
		{
			searchWord = newText;
			update();
		}
		return false;
	}
	
	@Override
	public boolean onQueryTextSubmit(String query)
	{
		// Already handled by the onQueryTextChange() handler, just close the search
		searchView.clearFocus();
		return true;
	}
	
	private class PrepareCursorTask extends AsyncTask<String, Void, Cursor>
	{
		private final Context context;
		
		PrepareCursorTask(Context context)
		{
			this.context = context;
		}
		
		@Override
		protected Cursor doInBackground(String... searchWords)
		{			
			// List<Derivation> derivations = stemmer.findDerivations(searchWord);
			
			DictionaryDatabase database = DictionaryDatabase.getInstance(context);
			Cursor cursor;
			if (reverseLookup)
			{
				cursor = database.getHeadsAndTranslationsStartingWith(searchWord);		
			}
			else
			{
				cursor = database.getHeadsStartingWith(searchWord);	
			}
			
			// Move the cursor to the first entry, do force the database do some heavy-lifting
			// on this task's thread before handing it to the UI thread.
			cursor.moveToFirst();
			return cursor;
		}
		
		@Override
		protected void onPostExecute(Cursor result)
		{
		    if (isCancelled()) 
		    {
		    	result = null;
		    }
		    else
		    {
		    	setCursorAdapter(result);
		    }
		}		
	}	
	

}
