import * as React from "react";

export interface RepoColumHeader {
    name: HeaderValue,
    description: HeaderValue;
    language: HeaderValue;
    forks: HeaderValue;
    issues: HeaderValue;
    open_git: HeaderValue;
}


export interface HeaderValue {
    Header: string;
    accessor: string;
    Cell?: any;
}

export interface Repo{
    id: string;
    name: string;
    description: string;
    html_url: string;
    open_issues: number;
    forks: number;
    language: string;
}




export type Order = 'asc' | 'desc';

export enum QueryParams {
    user = 'user',
    repo = 'repo'
}