package ph.bohol.util.stemmer;

import java.io.FileInputStream;
import java.io.IOException;

import org.junit.Test;

public class StemmerParserTest {
    @Test
    public final void testParse() throws IOException {

        // FIXME: Work around https://code.google.com/p/android/issues/detail?id=64887 using an absolute path.
        FileInputStream stream = new FileInputStream("D:/Users/Jeroen/AndroidstudioProjects/DictionaryApp/stemmer/src/test/resources/ph/bohol/util/stemmer/stemmerTest.xml");

        StemmerParser parser = new StemmerParser();
        Stemmer stemmer = parser.parse(stream);
        stream.close();
        System.out.print(stemmer.toString());
    }
}
