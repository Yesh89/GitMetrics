import { HeaderValue } from "../repos/types";

export interface Commit{
    sha: string;
    commit: {
        author: {
            name: string,
            date: Date
        },
        url: string,
        message: string
    }
}


export interface CommitColumnHeader {
    message: HeaderValue,
    author_name: HeaderValue,
    commit_date: HeaderValue,
    id : HeaderValue
}

