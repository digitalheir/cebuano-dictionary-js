import * as React from "react";
import {ReactHTML, ReactNode, StatelessComponent} from "react";
import {ActiveRequestHaving, ErrorHaving, ResultsHaving} from "../reducers/search";
import {CebuanoDoc, SearchResultRow} from "../couch/fetch-search-results";
import {connect} from "react-redux";
import {CebuanoState} from "../reducers/index";

function determineTagName(tagName: string): keyof ReactHTML {
    switch (tagName) {
        case "sup":
        case "super":
            return "sup";
        case "sub":
            return "sub";
        case "sense":
            return "span";
        default:
            return "span";
    }
}

function convertToHtml(xml: any, i: number) {
    if (typeof xml === "string") {
        return xml;
    }

    if (xml[0] === 1) {
        // element
        const tagName = xml[1];
        const classes = [tagName];
        if (xml[3]) {
            for (let a = 0; a < xml[3].length; a++) {
                const attr: any = xml[3][a];
                classes.push(attr[0].toString() + "-" + attr[1].toString());
            }
        }

        // https://yandex.com/support/webmaster/microdata/term-definition-markup.html#term-definition-markup
        // vocab="http://webmaster.yandex.ru/vocabularies/"
        // typeof="term-def.xml"

        // property="term" > The Word
        // property="definition" id="1"> The Definition 1
        // property="definition" id="2"> The Definition 2

        // author — author: name, academic title, and other distinguishments;
        // source — source;
        // source-date — date of publication (in the specified source and/or by the specified author, but not on the website where the glossary is published);


        const children: ReactNode[] = (xml[2] && xml[2].length > 0) ? (xml[2] as any[]).map((a, i) => convertToHtml(a, i)) : [];
        return React.createElement(
            determineTagName(tagName),
            {
                key: i.toString(),
                className: classes.join("")
            },
            ...children
        );
    } else {
        console.error("COULD NOT HANDLE " + JSON.stringify(xml));
        return "COULD NOT HANDLE " + JSON.stringify(xml);
    }
}

function toHtmlEntry(doc: CebuanoDoc) {
    const xml = doc.entry;
    if (xml) {
        return xml.map((xml, i) => convertToHtml(xml, i));
    } else {
        console.error("COULD NOT HANDLE " + JSON.stringify(xml));
        return doc._id;
    }
}

export const SearchResult: StatelessComponent<{ row: SearchResultRow }> = ({row}) => {
    return <li key={row.id+Math.random()}>
        {row.doc
            ? toHtmlEntry(row.doc)
            : row.id
        }
    </li>;
};
// TODO

export type SearchResultsProps = ResultsHaving & ErrorHaving & ActiveRequestHaving;

const mapDispatchToProps = (ignored1: any, ignored2: {}): {} => {
    return {
        // onChange: (params: SearchParams) => {
        //     dispatch(queryChanged(params));
        // }
        // onFiltersToggle: () => {
        //     dispatch(rightHandMenuToggle);
        // }
    };
};


const mapStateToProps = (state: CebuanoState, ignored: {}): SearchResultsProps => {
    return {
        searchResults: state.search.searchResults,
        error: state.search.error,
        activeRequest: state.search.activeRequest,
    };
};

export const SearchResultsPresenter: StatelessComponent<SearchResultsProps> = ({searchResults, error, activeRequest}) => {
    return error
        ? <div className="error">ERROR: {error.message}</div>
        : searchResults
            ?
            <div className="search-results">
                <div className="search-results-count">
                    {searchResults.total_rows} results
                </div>
                <ul>
                    {searchResults.rows.map((result) => <SearchResult key={result.id} row={result}/>)}
                </ul>
            </div>
            : activeRequest
                ? <div className="no-query">Loading…</div>
                : <div className="no-query"/>
        ;
};


export const SearchResults = connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchResultsPresenter);
