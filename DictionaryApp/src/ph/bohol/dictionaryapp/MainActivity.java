package ph.bohol.dictionaryapp;

import android.net.Uri;
import android.os.Bundle;
import android.app.Activity;
import android.content.Intent;
import android.view.Menu;
import android.view.View;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.EditText;

public class MainActivity extends Activity
{
	static final String SEARCH_WORD = "ph.bohol.dictionaryapp.SEARCH_WORD";

	@Override
	protected void onCreate(Bundle savedInstanceState)
	{
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);

//		String html = "<html><body>Hello, World!</body></html>";
//		String mime = "text/html";
//		String encoding = "utf-8";

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
		
		// Database usage: http://android-helper4u.blogspot.nl/2013/03/d-databse-and-spinner-tutorial.html
		
		// XSLT usage: http://stackoverflow.com/questions/4153560/android-convert-xml-using-xslt
		
		
		// webView.getSettings().setJavaScriptEnabled(true);
		// webView.loadDataWithBaseURL(null, html, mime, encoding, null);

		webView.loadUrl("file:///android_asset/html/test.html");

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
