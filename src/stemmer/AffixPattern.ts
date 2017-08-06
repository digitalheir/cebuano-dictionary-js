const CONSTANT_WITHIN_BRACES = /{(\w+)}/g;

export interface AffixPattern {
    pattern: string;
    root?: string;
    compiledPattern?: string;
}

export function toXmlAffixPattern(pattern: AffixPattern) {
    //noinspection HtmlUnknownAttribute
    return "<pattern pattern='" + pattern.pattern + "' root='" + pattern.root + "'/>\n";
}

export function stripPattern(pattern: AffixPattern, word: string): string | undefined {
    const compiledPattern: string | undefined = pattern.compiledPattern;
    if (!compiledPattern)
        throw new Error("Pattern was not compiled");
    else {
        if (patternApplies(pattern, word))
            return word.replace(
                new RegExp(compiledPattern, "g"),
                pattern.root || ""
            );
        else
            return undefined;
        // throw new Error("Affix " + pattern.compiledPattern + " does not apply to " + word + ", so why would you ask to stripPattern? ");
    }
}

export function patternApplies(pattern: AffixPattern, word: string): boolean {
    const compiledPattern = pattern.compiledPattern;
    if (!compiledPattern)
        throw new Error("Pattern was not compiled");
    else
        return new RegExp(compiledPattern, "g").test(word);
}


export function compilePattern(constants: { [s: string]: string }, pattern: AffixPattern): void {
    // Replace constants given as "...{key}..." in pattern.
    let position = 0;
    const compiledRegex = ["^"];

    let match = CONSTANT_WITHIN_BRACES.exec(pattern.pattern);
    while (!!match) {
        const constantKey = match[1];
        const replaceWith = constants[constantKey];
        if (!replaceWith) throw new Error("Constant map did not contain entry for " + constantKey);

        compiledRegex.push(pattern.pattern.substring(position, match.index)); // text up to constant
        compiledRegex.push(replaceWith); // replaced constant
        position = match.index + match[0].length;

        match = CONSTANT_WITHIN_BRACES.exec(pattern.pattern);
    }
    compiledRegex.push(pattern.pattern.substring(position) + "$");

    pattern.compiledPattern = compiledRegex.join("");
}

export function compilePatterns(affixes: AffixPattern[], constants: { [s: string]: string }): void {
    affixes.forEach(compilePattern.bind(undefined, constants));
}
