import * as React from "react";
import {PureComponent, ReactNode, StatelessComponent} from "react";
import {CebuanoDoc, SearchMode, SearchParams, SearchResultRow} from "../couch/fetch-search-results";
import {connect} from "react-redux";
import {CebuanoState} from "../reducers/index";
import {
    DictionaryDatabase,
    findDerivations,
    normalize,
    cebuanoStemmer,
    Derivation,
    Affix
} from "cebuano-stemmer";

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

export const SelabelarchResult: StatelessComponent<{ row: SearchResultRow }> = ({row}) => {
    return <li key={row.id}>
        {row.doc
            ? toHtmlEntry(row.doc)
            : row.id
        }
    </li>;
};
// TODO

export type StemmingDerivationsProps = SearchParams;

const mapDispatchToProps = (ignored: any, ignored2: StemmingDerivationsProps): {} => {
    return {};
};


const mapStateToProps = (state: CebuanoState, ignored: {}): StemmingDerivationsProps => {
    return {
        query: state.search.searchQuery,
        searchMode: state.search.searchMode
    };
};

export const AffixPresenter: StatelessComponent<{ affix: Affix }> = ({affix}) => {
    const children = [];

    if (affix.label) {
        const label = affix.label.trim();
        if (label !== "" && label !== "TODO") {
            children.push(<span key="label" className="affix-label">{label}</span>);
        }
    }
    if (affix.rootType)
        children.push(<span key="roottype" className="affix-roottype">{affix.rootType}</span>);
    children.push(<span key="form" className="affix-form">{affix.form}</span>);

    return <dd className="stem-affix"><span>
        {children}
        </span>
    </dd>;
};

export const Stem: StatelessComponent<{ derivation: Derivation }> = ({derivation}) => {
    const affixes =
        derivation.affixes
            ? derivation.affixes.map((a, i) => <AffixPresenter key={a.label + i} affix={a}/>)
            : [];

    return <div className="stem">
        <dl>
            <dt className="stem-root">{derivation.root}</dt>
            {affixes}
        </dl>
    </div>;
};

export const CebuanoStemmingDerivations: StatelessComponent<{ normalizedWord: string }> = ({normalizedWord}) => {
    const derivations = findDerivations(
        DictionaryDatabase,
        cebuanoStemmer,
        normalizedWord
    );

    return <ul className="cebuano-stems">
        {derivations.map((d, i) => <Stem key={normalizedWord + i} derivation={d}/>)}
    </ul>;
};

// export const StemmingDerivationsPresenter: StatelessComponent<StemmingDerivationsProps> = ({query, searchMode}) => {
//     return searchMode === SearchMode.CEBUANO_TO_ENGLISH
//         ? <CebuanoStemmingDerivations normalizedWord={normalize(query)}/>
//         : <div className="english-query"/>
//         ;
// };

export class StemmingDerivationsPresenter extends PureComponent<StemmingDerivationsProps, {}> {
    render() {
        const {searchMode, query} = this.props;
        return searchMode === SearchMode.CEBUANO_TO_ENGLISH
            ? <CebuanoStemmingDerivations normalizedWord={normalize(query)}/>
            : <div className="english-query"/>
            ;
    }
}

export const StemmingDerivationWrapper = connect(
    mapStateToProps,
    mapDispatchToProps
)(StemmingDerivationsPresenter);
