import * as React from "react";
import {ReactNode, StatelessComponent} from "react";
import {ActiveRequestHaving, ErrorHaving, ResultsHaving} from "../reducers/search";
import {CebuanoDoc, SearchResultRow} from "../couch/fetch-search-results";
import {connect} from "react-redux";
import {CebuanoState} from "../reducers/index";
import {SearchOwnProps} from "./Search";

function convertToHtml(xml: any) {
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

        const children: ReactNode[] = (xml[2] && xml[2].length > 0) ? (xml[2] as any[]).map(a => convertToHtml(a)) : [];
        return React.createElement("span",
            {className: classes.join("")},
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
        return xml.map(xml => convertToHtml(xml));
    } else {
        console.error("COULD NOT HANDLE " + JSON.stringify(xml));
        return doc._id;
    }
}

export const SearchResult: StatelessComponent<{ row: SearchResultRow }> = ({row}) => {
    return <li key={row.id}>
        {row.doc
            ? toHtmlEntry(row.doc)
            : row.id
        }
    </li>;
};
// TODO

export type SearchResultsProps = ResultsHaving & ErrorHaving & ActiveRequestHaving;

const mapDispatchToProps = (dispatch: any, ignored: SearchResultsProps): {} => {
    return {
        // onChange: (params: SearchParams) => {
        //     dispatch(queryChanged(params));
        // }
        // onFiltersToggle: () => {
        //     dispatch(rightHandMenuToggle);
        // }
    };
};


const mapStateToProps = (state: CebuanoState, ignored: SearchOwnProps): SearchResultsProps => {
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
