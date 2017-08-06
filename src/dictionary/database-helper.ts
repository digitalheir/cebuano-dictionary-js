import {RootWordProvider} from "./RootWordProvider";
import {roots} from "./roots";

// const HEAD_ID = "_id";
// const HEAD_HEAD = "head";
// const HEAD_NORMALIZED_HEAD = "normalized_head";
// const HEAD_ENTRY_ID = "entryid";
// const HEAD_DERIVATION = "derivation";
// const HEAD_TYPE = "type";
// const ENTRY_ID = "_id";
// const ENTRY_ENTRY = "entry";
// const ENTRY_HEAD = "head";
const MIN_ROOT_LENGTH = 3;
// const DATABASE_NAME = "dictionary_database";
// const DATABASE_VERSION = 1;
// const TAG = "DictionaryDatabase";

// const final int ENTRY_CACHE_SIZE = 100;
// const final Map<Integer, Spanned> entryCache = Collections.synchronizedMap(new EntryCache(ENTRY_CACHE_SIZE));
// const final int ROOT_CACHE_SIZE = 1000;

const rootCache: { [key: string]: boolean } = {};

export const DictionaryDatabase: RootWordProvider = {
    isRootWord: function (root: string): boolean {
        if (root.length < MIN_ROOT_LENGTH) {
            return false;
        }

        // const isRoot = rootCache.get(root);
        // if (isRoot != null) {
        //     return isRoot;
        // }

        // Log.d(TAG, "Query for root: " + root);

        // const sqlQuery = "SELECT 1 FROM WCED_head WHERE normalized_head = ? AND pos != '' LIMIT 1";
        // const selectionArguments = {root};

        return roots.has(root);
    },

    isRootWordWithType: function (root: string, type: string): boolean {
        if (root.length < MIN_ROOT_LENGTH) {
            return false;
        }

        const isRoot: boolean | undefined = rootCache[root + "." + type];
        if (isRoot !== undefined) {
            return isRoot;
        }

        // Log.d(TAG, "Query for root: " + root + " with type: " + type);
        // const sqlQuery = "SELECT 1 FROM WCED_head WHERE normalized_head = ? AND pos LIKE ? LIMIT 1";
        // const selectionArguments = {root, "%" + type + "%"};

        // const regexp = new RegExp("^" + root + ".*" + type);

        for (const value of roots)
            if (value.indexOf(root) === 0 && value.indexOf(type) > (root.length - 1))
                return true;

        return false;
    }
};

// /**
//  * Get the instance of the DictionaryDatabase singleton. Create it if it is not yet available.
//  *
//  * @param context a context. The application context will be obtained from this context.
//  * @return the instance of the DictionaryDatabase singleton.
//  */
// public static DictionaryDatabase getInstance(final Context context) {
//     // Use the application context, which will ensure that you do not accidentally leak an Activity's context.
//     // See this article for more information: http://bit.ly/6LRzfx
//     if (instance == null) {
//         Log.d(TAG, "Creating new DictionaryDatabase object");
//         instance = new DictionaryDatabase(context.getApplicationContext());
//     }
//     return instance;
// }
//
// /**
//  * Combine all SQL sub-queries in the list to a single SQL query with the UNION statement. All fragments
//  * must be valid in the context of a UNION statement.
//  *
//  * @param queries The SQL queries to be combined.
//  * @return A SQL string having all sub-queries combined.
//  */
// private static String unionize(final List<String> queries) {
//     String result = "";
//     for (String query : queries) {
//         if (!result.isEmpty()) {
//             result += " UNION ";
//         }
//         result += query;
//     }
//     return result;
// }
//

// export function getHeads(head: string, reverseLookup: boolean, derivations?: Derivation[]): Promise<string[]> {
//     const normalizedHead = normalize(head);
//
//     const subQueries: string[] = [];
//     const arguments: string[] = [];
//
//     subQueries.add("SELECT _id, entryid, head, normalized_head, NULL AS derivation, 'n' AS type "
//         + "FROM WCED_head WHERE normalized_head LIKE ?");
//     arguments.add(normalizedHead + "%");
//
//     if (reverseLookup) {
//         subQueries.add("SELECT _id, entryid, translation as head, translation as normalized_head, "
//             + "NULL as derivation, 'r' AS type "
//             + "FROM WCED_translation WHERE translation LIKE ?");
//         arguments.add(head + "%");
//     }
//
//     if (!!derivations) {
//         const snippetFormat: string =
//             "SELECT _id, entryid, head, normalized_head, '%s' AS derivation, 'd' AS type FROM wced_head "
//             + "WHERE normalized_head = ?";
//
//         for (const derivation of derivations) {
//             const snippet = String.format(snippetFormat, derivation.toString().replace("'", "''"));
//             subQueries.add(snippet);
//             arguments.add(derivation.getRoot());
//         }
//     }
// }

//     String query = unionize(subQueries);
//     query += " ORDER BY normalized_head COLLATE NOCASE";
//
//     Log.d(TAG, "Query for heads and derived forms: " + head);
//     Log.d(TAG, "Query SQL: " + query);
//
//     String[] selectionArguments = new String[arguments.size()];
//     arguments.toArray(selectionArguments);
//
//     SQLiteDatabase db = this.getWritableDatabase();
//     return db.rawQuery(query, selectionArguments);
// }
//
// public Cursor getEntry(final int entryId) {
//     String sqlQuery = "SELECT * FROM WCED_entry WHERE _id = ?";
//     String[] selectionArguments = {Integer.toString(entryId)};
//     SQLiteDatabase db = this.getWritableDatabase();
//     Cursor cursor = db.rawQuery(sqlQuery, selectionArguments);
//     cursor.moveToFirst();
//     return cursor;
// }
//
// private String getEntryHtml(final int entryId) {
//     Cursor cursor = getEntry(entryId);
//     String entryXml = cursor.getString(cursor.getColumnIndex(DictionaryDatabase.ENTRY_ENTRY));
//     cursor.close();
//     return EntryTransformer.getInstance(context).transform(entryXml, EntryTransformer.STYLE_COMPACT);
// }
//
// /**
//  * Get a Spanned object with the rich-text content of an entry.
//  *
//  * @param entryId The entryId for which the rich-text is wanted.
//  * @return a Spanned object with the content of the entry.
//  */
// public Spanned getEntrySpanned(final int entryId) {
//     Spanned entrySpanned = entryCache.get(entryId);
//     if (entrySpanned == null) {
//         Log.d(TAG, "Getting entry rendered in Spanned for entryId: " + Integer.toString(entryId));
//
//         String entryHtml = getEntryHtml(entryId);
//         entrySpanned = Html.fromHtml(entryHtml);
//         entryCache.put(entryId, entrySpanned);
//     }
//     return entrySpanned;
// }
//
// /**
//  * Find the entryId of the next entry.
//  *
//  * @param entryId The entryId of which the next entry is sought.
//  * @return the next entryId, or the original entryId if this entry is the last.
//  */
// public int getNextEntryId(final int entryId) {
//     String sqlQuery = "SELECT _id FROM WCED_entry WHERE _id > ? ORDER BY _id LIMIT 1";
//     String[] selectionArguments = {Integer.toString(entryId)};
//
//     SQLiteDatabase db = this.getWritableDatabase();
//     Cursor cursor = db.rawQuery(sqlQuery, selectionArguments);
//     try {
//         if (cursor.getCount() == 0) {
//             return entryId;
//         }
//         cursor.moveToFirst();
//         return cursor.getInt(cursor.getColumnIndex(ENTRY_ID));
//     } finally {
//         cursor.close();
//     }
// }
//
// /**
//  * Find the entryId of the previous entry.
//  *
//  * @param entryId The entryId of which the previous entry is sought.
//  * @return the previous entryId, or the original entryId if this entry is the first.
//  */
// public int getPreviousEntryId(final int entryId) {
//     String sqlQuery = "SELECT _id FROM WCED_entry WHERE _id < ? ORDER BY _id DESC LIMIT 1";
//     String[] selectionArguments = {Integer.toString(entryId)};
//
//     SQLiteDatabase db = this.getWritableDatabase();
//     Cursor cursor = db.rawQuery(sqlQuery, selectionArguments);
//     try {
//         if (cursor.getCount() == 0) {
//             return entryId;
//         }
//         cursor.moveToFirst();
//         return cursor.getInt(cursor.getColumnIndex(ENTRY_ID));
//     } finally {
//         cursor.close();
//     }
// }
// }