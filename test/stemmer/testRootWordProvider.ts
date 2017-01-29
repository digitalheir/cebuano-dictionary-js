import {RootWordProvider} from "../../src/stemmer/root-word-provider/RootWordProvider";

export default class TestRootWordProvider implements RootWordProvider {
    calls = 0;

    isRootWord(word: string): boolean {
        this.calls++;
        return word === "sabut"
            || word === "balay"
            || word === "kaun"
            || word === "bisaya"
            || word === "abut";
    }

    isRootWordWithType(word: string, type: string): boolean {
        return (word === "sabut" && type === "v") || (word === "balay" && type === "n");
    }
}
