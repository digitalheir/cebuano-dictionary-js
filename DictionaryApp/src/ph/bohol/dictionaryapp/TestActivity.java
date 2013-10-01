package ph.bohol.dictionaryapp;

import java.io.IOException;
import java.io.InputStream;
import java.util.Iterator;
import java.util.List;

import ph.bohol.util.stemmer.Derivation;
import ph.bohol.util.stemmer.Stemmer;
import ph.bohol.util.stemmer.StemmerParser;

import android.media.AudioManager;
import android.media.MediaPlayer;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.Bundle;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.Menu;
import android.view.View;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.EditText;
import android.widget.TextView;

public class TestActivity extends Activity
{
	static final String SEARCH_WORD = "ph.bohol.dictionaryapp.SEARCH_WORD";
	
	@Override
	protected void onCreate(Bundle savedInstanceState)
	{
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_test);

		WebView webView = (WebView) this.findViewById(R.id.webViewResults);
		
		webView.setWebViewClient(new WebViewClient() 
		{
		    @Override
		    public boolean shouldOverrideUrlLoading(WebView view, String url) 
		    {
		        if (url.startsWith("dict:")) 
		        {
		            String searchWord = url.substring(5);
		            Intent intent = new Intent(getApplicationContext(), ShowEntryActivity.class);
		    	    intent.putExtra(SEARCH_WORD, searchWord);
		    	    startActivity(intent);
		            return true;
		        }
		        
		        Intent intent = new Intent(Intent.ACTION_VIEW);
		        intent.setData(Uri.parse(url));
		        startActivity(intent);
		        return true;		       
		    }
		});
		
		EditText editText = (EditText) findViewById(R.id.edit_search_word2);
		
		
		
		editText.addTextChangedListener(new TextWatcher()
		{
	        public void afterTextChanged(Editable s) 
	        {
	        	// Update result list
	        	try
				{
					playSound(TestActivity.this);
				}
				catch (IllegalArgumentException e)
				{
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				catch (SecurityException e)
				{
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				catch (IllegalStateException e)
				{
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				catch (IOException e)
				{
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
	        	// Re-query for results.
	        	// Use ListView http://thinkandroid.wordpress.com/2010/01/09/simplecursoradapters-and-listviews/	        	
	        }
	        
	        public void beforeTextChanged(CharSequence s, int start, int count, int after){}
	        public void onTextChanged(CharSequence s, int start, int before, int count){}
	    }); 
		
		
		
		
		// webView.getSettings().setJavaScriptEnabled(true);
		// webView.loadDataWithBaseURL(null, html, mime, encoding, null);

		webView.loadUrl("file:///android_asset/html/test.html");

	}
	
	@SuppressWarnings("unused")
	private void showDerivations(String searchWord)
	{
		// Create the text view
	    TextView textView = new TextView(this);
	    textView.setTextSize(40);
	    textView.setText(searchWord);

	    // Set the text view as the activity layout
	    setContentView(textView);
	    
	    InputStream stream = null;
		try
		{
			stream = getAssets().open("xml/stemmerCebuano.xml");
		}
		catch (IOException e)
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	    
	    // Find potential derivations of the word:
		StemmerParser parser = new StemmerParser();
	    Stemmer stemmer = parser.parse(stream);
	    
	    List<Derivation> derivations = stemmer.findDerivations(searchWord);
	    
		DictionaryDatabase database = DictionaryDatabase.getInstance(this);	
	    
	    String result = "";
		Iterator<Derivation> iterator = derivations.iterator();	
		while (iterator.hasNext()) 
		{
			Derivation derivation = iterator.next();
			result += "Potential derivation: " + derivation.toString() + "\n";
			if (database.isRootWord(derivation.getRoot()))
			{
				result += "ROOT!";
			}
		}
	    
	    TextView textViewResults = new TextView(this);
	    textViewResults.setTextSize(16);
	    textViewResults.setText(result);
	    
	    // Set the text view as the activity layout
	    setContentView(textViewResults);
	}
	
	public void playSound(Context context) throws IllegalArgumentException, SecurityException, IllegalStateException,
    	IOException 
    {
		Uri soundUri = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);
		MediaPlayer mediaPlayer = new MediaPlayer();
		mediaPlayer.setDataSource(context, soundUri);
		final AudioManager audioManager = (AudioManager) context.getSystemService(Context.AUDIO_SERVICE);
		if (audioManager.getStreamVolume(AudioManager.STREAM_ALARM) != 0) 
		{
		    mediaPlayer.setAudioStreamType(AudioManager.STREAM_ALARM);
		    mediaPlayer.setLooping(false);
		    mediaPlayer.prepare();
		    mediaPlayer.start();
		}
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
	    Intent intent = new Intent(this, TestActivity.class);
	    // EditText editText = (EditText) findViewById(R.id.edit_search_word);
	    // String searchWord = editText.getText().toString();
	    String searchWord = "babuy";
	    intent.putExtra(SEARCH_WORD, searchWord);
	    startActivity(intent);
	}
}
