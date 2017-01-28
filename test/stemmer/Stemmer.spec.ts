import {createReadStream, createWriteStream} from "fs";
import parseStream from "../../src/stemmer/StemmerParser";

describe("Stemmer", () => {
    it("should load", (done) => {
        createReadStream("test/stemmerTest.xml")
            .pipe(parseStream)
            .pipe(createWriteStream("file-copy.xml"))
            .on("close", () => done());

        // StemmerParser parser = new StemmerParser();
        // Stemmer stemmer = parser.parse(stream);
        //
        // System.out.print(stemmer.toString());
        //
        // LinkedList<Derivation> results = testDerivations(stemmer, "makasabut");
        // assertTrue(results.size() == 3);
        //
        // results = testDerivations(stemmer, "balaya");
        // assertTrue(results.size() == 2);
        //
        // stemmer.setRootProvider(new TestRootWordProvider());
        //
        // results = testDerivations(stemmer, "makasabut");
        // assertTrue(results.size() == 1);
        //
        // results = testDerivations(stemmer, "balaya");
        // assertTrue(results.size() == 1);

        // expect(p.applies("nakasabot")).to.be.false;
    });

    // @Test
    // public final void testLargeLoad() throws FileNotFoundException {
    //
    //     // FIXME: Work around https://code.google.com/p/android/issues/detail?id=64887 using an absolute path.
    //     FileInputStream stream = new FileInputStream("stemmerLargeTest.xml");
    //
    //     StemmerParser parser = new StemmerParser();
    //     Stemmer stemmer = parser.parse(stream);
    //
    //     System.out.print(stemmer.toString());
    //
    //     TestRootWordProvider provider = new TestRootWordProvider();
    //     stemmer.setRootProvider(provider);
    //
    //     LinkedList<Derivation> results;
    //     results = testDerivations(stemmer, "makasabut");
    //     results = testDerivations(stemmer, "mangaun");
    //     results = testDerivations(stemmer, "balaya");
    //     results = testDerivations(stemmer, "pag-abut");
    //     results = testDerivations(stemmer, "binisaya");
    //     System.out.print("Calls to root-word provider: " + provider.getCalls());
    // }
    //
    // private LinkedList<Derivation> testDerivations(final Stemmer stemmer, final String word) {
    //     LinkedList<Derivation> derivations = stemmer.findDerivations(word);
    //
    //     for (Derivation derivation : derivations) {
    //         System.out.println("Potential derivation: " + derivation.toString());
    //     }
    //     return derivations;
    // }
});
