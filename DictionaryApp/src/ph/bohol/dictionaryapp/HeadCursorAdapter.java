package ph.bohol.dictionaryapp;

import android.content.Context;
import android.database.Cursor;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.CursorAdapter;
import android.widget.TextView;

public class HeadCursorAdapter extends CursorAdapter 
{
    private LayoutInflater layoutInflater;
    
    @SuppressWarnings("deprecation")
	public HeadCursorAdapter(Context context, Cursor cursor) 
    {
        super(context, cursor);
        layoutInflater = LayoutInflater.from(context); 
    }

    @Override
    public void bindView(View view, Context context, Cursor cursor) 
    {
        String head = cursor.getString(cursor.getColumnIndexOrThrow(DictionaryDatabase.HEAD_HEAD));
        TextView textview = (TextView) view.findViewById(R.id.head);
        textview.setText(head);
    }
    
    @Override
    public View newView(Context context, Cursor cursor, ViewGroup parent) 
    {
        View view = layoutInflater.inflate(R.layout.heading_row, parent, false);
        return view;
    }   
}