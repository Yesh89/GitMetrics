import * as constants from "./constants";
import { Repo } from "./types";
import { Dispatch } from "redux";
export type RepoAction = DescribeReposActions | DescribeReposActionsResult;

interface DescribeReposActions {
    type: constants.DESCRIBE_REPOS,
    payload: Promise<void | Response>;
}

const BASE_URL = 'https://api.github.com';
export interface DescribeReposActionsResult {
    type: constants.DESCRIBE_REPOS,
    payload: Repo[];
}



export const describeRepos = (userName: string): Dispatch<DescribeReposActions> => (dispatch: Dispatch) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const fetchParams: RequestInit = {
        headers,
        method: "GET"
    }
    let statusCode: number;
    return dispatch({
        type: constants.DESCRIBE_REPOS,
        payload: fetch(`${BASE_URL}/orgs/${userName}/repos`, fetchParams)
        .then((response) => {
            statusCode = response.status;
            return response.text();
        })
        .then((text)=>{
            if (statusCode !== 200){
                alert("error pulling repos from github");
            }
            try{
                return JSON.parse(text);
            } catch(e){
                return [];
            }
        })
    });
}
