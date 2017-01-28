import AffixPattern, {compile as c} from "./AffixPattern";

export interface Affix {
    form: string;
    label: string;
    rootType: string;
    patterns: AffixPattern[];
}

export function compile(affixes: Affix, constants: {[s: string]: string}): void {
    c(affixes.patterns, constants);
}

/**
 * Determine whether this affix is applied to the given word.
 *
 * @param word the word to be tested for the presence of this affix.
 * @param affix
 * @return true if the affix is applied to this word, false otherwise.
 */
export function applies(word: string, affix: Affix): boolean {
    return appliesToAny(word, affix.patterns);
}

export function appliesToAny(word: string, patterns: AffixPattern[]): boolean {
    for (const pattern of patterns) if (pattern.applies(word)) return true;
    return false;
}

/**
 * Remove this affix from a given word.
 *
 * @param word the word from which the affix is to be removed.
 * @param patterns
 * @return the word with the affix removed, or null if the affix was not present.
 */
export function strip(word: string, patterns: AffixPattern[]): string {
    for (const pattern of patterns) if (pattern.applies(word)) return pattern.strip(word);
    return undefined;
}

export function rootCandidates(word: string, patterns: AffixPattern[]): string[] {
    const rootCandidates = [];
    for (const pattern of patterns)
        if (pattern.applies(word)) {
            const stripped = pattern.strip(word);
            rootCandidates.push(stripped);
        }
    return rootCandidates;
}

export function toXml(affix: Affix): string {
    const result = ["<affix form='" + affix.form + "' label='" + affix.label + "'"];

    if (!!affix.rootType && affix.rootType !== "") {
        result.push(" rootType='" + affix.rootType + "'");
    }
    result.push(">\n");

    for (const pattern of affix.patterns) result.push(pattern.toString());

    result.push("</affix>\n");
    return result.join('');
}