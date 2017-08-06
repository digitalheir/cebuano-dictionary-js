import {expect} from "chai";
import {
    AffixPattern,
    compilePattern,
    toXmlAffixPattern,
    stripPattern,
    patternApplies
} from "../../src/index";

describe("AffixPattern", () => {
    it("should apply", () => {
        const p: AffixPattern = {pattern: "maka([a-z]+)", root: "$1"};
        compilePattern({}, p);

        expect(patternApplies(p, "makasabot")).to.be.true;
        expect(patternApplies(p, "nakasabot")).to.be.false;
    });

    it("should stripPattern", () => {
        const p: AffixPattern = {pattern: "maka([a-z]+)", root: "$1"};
        compilePattern({}, p);

        expect(stripPattern(p, "makasabot")).to.equal("sabot");
        expect(!!stripPattern(p, "nakasabot")).to.be.false;
    });

    it("should toXmlGroup", () => {
        const p: AffixPattern = {pattern: "maka([a-z]+)", root: "$1"};
        compilePattern({}, p); //noinspection HtmlUnknownAttribute
        expect(toXmlAffixPattern(p)).to.equal("<pattern pattern='maka([a-z]+)' root='$1'/>\n");
    });
});
