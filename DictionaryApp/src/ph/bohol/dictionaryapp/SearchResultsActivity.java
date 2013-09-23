package ph.bohol.dictionaryapp;

import java.io.IOException;
import java.io.InputStream;
import java.io.StringReader;
import java.io.StringWriter;
import java.io.Writer;
import java.util.Iterator;
import java.util.LinkedList;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;
import javax.xml.transform.Source;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import javax.xml.transform.stream.StreamSource;

import org.w3c.dom.Document;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;
import org.xml.sax.XMLReader;

import ph.bohol.util.stemmer.Derivation;
import ph.bohol.util.stemmer.Stemmer;
import ph.bohol.util.stemmer.StemmerParser;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.app.Activity;
import android.content.Intent;
import android.content.SharedPreferences;
import android.database.Cursor;
import android.view.Menu;
import android.view.MenuItem;
import android.webkit.WebView;
import android.widget.TextView;
import android.support.v4.app.NavUtils;

public class SearchResultsActivity extends Activity
{
	private DictionaryDatabase database;
	private int entryId;
	
	private int fontSize = 20;
	private boolean expandAbbreviations = false;
	private String xlstFilename = "xslt/typographical.xsl";
	
	private static final int RESULT_SETTINGS = 1;
	
	
	@Override
	protected void onCreate(Bundle savedInstanceState)
	{
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_search_results);
		
		// Show the Up button in the action bar.
		setupActionBar();
		
		Intent intent = getIntent();
		entryId = Integer.parseInt(intent.getStringExtra(MainActivity.ENTRY_ID));
		
		showEntry();    	       
	}
	
	private void showEntry()
	{
		retrievePreferences();
		
		database = new DictionaryDatabase(this);	
		Cursor cursor = database.getEntry(entryId);
		String entry = cursor.getString(cursor.getColumnIndex(DictionaryDatabase.ENTRY_ENTRY));
		String head = cursor.getString(cursor.getColumnIndex(DictionaryDatabase.ENTRY_HEAD));
		setTitle(head);
		
		String htmlEntry = transformEntry(entry);
		
		if (htmlEntry != null)
		{
	        WebView webView = (WebView) this.findViewById(R.id.webViewEntry);
	        if (webView != null)
	        {
	            webView.loadDataWithBaseURL("", htmlEntry, "text/html", "UTF-8", "");
	        }
		}
		else
		{
			showTransform();
		}
	}


	private String transformEntry(String entry)
	{
		try
		{
			entry = "<dictionary>" + entry + "</dictionary>";
					
			Source xsltSource = new StreamSource(getAssets().open(xlstFilename));
			StringReader reader = new StringReader(entry);
			Source xmlSource = new StreamSource(reader);
			TransformerFactory factory = TransformerFactory.newInstance();
			Transformer transformer = factory.newTransformer(xsltSource);
			if (transformer == null)
			{
				// TODO: neat handling of this.
				return "Internal error: Transformation failed";
			}
			
			transformer.setParameter("expandAbbreviations", Boolean.toString(expandAbbreviations));
			transformer.setParameter("fontSize", Integer.toString(fontSize));
						
			Writer stringWriter = new StringWriter();
			StreamResult streamResult = new StreamResult(stringWriter);           
			
			transformer.transform(xmlSource, streamResult);
			
			return stringWriter.toString();
		}
		catch (IOException e)
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		catch (TransformerException e)
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

        return null;
	}


	private void retrievePreferences()
	{
		SharedPreferences preferences = PreferenceManager.getDefaultSharedPreferences(this);			
		expandAbbreviations = preferences.getBoolean("expand_abbreviations", false);
		
		String fontSizeString = preferences.getString("font_size", "20");
		if (fontSizeString != null)
		{
			fontSize = Integer.parseInt(fontSizeString);
			fontSize = fontSize < 10 ? 20 : fontSize;
		}
		
		String presentationStyle = preferences.getString("presentation_style", "traditional");		
		xlstFilename = "xslt/structural.xsl";
		if (presentationStyle.equalsIgnoreCase("traditional"))
		{
			xlstFilename = "xslt/typographical.xsl";
		}
		else if (presentationStyle.equalsIgnoreCase("debug"))
		{
			xlstFilename = "xslt/debug.xsl";
		}
	}

    public static Document loadXMLFromString(String xml)
    {
		try
		{
	        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
	        factory.setIgnoringElementContentWhitespace(false);
	      
	        DocumentBuilder builder = factory.newDocumentBuilder();
	        // builder.setPreserveWhiteSpace();
	        InputSource is = new InputSource(new StringReader(xml));
	        return builder.parse(is);
		}
		catch (ParserConfigurationException e)
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		catch (SAXException e)
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		catch (IOException e)
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
    }
	
	
	private void showTransform()
	{
		try 
        {
            Source xsltSource = new StreamSource(getAssets().open("xslt/structural.xsl"));
            Source xmlSource = new StreamSource(getAssets().open("xml/andu.xml"));
           
            TransformerFactory factory = TransformerFactory.newInstance();
            Transformer transform = factory.newTransformer(xsltSource);
            Writer stringWriter = new StringWriter();
            
            StreamResult streamResult = new StreamResult(stringWriter);           
            transform.transform(xmlSource, streamResult);

            String resultString = stringWriter.toString();
            
            WebView webView = (WebView) this.findViewById(R.id.webViewEntry);
            if (webView != null)
            {
	            webView.loadDataWithBaseURL("", resultString, "text/html", "UTF-8", "");
            }
        } 
        catch (TransformerException e) 
        {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
		catch (IOException e)
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}


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
	    
	    LinkedList<Derivation> derivations = stemmer.findDerivations(searchWord);
	    
	    database = new DictionaryDatabase(this);
	    
	    String result = "";
		Iterator<Derivation> iterator = derivations.iterator();	
		while (iterator.hasNext()) 
		{
			Derivation derivation = iterator.next();
			result += "Potential derivation: " + derivation.toString() + "\n";
			if (database.isRoot(derivation.getRoot()))
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

	
	/**
	 * Set up the {@link android.app.ActionBar}.
	 */
	private void setupActionBar()
	{
		getActionBar().setDisplayHomeAsUpEnabled(true);
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu)
	{
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.search_results, menu);
		return true;
	}

	@Override
	public boolean onOptionsItemSelected(MenuItem item)
	{
		switch (item.getItemId())
		{
		case android.R.id.home:
			// This ID represents the Home or Up button. In the case of this
			// activity, the Up button is shown. Use NavUtils to allow users
			// to navigate up one level in the application structure. For
			// more details, see the Navigation pattern on Android Design:
			//
			// http://developer.android.com/design/patterns/navigation.html#up-vs-back
			//
			NavUtils.navigateUpFromSameTask(this);
			return true;
			
		case R.id.action_next:
			moveToNextEntry();
			break;
			
		case R.id.action_previous:
			moveToPreviousEntry();
			break;
			
		case R.id.action_settings:
			Intent i = new Intent(this, DictionaryPreferenceActivity.class);
			startActivityForResult(i, RESULT_SETTINGS);
			break;
			
		}
		return super.onOptionsItemSelected(item);
	}

	
	private void moveToPreviousEntry()
	{
		entryId = database.getPreviousEntryId(entryId);
		showEntry();		
	}

	private void moveToNextEntry()
	{
		entryId = database.getNextEntryId(entryId);
		showEntry();
	}

	@Override
	protected void onActivityResult(int requestCode, int resultCode, Intent data) 
	{
		super.onActivityResult(requestCode, resultCode, data);

		switch (requestCode) 
		{
			case RESULT_SETTINGS:
				showEntry();
				break;
		}
	}
	
	@Override
	protected void onDestroy() 
	{
		super.onDestroy();
		if (database != null)
		{
			database.close();
		}
	}
	
}
