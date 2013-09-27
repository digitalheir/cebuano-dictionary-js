package ph.bohol.dictionaryapp;

import java.lang.ref.WeakReference;

import android.content.Context;
import android.content.SharedPreferences;
import android.database.Cursor;
import android.os.AsyncTask;
import android.preference.PreferenceManager;
import android.text.Html;
import android.text.Spanned;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.CursorAdapter;
import android.widget.TextView;

public class HeadCursorAdapter extends CursorAdapter
{
	private LayoutInflater layoutInflater;
	private boolean showPreview = false;

	@SuppressWarnings("deprecation")
	public HeadCursorAdapter(Context context, Cursor cursor)
	{
		super(context, cursor);
		layoutInflater = LayoutInflater.from(context);

		SharedPreferences preferences = PreferenceManager.getDefaultSharedPreferences(context);
		showPreview = preferences.getBoolean("show_preview", false);
	}

	@Override
	public void bindView(View view, Context context, Cursor cursor)
	{
		String head = cursor.getString(cursor.getColumnIndexOrThrow(DictionaryDatabase.HEAD_HEAD));

		TextView textview = (TextView) view.findViewById(R.id.head);
		textview.setText(head);

		String entryIdString = cursor.getString(cursor.getColumnIndex(DictionaryDatabase.HEAD_ENTRY_ID));
		int entryId = Integer.parseInt(entryIdString);
		
		if (showPreview)
		{
			// Loading a preview of an entry is a slow operation, so don't do it on the UI thread.
			TextView detailTextView = (TextView) view.findViewById(R.id.details);
			detailTextView.setText("");
			FetchEntryDetailsTask task = new FetchEntryDetailsTask(context, detailTextView);
			task.execute(entryId);
		}
	}

	@Override
	public View newView(Context context, Cursor cursor, ViewGroup parent)
	{
		if (showPreview)
		{
			View view = layoutInflater.inflate(R.layout.heading_row_multiline, parent, false);
			return view;
		}
		else
		{
			View view = layoutInflater.inflate(R.layout.heading_row, parent, false);
			return view;
		}
	}

	// See
	// http://www.vogella.com/articles/AndroidBackgroundProcessing/article.html
	// http://stackoverflow.com/questions/8965771/android-asynctask-update-to-the-listview-in-postexecute
	// http://android-developers.blogspot.nl/2010/07/multithreading-for-performance.html
	private class FetchEntryDetailsTask extends
			AsyncTask<Integer, Void, Spanned>
	{
	    private final Context context;
	    private final WeakReference<TextView> detailTextViewReference;

	    FetchEntryDetailsTask(Context context, TextView detailTextView)
	    {
	    	this.context = context;
	    	this.detailTextViewReference = new WeakReference<TextView>(detailTextView);
	    	
	    	// Are we already working for this TextView? (And the ListView re-used it during scrolling)
	    	// TODO: store weak-reference instead.
    		if (detailTextView.getTag() instanceof FetchEntryDetailsTask)
    		{
    			FetchEntryDetailsTask task = (FetchEntryDetailsTask) detailTextView.getTag();
    			task.cancel(true);
    		}	    		
	    	detailTextView.setTag(this);
	    }
		
		@Override
		protected Spanned doInBackground(Integer... entryId)
		{
			DictionaryDatabase database = DictionaryDatabase.getInstance(context);
			String entryHtml = database.getEntryHtml(entryId[0]);

			Spanned entrySpanned = Html.fromHtml(entryHtml);
			return  entrySpanned;
		}
		
		@Override
		protected void onPostExecute(Spanned result)
		{
	        if (isCancelled()) 
	        {
	        	result = null;
	        }
			
	        if (detailTextViewReference != null) 
	        {
	        	TextView detailTextView = detailTextViewReference.get();
	            if (detailTextView != null) 
	            {	            		
	            	detailTextView.setText(result, TextView.BufferType.SPANNABLE);
	            	detailTextView.setTag(null);
	            }
	        }
		}	
	}
}