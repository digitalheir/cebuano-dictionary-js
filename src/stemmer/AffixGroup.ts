import {Affix, compile as compileAffix, toXml as toXmlAffix} from "./Affix";

export interface AffixGroup {
    name: string;
    affixes: Affix[];
}

export function compile(group: AffixGroup, constants: {[s: string]: string}): void {
    group.affixes.forEach(af => compileAffix(af, constants));
}

export function toXml(group: AffixGroup): string {
    const result = ["\n<group name='" + name + "'>\n"];
    group.affixes.forEach(affix => result.push(toXmlAffix(affix)));
    result.push("</group>\n");
    return result.join("");
}
