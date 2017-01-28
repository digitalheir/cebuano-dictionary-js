import {Affix} from "./Affix";
export interface Derivation {
    root: string;
    affixes: Affix[];
}

export function toString(derivation: Derivation): string {
    const result: string[] = [];
    for (const affix of derivation.affixes)
        result.push(affix.form + " + ");
    result.push(derivation.root);
    return result.join("");
}

