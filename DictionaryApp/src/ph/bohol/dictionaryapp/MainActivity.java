package ph.bohol.dictionaryapp;

import ph.bohol.util.normalizer.CebuanoNormalizer;
import android.os.Bundle;
import android.app.Activity;
import android.content.Intent;
import android.database.Cursor;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.AdapterView;
import android.widget.EditText;
import android.widget.ListView;


public class MainActivity extends Activity
{
	static final String SEARCH_WORD = "ph.bohol.dictionaryapp.SEARCH_WORD";
	static final String ENTRY_ID = "ph.bohol.dictionaryapp.ENTRY_ID";
		
	private DictionaryDatabase database = null;
	private ListView listView = null;
	private Cursor cursor = null;
	
	
	private static final int RESULT_SETTINGS = 1;
	
	
	@Override
	protected void onCreate(Bundle savedInstanceState)
	{
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);

		database = new DictionaryDatabase(this);		
	    listView = (ListView) findViewById(R.id.listview);	
		
	    populateList("");
	    
		EditText editText = (EditText) findViewById(R.id.edit_search_word);			
		editText.addTextChangedListener(new TextWatcher()
		{
	        public void afterTextChanged(Editable s) 
	        {
	        	updateMatches(s);
	        }
	        
	        public void beforeTextChanged(CharSequence s, int start, int count, int after){}
	        public void onTextChanged(CharSequence s, int start, int before, int count){}
	    }); 
	}

	public void updateMatches(Editable s)
	{
		String searchWord = s.toString();
		populateList(searchWord);
	}

	private void populateList(String searchWord)
	{
		CebuanoNormalizer n = new CebuanoNormalizer();
		searchWord = n.normalize(searchWord);
		cursor = database.getHeadsStartingWith(searchWord);
	    HeadCursorAdapter h = new HeadCursorAdapter(this, cursor);
	    listView.setAdapter(h);	 	
	    	    
		listView.setOnItemClickListener(new AdapterView.OnItemClickListener() 
		{
		    @Override
		    public void onItemClick(AdapterView<?> parent, final View view, int position, long id) 
		    {
				cursor.moveToPosition(position);
				String entryId = cursor.getString(cursor.getColumnIndex(DictionaryDatabase.HEAD_ENTRY_ID));
				  
				Intent intent = new Intent(MainActivity.this, SearchResultsActivity.class);
				intent.putExtra(ENTRY_ID, entryId);
				startActivity(intent);
		    }
		});
	}
		
	@Override
	public boolean onCreateOptionsMenu(Menu menu)
	{
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.main, menu);
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
			case RESULT_SETTINGS:
				showUserSettings();
				break;
		}
	}
	
	
	private void showUserSettings()
	{
		// TODO Auto-generated method stub
		
	}

	/** Called when the user clicks the Search button */
	public void searchWord(View view) 
	{
	    Intent intent = new Intent(this, TestActivity.class);
	    EditText editText = (EditText) findViewById(R.id.edit_search_word);
	    String searchWord = editText.getText().toString();
	    intent.putExtra(SEARCH_WORD, searchWord);
	    startActivity(intent);
	}
}
