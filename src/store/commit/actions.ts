import * as constants from "./constants";
import { Commit } from "./types";
import { Dispatch } from "redux";
import commit from "../../modules/commitsView/commit";
export type CommitAction = DescribeCommitsActions | DescribeCommitsActionsResult;

interface DescribeCommitsActions {
    type: constants.DESCRIBE_COMMITS,
    payload: Promise<void | Response>;
}

const BASE_URL = 'https://api.github.com';
export interface DescribeCommitsActionsResult {
    type: constants.DESCRIBE_COMMITS,
    payload: Commit[];
}


export const describeCommits = (userName: string, repoName: string): Dispatch<DescribeCommitsActions> => (dispatch: Dispatch) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const fetchParams: RequestInit = {
        headers,
        method: "GET"
    }
    let statusCode: number;
    return dispatch({
        type: constants.DESCRIBE_COMMITS,
        payload: fetch(`${BASE_URL}/repos/${userName}/${repoName}/commits`, fetchParams)
        .then((response) => {
            statusCode = response.status;
            return response.text();
        })
        .then((text)=>{
            if (statusCode !== 200){
                alert("error pulling commits from github");
            }
            try{
                return JSON.parse(text);
            } catch(e){
                return [];
            }
        })
    });
}
