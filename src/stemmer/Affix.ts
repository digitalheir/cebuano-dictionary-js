import {
    AffixPattern,
    compilePatterns as c,
    patternApplies as patternApplies,
    stripPattern as stripPattern,
    toXmlAffixPattern
} from "./AffixPattern";

export interface Affix {
    form: string;
    label: string;
    rootType?: string;
    patterns: AffixPattern[];
}

export function compileAffix(affixes: Affix, constants: {[s: string]: string}): void {
    c(affixes.patterns, constants);
}

/**
 * Determine whether this affix is applied to the given word.
 *
 * @param word the word to be tested for the presence of this affix.
 * @param affix
 * @return true if the affix is applied to this word, false otherwise.
 */
export function appliesToAffix(word: string, affix: Affix): boolean {
    return appliesToAny(word, affix.patterns);
}

export function appliesToAny(word: string, patterns: AffixPattern[]): boolean {
    for (const pattern of patterns) if (patternApplies(pattern, word)) return true;
    return false;
}

//noinspection JSUnusedGlobalSymbols
/**
 * Remove this affix from a given word.
 *
 * @param word the word from which the affix is to be removed.
 * @param patterns
 * @return the word with the affix removed, or null if the affix was not present.
 */
export function stripPatterns(word: string, patterns: AffixPattern[]): string | undefined {
    for (const pattern of patterns) if (patternApplies(pattern, word))
        return stripPattern(pattern, word);
    return undefined;
}

export function rootCandidates(word: string, patterns: AffixPattern[]): string[] {
    const rootCandidates: string[] = [];
    for (const pattern of patterns)
        if (patternApplies(pattern, word)) {
            const stripped = stripPattern(pattern, word);
            if(!!stripped)
            rootCandidates.push(stripped);
        }
    return rootCandidates;
}

export function toXmlAffix(affix: Affix): string {
    const result = ["<affix form='" + affix.form + "' label='" + affix.label + "'"];

    if (!!affix.rootType && affix.rootType !== "") {
        result.push(" rootType='" + affix.rootType + "'");
    }
    result.push(">\n");

    for (const pattern of affix.patterns) result.push(toXmlAffixPattern(pattern));

    result.push("</affix>\n");
    return result.join("");
}