package ph.bohol.dictionaryapp;

import android.os.Bundle;
import android.app.Activity;
import android.content.Intent;
import android.database.Cursor;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.Menu;
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
	
	
	@Override
	protected void onCreate(Bundle savedInstanceState)
	{
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);

		database = new DictionaryDatabase(this);		
	    listView = (ListView) findViewById(R.id.listview);	
		
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
		cursor = database.getHeadsStartingWith(searchWord);
	    HeadCursorAdapter h = new HeadCursorAdapter(this, cursor);
	    listView.setAdapter(h);	 	
	    	    
		listView.setOnItemClickListener(new AdapterView.OnItemClickListener() 
		{
		    @Override
		    public void onItemClick(AdapterView<?> parent, final View view, int position, long id) 
		    {
				cursor.moveToPosition(position);
				String entryId = cursor.getString(cursor.getColumnIndex("_id"));
				  
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
	
	/** Called when the user clicks the Search button */
	public void searchWord(View view) 
	{
	    Intent intent = new Intent(this, SearchResultsActivity.class);
	    EditText editText = (EditText) findViewById(R.id.edit_search_word);
	    String searchWord = editText.getText().toString();
	    intent.putExtra(SEARCH_WORD, searchWord);
	    startActivity(intent);
	}
}
