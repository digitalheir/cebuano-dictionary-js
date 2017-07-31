import * as React from "react";

import {StatelessComponent} from "react";
import {SearchMode} from "../couch/fetch-search-results";

const cebuanoToEnglish = "Cebuano to English";
const englishToCebuano = "English to Cebuano";

export const SearchModePresenter: StatelessComponent<{
    searchMode: SearchMode,
    onQueryChange: (query: string, searchMode: SearchMode) => any
}>
    = ({searchMode, onQueryChange}) => {
    return <div className="search-mode">
        <div className="mdc-form-field">
            <div className="mdc-radio" data-demo-no-js="">
                <input className="mdc-radio__native-control"
                       type="radio"
                       id="cebuanoToEnglish"
                       checked={searchMode === SearchMode.CEBUANO_TO_ENGLISH}
                       onChange={(t) => onQueryChange(this.props.searchQuery, SearchMode.CEBUANO_TO_ENGLISH)}
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
                       checked={searchMode === SearchMode.ENGLISH_TO_CEBUANO}
                       onChange={(t) => onQueryChange(this.props.searchQuery, SearchMode.ENGLISH_TO_CEBUANO)}
                       id="englishToCebuano"
                       name="englishToCebuano"/>
                <div className="mdc-radio__background">
                    <div className="mdc-radio__outer-circle"/>
                    <div className="mdc-radio__inner-circle"/>
                </div>
            </div>
            <label id="ex1-radio2-label" htmlFor="englishToCebuano">{englishToCebuano}</label>
        </div>
    </div>;
};
