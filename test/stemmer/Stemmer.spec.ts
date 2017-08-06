import {expect} from "chai";
import {createReadStream} from "fs";
import {parseStream} from "../../generate-stemmer/StemmerParser";
import {TestRootWordProvider} from "./testRootWordProvider";
import {Stemmer, findDerivations,Derivation, toStringDervation, DictionaryDatabase, RootWordProvider} from "../../src/index";

describe("Stemmer", () => {
    it("should load", (done) => {
        parseStream(createReadStream("test/stemmerTest.xml"))
            .then((stemmer: Stemmer) => {
                expect(stemmer.compiled).to.be.true;
                let results: Derivation[] = testDerivations(
                    undefined,
                    stemmer,
                    "makasabut"
                );
                expect(results.length).to.equal(3);

                results = testDerivations(undefined, stemmer, "balaya");
                expect(results.length).to.equal(2);

                const rootWordProvider = new TestRootWordProvider();

                results = testDerivations(rootWordProvider, stemmer, "makasabut");
                expect(results.length).to.equal(1);

                results = testDerivations(rootWordProvider, stemmer, "balaya");
                expect(results.length).to.equal(1);

                done();
            })
            .catch(done);

    });

    it("should load large file", (done) => {
        parseStream(createReadStream("test/stemmerLargeTest.xml"))
            .then((stemmer: Stemmer) => {
                expect(stemmer.compiled).to.be.true;

                // TODO ?
                // System.out.print(stemmer.toStringAffix());

                const provider: TestRootWordProvider = new TestRootWordProvider();

                let results: Derivation[];
                results = testDerivations(provider, stemmer, "makasabut");
                results = testDerivations(provider, stemmer, "mangaun");
                results = testDerivations(provider, stemmer, "balaya");
                results = testDerivations(provider, stemmer, "pag-abut");
                results = testDerivations(provider, stemmer, "binisaya");

                console.log("Calls to root-word provider: " + provider.calls);

                done();
            })
            .catch(done);

    });

    it("should work with actual root provider", (done) => {
        parseStream(createReadStream("test/stemmerLargeTest.xml"))
            .then((stemmer: Stemmer) => {
                expect(stemmer.compiled).to.be.true;

                const provider: RootWordProvider = DictionaryDatabase;

                let results: Derivation[];
                results = testDerivations(provider, stemmer, "makasabut");
                results = testDerivations(provider, stemmer, "mangaun");
                results = testDerivations(provider, stemmer, "balaya");
                results = testDerivations(provider, stemmer, "pag-abut");
                results = testDerivations(provider, stemmer, "binisaya");

                // console.log("Calls to root-word provider: " + provider.calls);

                done();
            })
            .catch(done);

    });

    function testDerivations(rootWordProvider: RootWordProvider, stemmer: Stemmer, word: string): Derivation[] {
        const derivations: Derivation[] = findDerivations(rootWordProvider, stemmer, word);
        for (const derivation of derivations)
            console.log("Potential derivation: " + toStringDervation(derivation));
        return derivations;
    }
});
