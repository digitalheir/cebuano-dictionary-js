import {Action, Reducer} from "redux";
import {isRequestError, isRequestStarted, isRequestSuccess, isResetSearch} from "../actions/search";
import {SearchMode, SearchResult} from "../couch/fetch-search-results";


export interface ErrorHaving {
    error?: Error;
}

export interface SearchModeHaving {
    searchMode: SearchMode;
}

export interface ResultsHaving {
    searchResults?: SearchResult;
}

export interface ActiveRequestHaving {
    activeRequest?: XMLHttpRequest;
}

export interface SearchState extends ResultsHaving, ErrorHaving, ActiveRequestHaving, SearchModeHaving {
    searchQuery?: string;
}

const defaultState: SearchState = {
    activeRequest: undefined,
    error: undefined,
    searchMode: SearchMode.CEBUANO_TO_ENGLISH,
    searchQuery: "",
    searchResults: undefined
};


function isForDifferentRequest(request: XMLHttpRequest, activeRequest?: XMLHttpRequest): boolean {
    return !activeRequest || request.responseURL !== activeRequest.responseURL;
}

export const searchReducer: Reducer<SearchState> = (state = defaultState, action: Action) => {
    console.log(state.searchMode);
    if (isRequestStarted(action)) {
        return {
            searchMode: state.searchMode,
            searchQuery: action.searchParams.query,
            activeRequest: action.request,
            error: undefined
        };
    }
    else if (isRequestSuccess(action)) {
        if (isForDifferentRequest(action.request, state.activeRequest)) {
            console.error(`Expected a response for ${state.activeRequest ? state.activeRequest.responseURL : "|nil|"}, not ${action.request.responseURL}`);
            console.error(action.request);
            return state;
        } else
            return {
                searchQuery: state.searchQuery,
                searchMode: state.searchMode,
                activeRequest: undefined,
                searchResults: action.result,
                error: undefined
            };
    }
    else if (isResetSearch(action)) {
        return {
            searchMode: action.searchParams.searchMode,
            searchQuery: action.searchParams.query,
            activeRequest: undefined,
            error: undefined,
            searchResults: undefined
        };
    } else if (isRequestError(action)) {
        if (isForDifferentRequest(action.request, state.activeRequest)) {
            console.error("Expected a response for " + (state.activeRequest ? state.activeRequest.responseURL : "|nil|") + ", not " + action.request.responseURL);
            return state;
        }

        return Object.assign({}, state, {
            activeRequest: undefined,
            results: [],
            error: action.error
        });
    }
    else return state;
};
