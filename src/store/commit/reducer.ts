import { Reducer } from "react";
import { ICommitsState, initialState } from "./state";
import { CommitAction, DescribeCommitsActionsResult } from "./actions";
import * as constants from "./constants";

export const commitsReducer: Reducer<ICommitsState, CommitAction> =
    (state = initialState, action) => {
        switch (action.type) {
            case `${constants.DESCRIBE_COMMITS}_PENDING`:
                return {
                    ...state
                };
            case `${constants.DESCRIBE_COMMITS}_FULFILLED`:
                const result = (action as DescribeCommitsActionsResult).payload
                return {
                    ...state,
                    commitList: result
                };
            case `${constants.DESCRIBE_COMMITS}_REJECTED`:
                return {
                    ...state
                };
            default:
                return state;
        }
    }