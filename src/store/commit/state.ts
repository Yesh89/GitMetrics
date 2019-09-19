import { Commit } from "./types";

export interface ICommitsState {
    loading : boolean;
    commitList: Commit[];
}

export const initialState: ICommitsState = {
    loading : false,
    commitList: []
}