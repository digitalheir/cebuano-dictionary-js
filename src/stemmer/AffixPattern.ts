const CONSTANT_WITHIN_BRACES = /\{(\w+)}/g;

// TODO make interface
export default class AffixPattern {
    readonly pattern: string;
    readonly root: string;
    compiledPattern: RegExp;

    constructor(newPattern: string, newRoot: string) {
        this.pattern = newPattern;
        this.root = newRoot;
    }

    toString() {
        //noinspection HtmlUnknownAttribute
        return "<pattern pattern='" + this.pattern + "' root='" + this.root + "'/>\n";
    }

    strip(word: string): string {
        if (!this.compiledPattern) throw new Error("Pattern was not compiled");
        if (this.applies(word)) return word.replace(this.compiledPattern, this.root);
        else return undefined;
    }

    applies(word: string): boolean {
        return this.compiledPattern.test(word);
    }

    compile(constants: {[s: string]: string}): void {
        // TODO make more efficient/readable with a helper function

        // Replace constants given as "...{key}..." in pattern.
        let position = 0;
        const compiledRegex = [];

        let match = CONSTANT_WITHIN_BRACES.exec(this.pattern);
        while (!!match) {
            const constantKey = match[1];
            const replaceWith = constants[constantKey];
            if (!replaceWith) throw new Error("Constant map did not contain entry for " + constantKey);

            compiledRegex.push(this.pattern.substring(position, match.index)); // text up to constant
            compiledRegex.push(replaceWith); // replaced constant
            position = match.index + match[0].length;

            match = CONSTANT_WITHIN_BRACES.exec(this.pattern);
        }
        compiledRegex.push(this.pattern.substring(position));

        this.compiledPattern = new RegExp(compiledRegex.join(""), "g");
    }
}

export function compile(affixes: AffixPattern[], constants: {[s: string]: string}): void {
    affixes.forEach(a => a.compile(constants));
}

export function toString(affix: AffixPattern): string {
    return affix.toString();
}