import {AffixGroup, compileGroup, toXmlGroup as groupToXml} from "./AffixGroup";
import {Derivation} from "./Derivation";
import {Affix, rootCandidates} from "./Affix";
import {RootWordProvider, isRootWord} from "./RootWordProvider";

export interface Stemmer {
    language: string;
    compiled: boolean;
    constants: {[x: string]: string};
    groups: AffixGroup[];
}
export function addGroup(stemmer: Stemmer, group: AffixGroup): void {
    stemmer.groups.push(group);
    stemmer.compiled = false;
}

export function compileStemmer(stemmer: Stemmer) {
    for (const group of stemmer.groups) compileGroup(group, stemmer.constants);
    stemmer.compiled = true;
}

export function addConstant(stemmer: Stemmer, key: string, value: string) {
    if (!!stemmer.constants[key] && value !== stemmer.constants[key])
        throw new Error(key + " was already set with " + stemmer.constants[key]
            + ", tried to set it with " + value);
    stemmer.constants[key] = value;
}

export function findDerivations(rootWordProvider: RootWordProvider, stemmer: Stemmer, word: string): Derivation[] {
    if (!stemmer.compiled) compileStemmer(stemmer);
    return innerFindDerivations(rootWordProvider, stemmer, word, {}, 0);
}


export function innerFindDerivations(rootWordProvider: RootWordProvider, stemmer: Stemmer, word: string, handledRoots: {[x: string]: boolean}, level: number): Derivation[] {
    let derivations: Derivation[];
    if (stemmer.groups.length <= level) {
        derivations = [];
        if (!handledRoots[word] && isRootWord(rootWordProvider, word)) {
            const affixes: Affix[] = [];
            const derivation = {root: word, affixes};
            derivations.push(derivation);
            handledRoots[word] = true;
        }
        return derivations;
    } else derivations = innerFindDerivations(rootWordProvider, stemmer, word, handledRoots, level + 1);

    const group: AffixGroup = stemmer.groups[level];
    const affixes: Affix[] = group.affixes;
    for (const affix of affixes) {
        const rootCandidatez: string[] = rootCandidates(word, affix.patterns);
        for (const root of rootCandidatez) {
            if (!handledRoots[root] && isRootWord(rootWordProvider, root)) {
                const affixes: Affix[] = [];
                const derivation = {root, affixes};
                derivation.affixes.push(affix);
                derivations.push(derivation);
                handledRoots[root] = true;
            }

            const innerDerivations = innerFindDerivations(rootWordProvider, stemmer, root, handledRoots, level + 1);

            // Copy the found derivations to the result list with the current affix as additional affix:
            for (const derivation of innerDerivations) {
                derivation.affixes.push(affix);
                derivations.push(derivation);
            }
        }
    }
    return derivations;
}


export function toString(stemmer: Stemmer): string {
    const result = ["<stemmer language='" + stemmer.language + "'>"];

    for (const key in stemmer.constants) if (stemmer.constants.hasOwnProperty(key)) {
        const value = stemmer.constants[key];
        result.push("\n<constant name='" + key + "' value='" + value + "'/>");
    }
    for (const group of stemmer.groups)  result.push(groupToXml(group));
    result.push("</stemmer>\n");
    return result.join("");
}
