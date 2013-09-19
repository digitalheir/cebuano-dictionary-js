package ph.bohol.dictionaryapp;

import java.io.IOException;

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
		            Intent intent = new Intent(getApplicationContext(), SearchResultsActivity.class);
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

	
	public void playSound(Context context) throws IllegalArgumentException, SecurityException, IllegalStateException,
    	IOException 
    {
		Uri soundUri = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);
		MediaPlayer mMediaPlayer = new MediaPlayer();
		mMediaPlayer.setDataSource(context, soundUri);
		final AudioManager audioManager = (AudioManager) context.getSystemService(Context.AUDIO_SERVICE);
		if (audioManager.getStreamVolume(AudioManager.STREAM_ALARM) != 0) 
		{
		    mMediaPlayer.setAudioStreamType(AudioManager.STREAM_ALARM);
		    mMediaPlayer.setLooping(false);
		    mMediaPlayer.prepare();
		    mMediaPlayer.start();
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
	    Intent intent = new Intent(this, SearchResultsActivity.class);
	    EditText editText = (EditText) findViewById(R.id.edit_search_word);
	    String searchWord = editText.getText().toString();
	    intent.putExtra(SEARCH_WORD, searchWord);
	    startActivity(intent);
	}
}
