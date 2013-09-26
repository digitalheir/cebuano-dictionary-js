package ph.bohol.dictionaryapp;

import java.io.IOException;
import java.io.StringReader;
import java.io.StringWriter;
import java.io.Writer;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;

import javax.xml.transform.Source;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.stream.StreamResult;
import javax.xml.transform.stream.StreamSource;

import ph.bohol.util.stemmer.Derivation;

import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteQueryBuilder;

import com.readystatesoftware.sqliteasset.SQLiteAssetHelper;

public class DictionaryDatabase extends SQLiteAssetHelper 
{
	private static DictionaryDatabase instance = null;
	
    private static final String DATABASE_NAME = "dictionary_database";
    private static final int DATABASE_VERSION = 1;

    public static final String HEAD_ID = "_id";
    public static final String HEAD_HEAD = "head";
    public static final String HEAD_NORMALIZED_HEAD = "normalized_head";
    public static final String HEAD_ENTRY_ID = "entryid";
    
    public static final String ENTRY_ID = "_id";
    public static final String ENTRY_ENTRY = "entry";
	public static final String ENTRY_HEAD = "head";
  
	
	private Transformer compactEntryTransformer = null;
	private Context context = null;

	
	// Prevent resource leaks by using this only as a singleton, using the getInstance() method.
	private DictionaryDatabase(Context context) 
    {
        super(context, DATABASE_NAME, null, DATABASE_VERSION);  
        this.context = context;
    }

    public static DictionaryDatabase getInstance(Context context) 
    {
        // Use the application context, which will ensure that you 
        // don't accidentally leak an Activity's context.
        // See this article for more information: http://bit.ly/6LRzfx
        if (instance == null) 
        {
        	instance = new DictionaryDatabase(context.getApplicationContext());
        }
        return instance;
    }
        
    public boolean isRoot(String root) 
    {
    	String sqlQuery = "SELECT * FROM Roots WHERE root = ?";      
    	String [] selectionArguments = { root };
    	
    	SQLiteDatabase db = this.getWritableDatabase();
    	Cursor cursor = db.rawQuery(sqlQuery, selectionArguments);
    	boolean result = cursor.getCount() > 0;
    	cursor.close();
    	return result;
    }
    
	public Cursor getRoots() 
	{
		SQLiteDatabase db = getReadableDatabase();
		SQLiteQueryBuilder qb = new SQLiteQueryBuilder();
		
		String [] sqlSelect = {"0 _id", "root"};
		String sqlTables = "Roots";
		
		qb.setTables(sqlTables);
		Cursor cursor = qb.query(db, sqlSelect, null, null, null, null, null);
		
		cursor.moveToFirst();
		return cursor;
	}    
	
	public Cursor getHeads() 
	{
		SQLiteDatabase db = getReadableDatabase();
		SQLiteQueryBuilder qb = new SQLiteQueryBuilder();
		
		String [] sqlSelect = {"0 _id", "entryid", "head", "normalized_head"};
		String sqlTables = "WCED_head";
		
		qb.setTables(sqlTables);
		Cursor cursor = qb.query(db, sqlSelect, null, null, null, null, null);
		
		cursor.moveToFirst();
		return cursor;
	}    
	
    public Cursor getHeadsStartingWith(String head) 
    {
    	String sqlQuery = "SELECT _id, entryid, head, normalized_head FROM WCED_head WHERE normalized_head LIKE ? ORDER BY normalized_head";      
    	String [] selectionArguments = { head + "%" };
    	
    	SQLiteDatabase db = this.getWritableDatabase();
    	Cursor cursor = db.rawQuery(sqlQuery, selectionArguments);
    	return cursor;    	
    }
    
    public Cursor getHeadsForDerivations(String head, List<Derivation> derivations) 
    {
    	final String snippetFormat = "SELECT _id, entryid, head, normalized_head, '%s' AS derivation FROM wced_head WHERE normalized_head = ?";
    	
    	List<String> subQueries = new LinkedList<String>();
    	List<String> arguments = new ArrayList<String>();
    	
    	// First add the default query:
    	subQueries.add("SELECT _id, entryid, head, normalized_head, NULL AS derivation FROM WCED_head WHERE normalized_head LIKE ?");
    	arguments.add(head + "%");
    	
    	// Then add the potential derivations:
		Iterator<Derivation> iterator = derivations.iterator();	
		while (iterator.hasNext()) 
		{
			Derivation derivation = iterator.next();			
						
			String snippet = String.format(snippetFormat, derivation.toString().replace("'", "''"));
		
			subQueries.add(snippet);
			arguments.add(derivation.getRoot());
		}  	
    	
		String query = unionize(subQueries);
		query += " ORDER BY derivation NOT NULL, head";
		
    	String [] selectionArguments = new String[arguments.size()];
    	arguments.toArray(selectionArguments);
    	    	
    	SQLiteDatabase db = this.getWritableDatabase();
    	Cursor cursor = db.rawQuery(query, selectionArguments);
    	return cursor;    	
    }
    
    private static String unionize(List<String> queries)
    {
    	String result = "";
		Iterator<String> iterator = queries.iterator();	
		while (iterator.hasNext()) 
		{
			if (!result.isEmpty())
			{
				result += " UNION ";
			}
			result += iterator.next();				
		}    
		return result;
    }
    
    
    public Cursor getEntry(int entryId) 
    {
    	String sqlQuery = "SELECT * FROM WCED_entry WHERE _id = ?";      
    	String [] selectionArguments = { Integer.toString(entryId) };
    	
    	SQLiteDatabase db = this.getWritableDatabase();
    	Cursor cursor = db.rawQuery(sqlQuery, selectionArguments);
    	cursor.moveToFirst();
    	
    	return cursor;
    }
    
    public String getEntryHtml(int entryId)
    {
    	Cursor cursor = getEntry(entryId);    	
    	String entryXml = cursor.getString(cursor.getColumnIndex(DictionaryDatabase.ENTRY_ENTRY));
    	cursor.close();
    	    	
    	String entryHtml = transformEntry(entryXml);        	
    	return entryHtml;
    }
        
	private String transformEntry(String entry)
	{
		try
		{
			// TODO: move XSL transforms to separate class.
			if (compactEntryTransformer == null)
			{
				Source xsltSource = new StreamSource(context.getAssets().open("xslt/compact.xsl"));
				TransformerFactory factory = TransformerFactory.newInstance();
				compactEntryTransformer = factory.newTransformer(xsltSource);
				if (compactEntryTransformer == null)
				{
					// TODO: neat handling of this.
					return "Internal error: Transformation failed";
				}
			}
						
			StringReader reader = new StringReader(entry);
			Source xmlSource = new StreamSource(reader);
			
			Writer stringWriter = new StringWriter();
			StreamResult streamResult = new StreamResult(stringWriter);           
			
			compactEntryTransformer.transform(xmlSource, streamResult);
			
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
    
    
    public int getNextEntryId(int entryId) 
    {
    	String sqlQuery = "SELECT _id FROM WCED_entry WHERE _id > ? ORDER BY _id LIMIT 1";      
    	String [] selectionArguments = { Integer.toString(entryId) };
    	
    	SQLiteDatabase db = this.getWritableDatabase();
    	Cursor cursor = db.rawQuery(sqlQuery, selectionArguments);
    	try
    	{
	    	if (cursor.getCount() == 0)
	    	{
	    		return entryId;
	    	}
	    	cursor.moveToFirst();
	    	return cursor.getInt(cursor.getColumnIndex(ENTRY_ID));
    	}
    	finally
    	{
    		cursor.close();
    	}
    }
    
    public int getPreviousEntryId(int entryId)
    {
    	String sqlQuery = "SELECT _id FROM WCED_entry WHERE _id < ? ORDER BY _id DESC LIMIT 1";      
    	String [] selectionArguments = { Integer.toString(entryId) };
    	
    	SQLiteDatabase db = this.getWritableDatabase();
    	Cursor cursor = db.rawQuery(sqlQuery, selectionArguments);
    	try
    	{
        	if (cursor.getCount() == 0)
        	{
        		return entryId;
        	}
        	cursor.moveToFirst();
        	return cursor.getInt(cursor.getColumnIndex(ENTRY_ID));	
    	}
    	finally
    	{
    		cursor.close();
    	}
    }
    
}
