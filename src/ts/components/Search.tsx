import * as React from "react";

import {connect} from "react-redux";
import {CebuanoState} from "../reducers/index";
import {SearchMode, SearchParams} from "../couch/fetch-search-results";
import {queryChanged} from "../actions/search";
import {SearchState} from "../reducers/search";
import {PureComponent} from "react";
import {debounce} from "lodash";
import {SearchModePresenter} from "./SearchMode";

export interface SearchOwnProps {
    defaultValue?: string;
}

export interface SearchDispatchProps {
    onChange: (params: SearchParams) => any;
    // onFiltersToggle: () => any;
}

export type SearchPresenterProps = SearchDispatchProps
    & SearchState
    & SearchOwnProps
    ;


const mapDispatchToProps = (dispatch: any, ignored: SearchOwnProps): SearchDispatchProps => {
    return {
        onChange: (params: SearchParams) => {
            dispatch(queryChanged(params));
        }
        // onFiltersToggle: () => {
        //     dispatch(rightHandMenuToggle);
        // }
    };
};


const mapStateToProps = (state: CebuanoState, ignored: SearchOwnProps): SearchState & SearchOwnProps => {
    return Object.assign({}, state.search, {
        results: state.search.searchResults
    });
};


export function abortActiveRequest(activeRequest?: XMLHttpRequest) {
    // console.log("ABORTING ");
    if (activeRequest) {
        console.log("ABORTING " + activeRequest.responseURL);
        activeRequest.abort();
    }
}

/*
// todo
        protected Cursor doInBackground(final String... searchWords) {
            CebuanoNormalizer n = new CebuanoNormalizer();
            String normalizedSearchWord = n.normalize(searchWord);

            DictionaryDatabase database = DictionaryDatabase.getInstance(context);
            Cursor headsCursor;

            List<Derivation> derivations = null;
            if (useStemming) {
                derivations = stemmer.findDerivations(normalizedSearchWord);
            }

            headsCursor = database.getHeads(searchWord, reverseLookup, derivations);

            // Move the cursor to the first entry, do force the database do some heavy-lifting
            // on this task's thread before handing it back to the UI thread.
            headsCursor.moveToFirst();
            return headsCursor;
        }

        <div>You can use the <a href="https://docs.cloudant.com/search.html#query-syntax">Lucene Syntax</a> for advanced search.</div>
*/


export class SearchPresenter extends PureComponent<SearchPresenterProps, {}> {


    propagateInputChange = debounce((value: string) => {
        console.log(value);
        this.onQueryChange(value, this.props.searchMode);
    }, 500, {leading: true, trailing: true});

    onQueryChange(query: string, searchMode: SearchMode) {
        abortActiveRequest(this.props.activeRequest);
        this.props.onChange({
            query,
            searchMode,
            searchRoots: this.props.searchRoots
        });
    }

    render() {
        return <div className="search-panel">
            <div className="search-input-wrapper mdc-form-field mdc-form-field--align-end">
                <div className="mdc-textfield">
                    <input type="text"
                           placeholder={
                               this.props.searchMode === SearchMode.CEBUANO_TO_ENGLISH
                                   ? "Type Cebuano"
                                   : "Type English"
                           }
                           className="mdc-textfield__input search-input"
                           onChange={(t) => this.propagateInputChange(t.target.value)}
                    />
                </div>
            </div>
            <SearchModePresenter searchMode={this.props.searchMode} onQueryChange={this.onQueryChange}/>
        </div>
            ;
    }
}

export const SearchContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchPresenter);
