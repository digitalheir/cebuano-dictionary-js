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
    
    public static final String ENTRY_ENTRY = "entry";
  
    
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
		String sqlTables = "Heads";
		
		qb.setTables(sqlTables);
		Cursor cursor = qb.query(db, sqlSelect, null, null, null, null, null);
		
		cursor.moveToFirst();
		return cursor;
	}    
	
    public Cursor getHeadsStartingWith(String head) 
    {
    	String sqlQuery = "SELECT _id, entryid, head, normalized_head FROM Heads WHERE normalized_head LIKE ? ORDER BY normalized_head";      
    	String [] selectionArguments = { head + "%" };
    	
    	SQLiteDatabase db = this.getWritableDatabase();
    	Cursor cursor = db.rawQuery(sqlQuery, selectionArguments);
    	return cursor;    	
    }
    
    public String getEntry(int entryId) 
    {
    	String sqlQuery = "SELECT * FROM Entries WHERE _id = ?";      
    	String [] selectionArguments = { Integer.toString(entryId) };
    	
    	SQLiteDatabase db = this.getWritableDatabase();
    	Cursor cursor = db.rawQuery(sqlQuery, selectionArguments);
    	cursor.moveToFirst();
    	
    	return cursor.getString(cursor.getColumnIndex(ENTRY_ENTRY));
    }
}
