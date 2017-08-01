
export interface Head {
    head: string;
    normalized_head: string;
    type: string;
    pos: string;
}

export interface CebuanoDoc {
    _id: string;
    _rev: string;
    head: string;
    page: number;
    sqlid: number;
    heads: Head[];
    translations: string[];
    entry: any[]; // TODO...?
}

export interface DbRow {
    id: string;
    key: string;
    value: any;
    doc: CebuanoDoc;
}

export interface DbDump {
    total_rows: number;
    offset: number;
    rows: DbRow[];
}
