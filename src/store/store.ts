import { connectRouter, routerMiddleware, RouterState } from "connected-react-router";
import { IReposState } from "./repos/state";
import { ICommitsState } from "./commit/state";
import { combineReducers, createStore, applyMiddleware, Reducer, compose } from "redux";
import { reposReducer } from "./repos/reducer";
import { commitsReducer } from "./commit/reducer";
import { createHashHistory, History } from "history";
import thunk from "redux-thunk";
import promiseMiddleware from "redux-promise-middleware";
export const history = createHashHistory({ hashType: "noslash" });
export interface IApplicationState {
    router: RouterState;
    repos: IReposState;
    commits: ICommitsState;
}

const createRootReducer = (history: History) => combineReducers({
    repos: reposReducer,
    router: connectRouter(history),
    commits: commitsReducer,
});

const middlewares = [thunk, promiseMiddleware(), routerMiddleware(history)]

let composeEnhancers = compose;

export const store = createStore(
    createRootReducer(history),
    {},
    composeEnhancers(applyMiddleware(...middlewares))
)