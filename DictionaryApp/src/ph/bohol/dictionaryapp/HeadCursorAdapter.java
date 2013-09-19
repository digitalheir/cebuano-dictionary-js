package ph.bohol.dictionaryapp;

import android.content.Context;
import android.content.SharedPreferences;
import android.content.res.Resources;
import android.database.Cursor;
import android.preference.PreferenceManager;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.CursorAdapter;
import android.widget.ImageView;
import android.widget.TextView;


public class HeadCursorAdapter extends CursorAdapter 
{
    private LayoutInflater mLayoutInflater;
    private Context mContext;
    
    public HeadCursorAdapter(Context context, Cursor c) 
    {
        super(context, c);
        mContext = context;
        mLayoutInflater = LayoutInflater.from(context); 
    }

    @Override
    public void bindView(View view, Context context, Cursor cursor) 
    {
        String head = cursor.getString(DictionaryDatabase.HEAD_HEAD);
        TextView textview = (TextView) view.findViewById(R.id.head);
        textview.setText(head);
    }
    
    @Override
    public View newView(Context context, Cursor cursor, ViewGroup parent) 
    {
        View view = mLayoutInflater.inflate(R.layout.heading_row, parent, false);
        return view;
    }
    
}