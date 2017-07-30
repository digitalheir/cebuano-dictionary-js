import * as React from "react";
import {render} from "react-dom";
import { Provider } from "react-redux";
import {applyMiddleware, createStore} from "redux";
import {rootReducer} from "./reducers";
import {App} from "./components/App";
import thunkMiddleware from "redux-thunk";
import {createLogger} from "redux-logger";

const loggerMiddleware = createLogger();

const store = createStore(rootReducer,
    applyMiddleware(
        thunkMiddleware, // lets us dispatch() functions
        loggerMiddleware // neat middleware that logs actions
    ));




const mountPoint = document.getElementById("mount-point");

if (mountPoint)
    render(
        <Provider store={store}>
            <App />
        </Provider>,
        mountPoint
    );
