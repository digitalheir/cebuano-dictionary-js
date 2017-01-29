import {Affix, compileAffix as compileAffix, toXmlAffix as toXmlAffix} from "./Affix";

export interface AffixGroup {
    name: string;
    affixes: Affix[];
}

export function compileGroup(group: AffixGroup, constants: {[s: string]: string}): void {
    group.affixes.forEach(af => compileAffix(af, constants));
}

export function toXmlGroup(group: AffixGroup): string {
    const result = ["\n<group name='" + group.name + "'>\n"];
    group.affixes.forEach(affix => result.push(toXmlAffix(affix)));
    result.push("</group>\n");
    return result.join("");
}
