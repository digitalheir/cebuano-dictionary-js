package ph.bohol.util.stemmer;

import static org.junit.Assert.assertTrue;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.util.LinkedList;

import org.junit.Test;

public class StemmerTest {
    @Test
    public final void testLoad() throws FileNotFoundException {

        // FIXME: Work around https://code.google.com/p/android/issues/detail?id=64887 using an absolute path.
        FileInputStream stream = new FileInputStream("D:/Users/Jeroen/AndroidstudioProjects/DictionaryApp/stemmer/src/test/resources/ph/bohol/util/stemmer/stemmerTest.xml");

        StemmerParser parser = new StemmerParser();
        Stemmer stemmer = parser.parse(stream);

        System.out.print(stemmer.toString());

        LinkedList<Derivation> results = testDerivations(stemmer, "makasabut");
        assertTrue(results.size() == 3);

        results = testDerivations(stemmer, "balaya");
        assertTrue(results.size() == 2);

        stemmer.setRootProvider(new TestRootWordProvider());

        results = testDerivations(stemmer, "makasabut");
        assertTrue(results.size() == 1);

        results = testDerivations(stemmer, "balaya");
        assertTrue(results.size() == 1);
    }

    @Test
    public final void testLargeLoad() throws FileNotFoundException {

        // FIXME: Work around https://code.google.com/p/android/issues/detail?id=64887 using an absolute path.
        FileInputStream stream = new FileInputStream("D:/Users/Jeroen/AndroidstudioProjects/DictionaryApp/stemmer/src/test/resources/ph/bohol/util/stemmer/stemmerLargeTest.xml");

        StemmerParser parser = new StemmerParser();
        Stemmer stemmer = parser.parse(stream);

        System.out.print(stemmer.toString());

        TestRootWordProvider provider = new TestRootWordProvider();
        stemmer.setRootProvider(provider);

        LinkedList<Derivation> results;
        results = testDerivations(stemmer, "makasabut");
        results = testDerivations(stemmer, "mangaun");
        results = testDerivations(stemmer, "balaya");
        results = testDerivations(stemmer, "pag-abut");
        results = testDerivations(stemmer, "binisaya");
        System.out.print("Calls to root-word provider: " + provider.getCalls());
    }

    private LinkedList<Derivation> testDerivations(final Stemmer stemmer, final String word) {
        LinkedList<Derivation> derivations = stemmer.findDerivations(word);

        for (Derivation derivation : derivations) {
            System.out.println("Potential derivation: " + derivation.toString());
        }
        return derivations;
    }
}
