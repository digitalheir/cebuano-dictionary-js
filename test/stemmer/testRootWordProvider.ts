import {RootWordProvider} from "../../src/dictionary/RootWordProvider";

export class TestRootWordProvider implements RootWordProvider {
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
