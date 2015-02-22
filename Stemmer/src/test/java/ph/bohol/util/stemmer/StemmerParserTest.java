package ph.bohol.util.stemmer;

import java.io.FileInputStream;
import java.io.IOException;

import org.junit.Test;

public class StemmerParserTest {
    @Test
    public final void testParse() throws IOException {
        FileInputStream stream = new FileInputStream("test/ph/bohol/util/stemmer/stemmerTest.xml");

        StemmerParser parser = new StemmerParser();
        Stemmer stemmer = parser.parse(stream);
        stream.close();
        System.out.print(stemmer.toString());
    }
}
