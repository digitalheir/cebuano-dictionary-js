package ph.bohol.dictionaryapp;

import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteQueryBuilder;

import com.readystatesoftware.sqliteasset.SQLiteAssetHelper;

public class DictionaryDatabase extends SQLiteAssetHelper 
{
    private static final String DATABASE_NAME = "dictionary_database";
    private static final int DATABASE_VERSION = 1;

    public static final String HEAD_HEAD = "head";
    public static final String HEAD_NORMALIZED_HEAD = "normalized_head";
    public static final String HEAD_ENTRY_ID = "entryid";
    
    public static final String ENTRY_ID = "_id";
    public static final String ENTRY_ENTRY = "entry";
	public static final String ENTRY_HEAD = "head";
  
    
    public DictionaryDatabase(Context context) 
    {
        super(context, DATABASE_NAME, null, DATABASE_VERSION);  
    }

    public boolean isRoot(String root) 
    {
    	String sqlQuery = "SELECT * FROM Roots WHERE root = ?";      
    	String [] selectionArguments = { root };
    	
    	SQLiteDatabase db = this.getWritableDatabase();
    	Cursor cursor = db.rawQuery(sqlQuery, selectionArguments);
    	return cursor.getCount() > 0;    	
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
    
    public Cursor getEntry(int entryId) 
    {
    	String sqlQuery = "SELECT * FROM WCED_entry WHERE _id = ?";      
    	String [] selectionArguments = { Integer.toString(entryId) };
    	
    	SQLiteDatabase db = this.getWritableDatabase();
    	Cursor cursor = db.rawQuery(sqlQuery, selectionArguments);
    	cursor.moveToFirst();
    	
    	return cursor;
    }
    
    public int getNextEntryId(int entryId) 
    {
    	String sqlQuery = "SELECT _id FROM WCED_entry WHERE _id > ? ORDER BY _id LIMIT 1";      
    	String [] selectionArguments = { Integer.toString(entryId) };
    	
    	SQLiteDatabase db = this.getWritableDatabase();
    	Cursor cursor = db.rawQuery(sqlQuery, selectionArguments);
    	    	
    	if (cursor.getCount() == 0)
    	{
    		return entryId;
    	}
    	
    	cursor.moveToFirst();
    	return cursor.getInt(cursor.getColumnIndex(ENTRY_ID));
    }
    
    public int getPreviousEntryId(int entryId)
    {
    	String sqlQuery = "SELECT _id FROM WCED_entry WHERE _id < ? ORDER BY _id DESC LIMIT 1";      
    	String [] selectionArguments = { Integer.toString(entryId) };
    	
    	SQLiteDatabase db = this.getWritableDatabase();
    	Cursor cursor = db.rawQuery(sqlQuery, selectionArguments);
    	
    	if (cursor.getCount() == 0)
    	{
    		return entryId;
    	}
    	
    	cursor.moveToFirst();
    	return cursor.getInt(cursor.getColumnIndex(ENTRY_ID));
    }
    
}
