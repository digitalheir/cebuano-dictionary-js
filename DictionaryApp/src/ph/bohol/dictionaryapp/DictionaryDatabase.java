package ph.bohol.dictionaryapp;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import ph.bohol.util.normalizer.CebuanoNormalizer;
import ph.bohol.util.stemmer.Derivation;
import ph.bohol.util.stemmer.RootWordProvider;

import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteQueryBuilder;
import android.text.Html;
import android.text.Spanned;
import android.util.Log;

import com.readystatesoftware.sqliteasset.SQLiteAssetHelper;

public class DictionaryDatabase extends SQLiteAssetHelper 
	implements RootWordProvider
{
    private static final String DATABASE_NAME = "dictionary_database";
    private static final int DATABASE_VERSION = 1;

    public static final String HEAD_ID = "_id";
    public static final String HEAD_HEAD = "head";
    public static final String HEAD_NORMALIZED_HEAD = "normalized_head";
    public static final String HEAD_ENTRY_ID = "entryid";
    
    public static final String ENTRY_ID = "_id";
    public static final String ENTRY_ENTRY = "entry";
	public static final String ENTRY_HEAD = "head";
	
	private static final String TAG = "DictionaryDatabase";
	
	private static final int CACHE_SIZE = 100;

	private static DictionaryDatabase instance = null;
	private static Map<Integer, Spanned> entryCache = Collections.synchronizedMap(new EntryCache(CACHE_SIZE));
	
	private Context context = null;
	
	/**
	 * Create a new DictionaryDatabase object. Prevent resource leaks by using this only as a singleton, using the 
	 * getInstance() method.
	 * @param context the application context.
	 */
	private DictionaryDatabase(Context context) 
    {
        super(context, DATABASE_NAME, null, DATABASE_VERSION);
        this.context = context;
    }

	/** 
	 * Get the instance of the DictionaryDatabase singleton. Create it if it is not yet available.
	 * @param context a context. The application context will be obtained from this context.
	 * @return the instance of the DictionaryDatabase singleton.
	 */
    public static DictionaryDatabase getInstance(Context context) 
    {
        // Use the application context, which will ensure that you do not accidentally leak an Activity's context.
        // See this article for more information: http://bit.ly/6LRzfx
        if (instance == null) 
        {
        	Log.d(TAG, "Creating new DictionaryDatabase object");
        	instance = new DictionaryDatabase(context.getApplicationContext());
        }
        return instance;
    }
        
    @Override
    public boolean isRootWord(String root) 
    {
    	String sqlQuery = "SELECT 1 FROM WCED_head WHERE normalized_head = ? LIMIT 1";      
    	String [] selectionArguments = { root };    	
    	SQLiteDatabase db = this.getWritableDatabase();
    	Cursor cursor = db.rawQuery(sqlQuery, selectionArguments);;
    	try
    	{
    		return cursor.getCount() > 0;
    	}
    	finally
    	{
    		cursor.close();
    	}
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
		CebuanoNormalizer n = new CebuanoNormalizer();
		String normalizedHead = n.normalize(head);
    	
    	String sqlQuery = "SELECT _id, entryid, head, normalized_head FROM WCED_head WHERE normalized_head LIKE ? ORDER BY normalized_head";      
    	String [] selectionArguments = { normalizedHead + "%" };
    	
    	SQLiteDatabase db = this.getWritableDatabase();
    	Cursor cursor = db.rawQuery(sqlQuery, selectionArguments);
    	return cursor;    	
    }
    
    public Cursor getHeadsAndTranslationsStartingWith(String head) 
    {
		CebuanoNormalizer n = new CebuanoNormalizer();
		String normalizedHead = n.normalize(head);
		
    	String sqlQueryHeads = "SELECT _id, entryid, head, normalized_head FROM WCED_head WHERE normalized_head LIKE ?";
    	String sqlQueryTrans = "SELECT _id, entryid, translation as head, translation as normalized_head FROM WCED_translation WHERE translation LIKE ?";
            	
    	String sqlQuery = sqlQueryHeads + " UNION " + sqlQueryTrans + " ORDER BY normalized_head COLLATE NOCASE";      
    	String [] selectionArguments = { normalizedHead + "%", head + "%" };
    	
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
    
    private String getEntryHtml(int entryId)
    {
    	Cursor cursor = getEntry(entryId);    	
    	String entryXml = cursor.getString(cursor.getColumnIndex(DictionaryDatabase.ENTRY_ENTRY));
    	cursor.close();    	    	
    	String entryHtml = EntryTransformer.getInstance(context).transform(entryXml, EntryTransformer.STYLE_COMPACT);
    	return entryHtml;
    }
    
    public Spanned getEntrySpanned(int entryId)
    {
    	Spanned entrySpanned =  entryCache.get(entryId);    	
    	if (entrySpanned == null)
    	{
    		Log.d(TAG, "Getting entry rendered in Spanned for entryId: " + Integer.toString(entryId));
    		
    		String entryHtml = getEntryHtml(entryId);    		
    		entrySpanned = Html.fromHtml(entryHtml);
    		entryCache.put(entryId, entrySpanned);
    	}
    	return entrySpanned;
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
