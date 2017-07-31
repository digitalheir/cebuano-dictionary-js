import * as React from "react";

import {connect} from "react-redux";
import {CebuanoState} from "../reducers/index";
import {SearchParams} from "../couch/fetch-search-results";
import {queryChanged} from "../actions/search";
import {SearchState} from "../reducers/search";
import {PureComponent} from "react";
import {debounce} from "lodash";

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
*/
export class SearchPresenter extends PureComponent<SearchPresenterProps, {}> {

    propagateInputChange = debounce((value: string) => {
        console.log(value);
        abortActiveRequest(this.props.activeRequest);
        this.props.onChange({
            query: value
        });
    }, 500, {leading: true, trailing: true});

    render() {
        return <input id="search-input"
                      onChange={(t) => this.propagateInputChange(t.target.value)}
        />;
    }
}

export const SearchContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchPresenter);

export default SearchContainer;
