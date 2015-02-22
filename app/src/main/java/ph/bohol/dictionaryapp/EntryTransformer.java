package ph.bohol.dictionaryapp;

import android.content.Context;
import android.util.Log;

import java.io.IOException;
import java.io.StringReader;
import java.io.StringWriter;
import java.io.Writer;
import java.util.HashMap;
import java.util.Map;

import javax.xml.transform.Source;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.stream.StreamResult;
import javax.xml.transform.stream.StreamSource;

public final class EntryTransformer {
    public static final String STYLE_COMPACT = "compact";
    public static final String STYLE_STRUCTURAL = "structural";
    public static final String STYLE_TRADITIONAL = "traditional";
    public static final String STYLE_DEBUG = "debug";

    private static final String XSLT_COMPACT = "xslt/compact.xsl";
    private static final String XSLT_STRUCTURAL = "xslt/structural.xsl";
    private static final String XSLT_TRADITIONAL = "xslt/typographical.xsl";
    private static final String XSLT_DEBUG = "xslt/debug.xsl";

    private static final int DEFAULT_FONT_SIZE = 20;
    private int fontSize = DEFAULT_FONT_SIZE;
    private static final String TAG = "EntryTransformer";
    private static EntryTransformer instance = null;
    private final Map<String, String> stylesheets = new HashMap<String, String>();
    private final Map<String, Transformer> transformers = new HashMap<String, Transformer>();
    private boolean expandAbbreviations = false;
    private boolean useMetric = false;

    private Context context;

    // Prevent resource leaks by using this only as a singleton, using the getInstance() method.
    private EntryTransformer(final Context newContext) {
        this.context = newContext;
        this.stylesheets.put(STYLE_COMPACT, XSLT_COMPACT);
        this.stylesheets.put(STYLE_STRUCTURAL, XSLT_STRUCTURAL);
        this.stylesheets.put(STYLE_TRADITIONAL, XSLT_TRADITIONAL);
        this.stylesheets.put(STYLE_DEBUG, XSLT_DEBUG);
    }

    public static EntryTransformer getInstance(final Context context) {
        // Use the application context, which will ensure that you do not accidentally leak an Activity's context.
        // See this article for more information: http://bit.ly/6LRzfx
        if (instance == null) {
            Log.d(TAG, "Creating new EntryTransformer object");
            instance = new EntryTransformer(context.getApplicationContext());
        }
        return instance;
    }

    public String transform(final String entry, final String presentationStyle) {
        try {
            Transformer transformer = getTransformer(presentationStyle);

            StringReader reader = new StringReader(entry);
            Source xmlSource = new StreamSource(reader);

            Writer stringWriter = new StringWriter();
            StreamResult streamResult = new StreamResult(stringWriter);

            transformer.transform(xmlSource, streamResult);

            return stringWriter.toString();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (TransformerException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return "";
    }

    private Transformer getTransformer(final String presentationStyle) throws IOException, TransformerException {
        Transformer transformer = transformers.get(presentationStyle);
        if (transformer == null) {
            String xsltSourceFileName = getXsltFile(presentationStyle);
            Source xsltSource = new StreamSource(context.getAssets().open(xsltSourceFileName));
            TransformerFactory factory = TransformerFactory.newInstance();
            Log.d(TAG, "Loading XSLT transformer from: " + xsltSourceFileName);
            transformer = factory.newTransformer(xsltSource);
            if (transformer == null) {
                throw new TransformerException(String.format("Loading XSLT transformer from '%s' failed",
                        xsltSourceFileName));
            }
            transformers.put(presentationStyle, transformer);
        }

        transformer.setParameter("useMetric", Boolean.toString(useMetric));
        transformer.setParameter("expandAbbreviations", Boolean.toString(expandAbbreviations));
        transformer.setParameter("fontSize", Integer.toString(fontSize));

        return transformer;
    }

    private String getXsltFile(final String presentationStyle) {
        String stylesheet = stylesheets.get(presentationStyle);
        if (stylesheet == null) {
            stylesheet = XSLT_TRADITIONAL;
        }
        return stylesheet;
    }

    public boolean isExpandAbbreviations() {
        return expandAbbreviations;
    }

    public void setExpandAbbreviations(final boolean newExpandAbbreviations) {
        this.expandAbbreviations = newExpandAbbreviations;
    }

    public boolean isUseMetric() {
        return useMetric;
    }

    public void setUseMetric(final boolean newUseMetric) {
        this.useMetric = newUseMetric;
    }

    public int getFontSize() {
        return fontSize;
    }

    public void setFontSize(final int newFontSize) {
        this.fontSize = newFontSize;
    }
}
