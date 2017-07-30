import {searchReducer, SearchState} from "./search";
import {combineReducers} from "redux";

export interface CebuanoState {
    search: SearchState;
}

export interface State {
    // navMenu: NavMenuState;
    search: SearchState;
    // rightHandMenu: RightHandMenuState;
}

export const rootReducer = combineReducers<State>({
    // navMenu,
    // rightHandMenu,
    search: searchReducer
    // routing: routerReducer,
    // form: formReducer,
});

export default rootReducer;
