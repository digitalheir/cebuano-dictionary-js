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

    public static final int HEAD_ID = 0;
    public static final int HEAD_HEAD = 1;
    public static final int HEAD_NORMALIZED_HEAD = 2;
    public static final int HEAD_ENTRY_ID = 4;
    
    public DictionaryDatabase(Context context) 
    {
        super(context, DATABASE_NAME, null, DATABASE_VERSION);  
    }

    public boolean isRoot(String root) 
    {
    	String sqlQuery = "SELECT * FROM Roots WHERE root = ?";      
    	String [] selectionArguments = { root };
    	
    	SQLiteDatabase db = this.getWritableDatabase();
    	Cursor c = db.rawQuery(sqlQuery, selectionArguments);
    	return c.getCount() > 0;    	
    }
    
	public Cursor getRoots() 
	{
		SQLiteDatabase db = getReadableDatabase();
		SQLiteQueryBuilder qb = new SQLiteQueryBuilder();
		
		String [] sqlSelect = {"0 _id", "root"};
		String sqlTables = "Roots";
		
		qb.setTables(sqlTables);
		Cursor c = qb.query(db, sqlSelect, null, null, null, null, null);
		
		c.moveToFirst();
		return c;
	}    
	
	public Cursor getHeads() 
	{
		SQLiteDatabase db = getReadableDatabase();
		SQLiteQueryBuilder qb = new SQLiteQueryBuilder();
		
		String [] sqlSelect = {"0 _id", "head", "normalized_head"};
		String sqlTables = "Heads";
		
		qb.setTables(sqlTables);
		Cursor c = qb.query(db, sqlSelect, null, null, null, null, null);
		
		c.moveToFirst();
		return c;
	}    
	
    public Cursor getHeadsStartingWith(String head) 
    {
    	String sqlQuery = "SELECT _id, head, normalized_head FROM Heads WHERE normalized_head LIKE ? ORDER BY normalized_head";      
    	String [] selectionArguments = { head + "%" };
    	
    	SQLiteDatabase db = this.getWritableDatabase();
    	Cursor cursor = db.rawQuery(sqlQuery, selectionArguments);
    	return cursor;    	
    }
}
