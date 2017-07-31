export enum SearchMode {
    CEBUANO_TO_ENGLISH, ENGLISH_TO_CEBUANO
}

export interface SearchParams {
    query: string;
    searchMode: SearchMode;
    // drillDown: {
    //     [key: string]: {
    //         queryValue: string,
    //         showName: string
    //         showValue: string
    //     }
    // };
}

export function makeUrl({
                            query,
                            searchMode
                        }: SearchParams,
                        limit: number,
                        skip: number): string {
    // console.log(query);
    const params: string[] = ["include_docs=true"];

    if (Number.isFinite(limit))
        params.push(("limit=" + limit));
    if (Number.isFinite(skip))
        params.push("skip=" + skip);

    switch (searchMode) {
        case SearchMode.ENGLISH_TO_CEBUANO:
            return makeUrlFromEnglish(query, params);
        case SearchMode.CEBUANO_TO_ENGLISH:
        default:
            return makeUrlFromCebuano(query, params);
    }
}

const BASE_URL = "https://publicdomainreview.cloudant.com/cebuano_dictionary/_design/search/_search/";

export function makeUrlFromCebuano(query: string,
                                   params: string[]) {
    const url = `${BASE_URL}fromCebuano?`;

    params.push(
        "q=" + ((query.trim().length === 0 || query === "*:*") ? "*:*" : query)
    );
    return url + params.join("&");
}

export function makeUrlFromEnglish(query: string,
                                   params: string[]) {
    const url = `${BASE_URL}fromEnglish?`;

    params.push(
        "q=" + ((query.trim().length === 0 || query === "*:*") ? "*:*" : query)
    );
    return url + params.join("&");
}

export interface CebuanoDoc {
    _id: string;
    entry: any[]; // TODO...?
}

export interface SearchResultRow {
    id: string;
    order: number[];
    doc: CebuanoDoc; // TODO...?
}


export interface SearchResult {
    total_rows: number;
    bookmark: string;
    rows: SearchResultRow[];
}

export function isSearchResult(json: any): json is SearchResult {
    return typeof json.total_rows === "number"
        && typeof json.bookmark === "string"
        && typeof json.rows === "object"
        && typeof json.rows.length === "number"
        && json.rows.push;
}
