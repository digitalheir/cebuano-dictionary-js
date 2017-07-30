import * as React from "react";

import {SearchContainer} from "./Search";
import {SearchResults} from "./SearchResults";

export const App = () => (
    <div id="app-root">
        <SearchContainer />
        <SearchResults />
    </div>
);
