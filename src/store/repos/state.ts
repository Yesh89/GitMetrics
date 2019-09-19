import { Repo, Order } from "./types";

export interface IReposState {
    loading : boolean;
    repoList: Repo[];
}

export const initialState: IReposState = {
    loading : false,
    repoList: []
}