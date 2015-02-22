package ph.bohol.util.stemmer;

import static org.junit.Assert.assertTrue;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.util.Iterator;
import java.util.LinkedList;

import org.junit.Test;

public class StemmerTest {
    @Test
    public final void testLoad() throws FileNotFoundException {
        FileInputStream stream = new FileInputStream("test/ph/bohol/util/stemmer/stemmerTest.xml");
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
        FileInputStream stream = new FileInputStream("test/ph/bohol/util/stemmer/stemmerLargeTest.xml");
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

        Iterator<Derivation> iterator = derivations.iterator();
        while (iterator.hasNext()) {
            System.out.println("Potential derivation: " + iterator.next().toString());
        }
        return derivations;
    }
}
