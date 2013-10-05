package ph.bohol.util.stemmer;

import java.io.IOException;
import java.io.InputStream;

import javax.xml.parsers.ParserConfigurationException;
import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;

import org.xml.sax.Attributes;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.DefaultHandler;

public class StemmerParser extends DefaultHandler 
{
	private Stemmer stemmer = null;
	private Affix temporaryAffix = null;
	
    public Stemmer parse(InputStream stemmerStream) 
    {
        SAXParserFactory factory = SAXParserFactory.newInstance();
        try 
        {
            SAXParser parser = factory.newSAXParser();
            parser.parse(stemmerStream, this);
        } 
        catch (ParserConfigurationException e) 
        {
            System.out.println("ParserConfig error");
        } 
        catch (SAXException e) 
        {
            System.out.println("SAXException : xml not well formed");
        } 
        catch (IOException e) 
        {
            System.out.println("IO error");
        }
        return stemmer;
    }
        
    @Override
    public void startElement(String s, String s1, String elementName, Attributes attributes) throws SAXException 
    {
        if (elementName.equals("stemmer")) 
        {
            stemmer = new Stemmer();
            stemmer.setLanguage(attributes.getValue("language"));
            return;
        }
        
        if (stemmer == null)
        {
        	// TODO: think of better exception to throw.
        	throw new SAXException();
        }
        
        if (elementName.equals("affix")) 
        {
            temporaryAffix = new Affix();
            temporaryAffix.setForm(attributes.getValue("form"));
            temporaryAffix.setLabel(attributes.getValue("label"));
            return;
        }
        
        if (elementName.equals("pattern")) 
        {
        	if (temporaryAffix == null)
        	{
            	// TODO: think of better exception to throw.
            	throw new SAXException();
        	}
        	
            AffixPattern pattern = new AffixPattern();
            pattern.setPattern(attributes.getValue("pattern"));
            pattern.setRoot(attributes.getValue("root"));
            temporaryAffix.addPattern(pattern);
            return;
        }
        
        if (elementName.equals("constant")) 
        {            
        	stemmer.addConstant(attributes.getValue("name"), attributes.getValue("value"));
        }
    }
    
    @Override
    public void endElement(String s, String s1, String elementName) throws SAXException 
    {
        if (elementName.equals("affix")) 
        {
            stemmer.addAffix(temporaryAffix);
            temporaryAffix = null;
        }
        
        if (elementName.equals("stemmer")) 
        {
        	stemmer.compile();
        }        
    }
}
