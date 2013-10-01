package ph.bohol.dictionaryapp;

import java.io.IOException;
import java.io.InputStream;
import ph.bohol.util.normalizer.CebuanoNormalizer;
import ph.bohol.util.stemmer.Stemmer;
import ph.bohol.util.stemmer.StemmerParser;
import android.os.AsyncTask;
import android.os.Bundle;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.database.Cursor;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ListView;
import android.widget.SearchView;


public class MainActivity extends Activity
	implements SearchView.OnQueryTextListener
{
	private static final String ASSET_STEMMER_CEBUANO = "xml/stemmerCebuano.xml";
	
	static final String SEARCH_WORD = "ph.bohol.dictionaryapp.SEARCH_WORD";
	static final String ENTRY_ID = "ph.bohol.dictionaryapp.ENTRY_ID";
		
	// private EditText editText;
	private SearchView searchView;
	
	private ListView listView = null;
	private Cursor cursor = null;
	private String searchWord;
	
	private Stemmer stemmer = null;
		
	private static final int RESULT_SETTINGS = 1;
	private static final int RESULT_SHOW_ENTRY = 2;
			
	@Override
	protected void onCreate(Bundle savedInstanceState)
	{
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);

		intializeStemmer();
		
	    listView = (ListView) findViewById(R.id.listview);	
			    
		// Get searchWord after resume (e.g. after a rotation).
        if (savedInstanceState != null)
        {
        	searchWord = savedInstanceState.getString(SEARCH_WORD);
        }
        else
        {
        	Intent intent = getIntent();
        	searchWord = intent.getStringExtra(MainActivity.SEARCH_WORD);
        }
		if (searchWord == null)
		{
			searchWord = "";
		}
		
	    populateList(searchWord);
	}

    @Override
    public void onSaveInstanceState(Bundle outState) 
    {
         outState.putString(SEARCH_WORD, searchWord);
         super.onSaveInstanceState(outState);
    }
	
	private void populateList(String searchWord)
	{
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

		switch (requestCode) 
		{
			case RESULT_SHOW_ENTRY:
				// User followed a cross-reference to another entry, search for it.
				if (resultCode == Activity.RESULT_OK)
				{
					searchWord = data.getStringExtra(MainActivity.SEARCH_WORD);
					// editText.setText(searchWord);
					searchView.setQuery(searchWord, false);	
					populateList(searchWord);
				}
				break;
			case RESULT_SETTINGS:
				// populateList(searchWord);
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
			populateList(searchWord);
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
			String searchWord = searchWords[0];
			CebuanoNormalizer n = new CebuanoNormalizer();
			searchWord = n.normalize(searchWord);
			
			// List<Derivation> derivations = stemmer.findDerivations(searchWord);
			
			DictionaryDatabase database = DictionaryDatabase.getInstance(context);
			Cursor cursor = database.getHeadsStartingWith(searchWord);
			
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
