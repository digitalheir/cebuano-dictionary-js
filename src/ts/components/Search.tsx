import * as React from "react";

import {connect} from "react-redux";
import {CebuanoState} from "../reducers/index";
import {SearchMode, SearchParams} from "../couch/fetch-search-results";
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

        <div>You can use the <a href="https://docs.cloudant.com/search.html#query-syntax">Lucene Syntax</a> for advanced search.</div>
*/
const cebuanoToEnglish = "Cebuano to English";
const englishToCebuano = "English to Cebuano";


export class SearchPresenter extends PureComponent<SearchPresenterProps, {}> {


    propagateInputChange = debounce((value: string) => {
        console.log(value);
        this.onQueryChange(value, this.props.searchMode);
    }, 500, {leading: true, trailing: true});

    onQueryChange(query: string, searchMode: SearchMode) {
        abortActiveRequest(this.props.activeRequest);
        this.props.onChange({
            query,
            searchMode
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
            <div className="search-mode">
                <div className="mdc-form-field">
                    <div className="mdc-radio" data-demo-no-js="">
                        <input className="mdc-radio__native-control"
                               type="radio"
                               id="cebuanoToEnglish"
                               checked={this.props.searchMode === SearchMode.CEBUANO_TO_ENGLISH}
                               onChange={(t) => this.onQueryChange(this.props.searchQuery, SearchMode.CEBUANO_TO_ENGLISH)}
                               name="cebuanoToEnglish"/>
                        <div className="mdc-radio__background">
                            <div className="mdc-radio__outer-circle"/>
                            <div className="mdc-radio__inner-circle"/>
                        </div>
                    </div>
                    <label id="ex1-radio1-label" htmlFor="cebuanoToEnglish">{cebuanoToEnglish}</label>
                </div>
                <div className="mdc-form-field">
                    <div className="mdc-radio" data-demo-no-js="">
                        <input className="mdc-radio__native-control"
                               type="radio"
                               checked={this.props.searchMode === SearchMode.ENGLISH_TO_CEBUANO}
                               onChange={(t) => this.onQueryChange(this.props.searchQuery, SearchMode.ENGLISH_TO_CEBUANO)}
                               id="englishToCebuano"
                               name="englishToCebuano"/>
                        <div className="mdc-radio__background">
                            <div className="mdc-radio__outer-circle"/>
                            <div className="mdc-radio__inner-circle"/>
                        </div>
                    </div>
                    <label id="ex1-radio2-label" htmlFor="englishToCebuano">{englishToCebuano}</label>
                </div>
            </div>
        </div>
            ;
    }
}

export const SearchContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchPresenter);
