import {expect} from "chai";
import AffixPattern from "../../src/stemmer/AffixPattern";

describe("AffixPattern", () => {
    it("should apply", () => {
        const p: AffixPattern = new AffixPattern("maka([a-z]+)", "$1");
        p.compile({});

        expect(p.applies("makasabot")).to.be.true;
        expect(p.applies("nakasabot")).to.be.false;
    });

    it("should strip", () => {
        const p: AffixPattern = new AffixPattern("maka([a-z]+)", "$1");
        p.compile({});

        expect(p.strip("makasabot")).to.equal("sabot");
        expect(!!p.strip("nakasabot")).to.be.false;
    });

    it("should toXmlGroup", () => {
        const p: AffixPattern = new AffixPattern("maka([a-z]+)", "$1");
        p.compile({}); //noinspection HtmlUnknownAttribute
        expect(p.toString()).to.equal("<pattern pattern='maka([a-z]+)' root='$1'/>\n");
    });
});
