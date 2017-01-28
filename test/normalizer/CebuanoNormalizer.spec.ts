import {expect} from "chai";
import normalize from "../../src/normalizer/CebuanoNormalizer";

describe("CebuanoNormalizer", () => {
    it("should normalize", () => {
        const makasabut = "makasabut";

        expect(normalize("makasabot")).to.equal(makasabut);
        expect(normalize("MAKASABOT")).to.equal(makasabut);
        expect(normalize("M\u00e1k\u00e2s\u00e0b\u00fct")).to.equal(makasabut);
        expect(normalize("Quinahanglan")).to.equal("kinahanglan");
    });
});