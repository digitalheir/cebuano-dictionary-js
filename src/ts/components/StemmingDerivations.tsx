import * as React from "react";
import {PureComponent, StatelessComponent} from "react";
import {SearchMode, SearchParams} from "../couch/fetch-search-results";
import {
    Derivation,
    Affix
} from "cebuano-stemmer";


export type StemmingDerivationsProps = SearchParams;

export const AffixPresenter: StatelessComponent<{ affix: Affix }> = ({affix}) => {
    const children = [];

    children.push(<span key="form" className="affix-form">{affix.form}</span>);

    if (affix.rootType) {
        children.push(" ");
        children.push(<span key="roottype" className="affix-roottype">{affix.rootType}</span>);
    }
    if (affix.label) {
        const label = affix.label.trim();
        if (label !== "" && label !== "TODO") {
            children.push(" ");
            children.push(<span key="label" className="affix-label">{label}</span>);
        }
    }

    return <dd className="stem-affix"><span>
        {children}
        </span>
    </dd>;
};

export const Stem: StatelessComponent<{ derivation: Derivation}> = ({derivation}) => {

    const affixes =
        derivation.affixes
            ? derivation.affixes.map((a, i) => <AffixPresenter key={a.label + i} affix={a}/>).reverse()
            : [];
    return <li key={derivation.root} className="stem">
        <dl className="stem-dl">
            <dt className="stem-root">
                <div className="mdc-form-field">
                    <div className="mdc-checkbox">
                        <input
                            onChange={(t) => {
                                // setRoot(derivation.root, t.target.checked);
                                console.log(derivation.root, t.target.checked);
                            }
                            }
                            disabled={true}
                            checked={true}
                            type="checkbox"
                            id={derivation.root}
                            className="mdc-checkbox__native-control"/>
                        <div className="mdc-checkbox__background">
                            <svg className="mdc-checkbox__checkmark" viewBox="0 0 24 24">
                                <path className="mdc-checkbox__checkmark__path"
                                      fill="none"
                                      stroke="white"
                                      d="M1.73,12.91 8.1,19.28 22.79,4.59"/>
                            </svg>
                            <div className="mdc-checkbox__mixedmark"/>
                        </div>
                    </div>
                    <label htmlFor={derivation.root}
                           id={derivation.root + "-label"}>
                        {derivation.root}
                    </label>
                </div>
            </dt>
            {affixes}
        </dl>
    </li>
        ;
};

export const CebuanoStemmingDerivations: StatelessComponent<{ derivations: Derivation[] }> = ({derivations}) => {
    return <ul className="cebuano-stems">
        {derivations.map((d, i) => <Stem key={i} derivation={d}/>)}
    </ul>;
};

// export const StemmingDerivationsPresenter: StatelessComponent<StemmingDerivationsProps> =
// ({query, searchMode}) => {
//     return searchMode === SearchMode.CEBUANO_TO_ENGLISH
//         ? <CebuanoStemmingDerivations normalizedWord={normalize(query)}/>
//         : <div className="english-query"/>
//         ;
// };

export class StemmingDerivationsPresenter extends PureComponent<StemmingDerivationsProps, {}> {
    render() {
        const {searchMode, roots} = this.props;
        return searchMode === SearchMode.CEBUANO_TO_ENGLISH
            ? <CebuanoStemmingDerivations derivations={roots} />
            : <div className="english-query"/>
            ;
    }
}
