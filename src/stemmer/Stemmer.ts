import {AffixGroup, compileGroup, toXmlGroup as groupToXml} from "./AffixGroup";
import {Derivation} from "./Derivation";
import {Affix, rootCandidates, toXml} from "./Affix";
import {RootWordProvider} from "./RootWordProvider";
export default class Stemmer {
    language: string;
    compiled = false;
    constants: {[x: string]: string} = {};
    groups: AffixGroup[] = [];
    rootWordProvider: RootWordProvider;

    addGroup(group: AffixGroup): void {
        this.groups.push(group);
        this.compiled = false;
    }

    compile() {
        for (const group of this.groups) compileGroup(group, this.constants);
        this.compiled = true;
    }

    addConstant(key: string, value: string) {
        if (!!this.constants[key] && value !== this.constants[key])
            throw new Error(key + " was already set with " + this.constants[key]
                + ", tried to set it with " + value);
        this.constants[key] = value;
    }

    findDerivations(word: string): Derivation[] {
        if (!this.compiled) this.compile();
        return this.innerFindDerivations(word, {}, 0);
    }


    innerFindDerivations(word: string, handledRoots: {[x: string]: boolean}, level: number): Derivation[] {
        let derivations: Derivation[];
        if (this.groups.length <= level) {
            derivations = [];
            if (!handledRoots[word] && this.isRootWord(word)) {
                const affixes: Affix[] = [];
                const derivation = {root: word, affixes};
                derivations.push(derivation);
                handledRoots[word] = true;
            }
            return derivations;
        } else derivations = this.innerFindDerivations(word, handledRoots, level + 1);

        const group: AffixGroup = this.groups[level];
        const affixes: Affix[] = group.affixes;
        for (const affix of affixes) {
            const rootCandidatez: string[] = rootCandidates(word, affix.patterns);
            for (const root of rootCandidatez) {
                if (!handledRoots[root] && this.isRootWord(root)) {
                    const affixes: Affix[] = [];
                    const derivation = {root, affixes};
                    derivation.affixes.push(affix);
                    derivations.push(derivation);
                    handledRoots[root] = true;
                }

                const innerDerivations = this.innerFindDerivations(root, handledRoots, level + 1);

                // Copy the found derivations to the result list with the current affix as additional affix:
                for (const derivation of innerDerivations) {
                    derivation.affixes.push(affix);
                    derivations.push(derivation);
                }
            }
        }
        return derivations;
    }

    isRootWord(word: string): boolean {
        return (!this.rootWordProvider || this.rootWordProvider.isRootWord(word));
    }

    toString(): string {
        const result = ["<stemmer language='" + this.language + "'>"];

        for (const key in this.constants) if (this.constants.hasOwnProperty(key)) {
            const value = this.constants[key];
            result.push("\n<constant name='" + key + "' value='" + value + "'/>");
        }
        for (const group of this.groups)  result.push(groupToXml(group));
        result.push("</stemmer>\n");
        return result.join("");
    }
}
