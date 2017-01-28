import {expect} from "chai";
import {createReadStream, createWriteStream} from "fs";
import parseStream from "../../src/stemmer/StemmerParser";
import Stemmer from "../../src/stemmer/Stemmer";
import {Derivation, toString} from "../../src/stemmer/Derivation";
import TestRootWordProvider from "./testRootWordProvider";
import {toXml} from "../../src/stemmer/AffixGroup";

describe("Stemmer", () => {
    it("should load", (done) => {
        parseStream(createReadStream("test/stemmerTest.xml"))
            .then((stemmer: Stemmer) => {
                expect(stemmer.compiled).to.be.true;
                let results: Derivation[] = testDerivations(stemmer, "makasabut");
                expect(results.length).to.equal(3);

                results = testDerivations(stemmer, "balaya");
                expect(results.length).to.equal(2);

                stemmer.rootWordProvider = new TestRootWordProvider();

                results = testDerivations(stemmer, "makasabut");
                expect(results.length).to.equal(1);

                results = testDerivations(stemmer, "balaya");
                expect(results.length).to.equal(1);

                done();
            })
            .catch(done);
        // System.out.print(stemmer.toString());
        //
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
    function testDerivations(stemmer: Stemmer, word: string): Derivation[] {
        const derivations: Derivation[] = stemmer.findDerivations(word);
        for (const derivation of derivations)
            console.log("Potential derivation: " + toString(derivation));
        return derivations;
    }
});
