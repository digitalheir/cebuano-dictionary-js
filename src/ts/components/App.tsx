import * as React from "react";

import {SearchContainer} from "./Search";
import {SearchResults} from "./SearchResults";
import {StemmingDerivationWrapper} from "./StemmingDerivations";

export const App = () => (
    <div id="app-root">
        <SearchContainer/>
        <StemmingDerivationWrapper/>
        <SearchResults/>
    </div>
);
