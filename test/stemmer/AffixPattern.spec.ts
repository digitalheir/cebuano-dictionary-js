import {expect} from "chai";
import AffixPattern from "../../src/stemmer/AffixPattern";

describe("AffixPattern", () => {
    it("should apply", () => {
        const p: AffixPattern = new AffixPattern("maka([a-z]+)", "$1");
        p.compileStemmer({});

        expect(p.patternApplies("makasabot")).to.be.true;
        expect(p.patternApplies("nakasabot")).to.be.false;
    });

    it("should stripPattern", () => {
        const p: AffixPattern = new AffixPattern("maka([a-z]+)", "$1");
        p.compileStemmer({});

        expect(p.stripPattern("makasabot")).to.equal("sabot");
        expect(!!p.stripPattern("nakasabot")).to.be.false;
    });

    it("should toXmlGroup", () => {
        const p: AffixPattern = new AffixPattern("maka([a-z]+)", "$1");
        p.compileStemmer({}); //noinspection HtmlUnknownAttribute
        expect(p.toString()).to.equal("<pattern pattern='maka([a-z]+)' root='$1'/>\n");
    });
});
