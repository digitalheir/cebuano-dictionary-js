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
import android.text.Html;
import android.text.Spanned;
import android.util.Log;

import com.readystatesoftware.sqliteasset.SQLiteAssetHelper;

public final class DictionaryDatabase extends SQLiteAssetHelper
implements RootWordProvider
{
    private static final String DATABASE_NAME = "dictionary_database";
    private static final int DATABASE_VERSION = 1;

    public static final String HEAD_ID = "_id";
    public static final String HEAD_HEAD = "head";
    public static final String HEAD_NORMALIZED_HEAD = "normalized_head";
    public static final String HEAD_ENTRY_ID = "entryid";
    public static final String HEAD_DERIVATION = "derivation";
    public static final String HEAD_TYPE = "type";

    public static final String ENTRY_ID = "_id";
    public static final String ENTRY_ENTRY = "entry";
    public static final String ENTRY_HEAD = "head";

    private static final String TAG = "DictionaryDatabase";

    private static final int ENTRY_CACHE_SIZE = 100;
    private static final int ROOT_CACHE_SIZE = 1000;



    private static DictionaryDatabase instance = null;
    private static Map<Integer, Spanned> entryCache = Collections.synchronizedMap(new EntryCache(ENTRY_CACHE_SIZE));
    private static Map<String, Boolean> rootCache = Collections.synchronizedMap(new RootCache(ROOT_CACHE_SIZE));

    private Context context = null;

    /**
     * Create a new DictionaryDatabase object. Prevent resource leaks by using this only as a singleton, using the
     * getInstance() method.
     * @param newContext the application context.
     */
    private DictionaryDatabase(final Context newContext)
    {
        super(newContext, DATABASE_NAME, null, DATABASE_VERSION);
        this.context = newContext;
    }

    /**
     * Get the instance of the DictionaryDatabase singleton. Create it if it is not yet available.
     * @param context a context. The application context will be obtained from this context.
     * @return the instance of the DictionaryDatabase singleton.
     */
    public static DictionaryDatabase getInstance(final Context context)
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
    public boolean isRootWord(final String root)
    {
        Boolean isRoot =  rootCache.get(root);
        if (isRoot != null)
        {
            return isRoot;
        }

        Log.d(TAG, "Query for root: " + root);
        String sqlQuery = "SELECT 1 FROM WCED_head WHERE normalized_head = ? LIMIT 1";
        String [] selectionArguments = { root };
        SQLiteDatabase db = this.getWritableDatabase();
        Cursor cursor = db.rawQuery(sqlQuery, selectionArguments);
        try
        {
            boolean result = cursor.getCount() > 0;
            rootCache.put(root, result);
            return result;
        }
        finally
        {
            cursor.close();
        }
    }

    public Cursor getHeads(final String head, final boolean reverseLookup, final List<Derivation> derivations)
    {
        CebuanoNormalizer n = new CebuanoNormalizer();
        String normalizedHead = n.normalize(head);

        List<String> subQueries = new LinkedList<String>();
        List<String> arguments = new ArrayList<String>();

        subQueries.add("SELECT _id, entryid, head, normalized_head, NULL AS derivation, 'n' AS type "
                + "FROM WCED_head WHERE normalized_head LIKE ?");
        arguments.add(normalizedHead + "%");

        if (reverseLookup)
        {
            subQueries.add("SELECT _id, entryid, translation as head, translation as normalized_head, NULL as derivation, 'r' AS type "
                    + "FROM WCED_translation WHERE translation LIKE ?");
            arguments.add(head + "%");
        }

        if (derivations != null)
        {
            final String snippetFormat =
                    "SELECT _id, entryid, head, normalized_head, '%s' AS derivation, 'd' AS type FROM wced_head WHERE normalized_head = ?";

            Iterator<Derivation> iterator = derivations.iterator();
            while (iterator.hasNext())
            {
                Derivation derivation = iterator.next();

                String snippet = String.format(snippetFormat, derivation.toString().replace("'", "''"));

                subQueries.add(snippet);
                arguments.add(derivation.getRoot());
            }
        }

        String query = unionize(subQueries);
        query += " ORDER BY normalized_head COLLATE NOCASE";

        Log.d(TAG, "Query for heads and derived forms: " + head);
        Log.d(TAG, "Query SQL: " + query);

        String [] selectionArguments = new String[arguments.size()];
        arguments.toArray(selectionArguments);

        SQLiteDatabase db = this.getWritableDatabase();
        Cursor cursor = db.rawQuery(query, selectionArguments);
        return cursor;
    }

    /**
     * Combine all SQL sub-queries in the list to a single SQL query with the UNION statement. All fragments
     * must be valid in the context of a UNION statement.
     * @param queries The SQL queries to be combined.
     * @return A SQL string having all sub-queries combined.
     */
    private static String unionize(final List<String> queries)
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

    public Cursor getEntry(final int entryId)
    {
        String sqlQuery = "SELECT * FROM WCED_entry WHERE _id = ?";
        String [] selectionArguments = { Integer.toString(entryId) };
        SQLiteDatabase db = this.getWritableDatabase();
        Cursor cursor = db.rawQuery(sqlQuery, selectionArguments);
        cursor.moveToFirst();
        return cursor;
    }

    private String getEntryHtml(final int entryId)
    {
        Cursor cursor = getEntry(entryId);
        String entryXml = cursor.getString(cursor.getColumnIndex(DictionaryDatabase.ENTRY_ENTRY));
        cursor.close();
        String entryHtml = EntryTransformer.getInstance(context).transform(entryXml, EntryTransformer.STYLE_COMPACT);
        return entryHtml;
    }

    /**
     * Get a Spanned object with the rich-text content of an entry.
     * @param entryId The entryId for which the rich-text is wanted.
     * @return a Spanned object with the content of the entry.
     */
    public Spanned getEntrySpanned(final int entryId)
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

    /**
     * Find the entryId of the next entry.
     * @param entryId The entryId of which the next entry is sought.
     * @return the next entryId, or the original entryId if this entry is the last.
     */
    public int getNextEntryId(final int entryId)
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

    /**
     * Find the entryId of the previous entry.
     * @param entryId The entryId of which the previous entry is sought.
     * @return the previous entryId, or the original entryId if this entry is the first.
     */
    public int getPreviousEntryId(final int entryId)
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
