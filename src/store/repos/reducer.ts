import { Reducer } from "react";
import { IReposState, initialState } from "./state";
import { RepoAction, DescribeReposActionsResult } from "./actions";
import * as constants from "./constants";

export const reposReducer: Reducer<IReposState, RepoAction> =
    (state = initialState, action) => {
        switch (action.type) {
            case `${constants.DESCRIBE_REPOS}_PENDING`:
                return {
                    ...state
                };
            case `${constants.DESCRIBE_REPOS}_FULFILLED`:
                const result = (action as DescribeReposActionsResult).payload
                return {
                    ...state,
                    repoList: result
                };
            case `${constants.DESCRIBE_REPOS}_REJECTED`:
                return {
                    ...state
                };
            default:
                return state;
        }
    }