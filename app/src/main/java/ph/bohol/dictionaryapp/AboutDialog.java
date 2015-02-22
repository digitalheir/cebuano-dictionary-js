package ph.bohol.dictionaryapp;

import android.app.Dialog;
import android.content.Context;
import android.graphics.Color;
import android.os.Bundle;
import android.text.Html;
import android.text.util.Linkify;
import android.widget.TextView;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

/**
 * AboutDialog shows some information about the dictionary app.
 *
 * @author Jeroen Hellingman.
 */
public class AboutDialog extends Dialog {
    private static Context context = null;

    /**
     * Create a new AboutDialog.
     *
     * @param newContext the context to be used.
     */
    public AboutDialog(final Context newContext) {
        super(newContext);
        AboutDialog.context = newContext;
    }

    private static String readRawTextFile(final int id) {
        InputStream inputStream = context.getResources().openRawResource(id);
        InputStreamReader inputStreamReader = new InputStreamReader(inputStream);
        BufferedReader bufferedReader = new BufferedReader(inputStreamReader);

        StringBuilder text = new StringBuilder();
        try {
            String line;
            while ((line = bufferedReader.readLine()) != null) {
                text.append(line);
            }
        } catch (IOException e) {
            return null;
        }
        return text.toString();
    }

    @Override
    public final void onCreate(final Bundle savedInstanceState) {
        setContentView(R.layout.about_dialog);

        // TextView textView = (TextView) findViewById(R.id.legal_text);
        // textView.setText(readRawTextFile(R.raw.legal));

        TextView textView = (TextView) findViewById(R.id.info_text);
        textView.setText(Html.fromHtml(readRawTextFile(R.raw.about)));
        textView.setLinkTextColor(Color.WHITE);
        Linkify.addLinks(textView, Linkify.ALL);
    }
}
