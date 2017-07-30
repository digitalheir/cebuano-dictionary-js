import {CebuanoState} from "../reducers/index";
import {Action} from "redux";
import {Dispatch} from "react-redux";
import {isSearchResult, makeUrl, SearchParams, SearchResult} from "../couch/fetch-search-results";

// export type SearchAction =
//     ActionSearchAppend |
//     ActionRequestStarted |
//     ActionResetSearch |
//     ActionRequestSearchResults |
//     ActionSearchError |
//     ActionToggleCorpus |
//     ActionSetCorpus |
//     ActionEmptyQuery;


export const REQUEST_SUCCESS = "REQUEST_SUCCESS";

export interface ActionResetSearch extends Action {
    type: "RESET_SEARCH";
    searchParams: SearchParams;
}

export interface ActionRequestStarted extends Action {
    type: "REQUEST_STARTED";
    request: XMLHttpRequest;
    searchParams: SearchParams;
}

export interface ActionRequestSuccess extends Action {
    type: "REQUEST_SUCCESS";
    result: SearchResult;
    request: XMLHttpRequest;
}

export interface ActionRequestError extends Action {
    type: "REQUEST_ERROR";
    error: Error;
    request: XMLHttpRequest;
}

export function isRequestStarted(x: any): x is ActionRequestStarted {
    return x.type === "REQUEST_STARTED";
}

export function isRequestSuccess(x: any): x is ActionRequestSuccess {
    return x.type === REQUEST_SUCCESS;
}

export function isRequestError(x: any): x is ActionRequestError {
    return x.type === "REQUEST_ERROR";
}

export function isResetSearch(x: any): x is ActionResetSearch {
    return x.type === "RESET_SEARCH";
}

export function requestSuccess(result: SearchResult,
                               request: XMLHttpRequest): ActionRequestSuccess {
    return {
        type: REQUEST_SUCCESS,
        result,
        request
    };
}

export function requestError(error: Error, request: XMLHttpRequest): ActionRequestError {
    return {
        type: "REQUEST_ERROR",
        error, request
    };
}

const fetchQuery = function (dispatch: Dispatch<CebuanoState>,
                             searchParams: SearchParams,
                             url: string) {
    const httpRequest = new XMLHttpRequest();
    if (!httpRequest) {
        alert("Please update your browser to something that supports XMLHttpRequest.");
        // return false;
        // TODO dispatch error...
    }

    dispatch(startFetchQuery(searchParams, httpRequest));

    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                const json: any = JSON.parse(httpRequest.responseText);
                if (isSearchResult(json)) {
                    dispatch(requestSuccess(json, httpRequest));
                } else {
                    dispatch(requestError(new Error("Could not understand response."), httpRequest));
                }
            } else {
                if (httpRequest.status === 0) {
                    console.log("Abort successful");
                } else {
                    console.error("Request status " + httpRequest.status);
                    dispatch(requestError(new Error("Could not make search request"), httpRequest));
                }
            }
        }
    };
    httpRequest.open("GET", url);
    try {
        httpRequest.send();
    } catch (e) {
        console.error(e);
        dispatch(requestError(e, httpRequest));
    }
    return httpRequest;
};


function startFetchQuery(searchParams: SearchParams, request: XMLHttpRequest): ActionRequestStarted {
    return {
        type: "REQUEST_STARTED",
        request,
        searchParams
    };
}


function resetSearch(searchParams: SearchParams): ActionResetSearch {
    return {type: "RESET_SEARCH", searchParams};
}

export function fetchResults(searchParams: SearchParams): (dispatch: Dispatch<CebuanoState>) => any {
    return function (dispatch: Dispatch<CebuanoState>) {
        dispatch(resetSearch(searchParams));
        const url = makeUrl(
            searchParams,
            50,
            0
        );
        return fetchQuery(dispatch, searchParams, url);
    };
}


export function queryChanged(params: SearchParams): ((dispatch: Dispatch<CebuanoState>) => any) {
    // TODO change url

    // if (window && window.history && window.history.pushState)
    //    window.history.pushState(query, query, "/search/q=" + query);


    return fetchResults(params);
}
