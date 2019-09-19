import * as React from "react";
import { connect } from "react-redux";
import { IApplicationState } from "../../store/store";
import { describeRepos } from "../../store/repos/actions";
import "./repos.css";
import { Repo, Order, RepoColumHeader, QueryParams, } from "../../store/repos/types";
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import '../common/customTable.css';
import { RouteProps } from "react-router";
import Icon from '@material-ui/core/Icon';
interface IDispatchComponents {
    describeRepos: typeof describeRepos
}

interface IComponentProps {
    loading: boolean;

    repoList: Repo[];
}

interface IOwnState {
    repoGitLink?: string;
    gitUser?: string;
}

type IRepoProps = IDispatchComponents & IComponentProps & RouteProps;

class Repos extends React.Component<IRepoProps, IOwnState> {
    constructor(props: IRepoProps) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const params = new URLSearchParams(this.props.location.search);
        let gitUser = params.get(QueryParams.user);
        if (!gitUser) {
            gitUser = 'netflix';
        }
        this.setState({ repoGitLink: 'https://github.com', gitUser: gitUser });
        this.props.describeRepos(gitUser);
    }

    render() {
        return (
            <div>
                <h2>Github repo metrics - {this.state.gitUser}</h2>
                {this.renderTable()}
            </div>
        );
    }

    headerMap: RepoColumHeader = {
        name: {
            accessor: 'name', Header: 'Repository name', Cell: ((e: any) => {
                return (
                    <a href={`commits?${QueryParams.user}=${this.state.gitUser}&${QueryParams.repo}=${e.value}`}>
                        {e.value}
                    </a>)
            })
        },
        description: { accessor: 'description', Header: 'Description' },
        language: { accessor: 'language', Header: 'Language' },
        forks: { accessor: 'forks', Header: 'Forks' },
        issues: { accessor: 'open_issues', Header: 'Issues' },
        open_git: {
            accessor: 'name', Header: 'Open in git', Cell: ((e: any) => {
                return (
                    <a href={`${this.state.repoGitLink}\\${this.state.gitUser}\\${e.value}`} target="_blank">
                        Read me
        </a>)
            })
        }
    }


    renderTable() {
        const { repoList } = this.props;


        const columns = [this.headerMap.name, this.headerMap.description, this.headerMap.language, this.headerMap.forks, this.headerMap.issues, this.headerMap.open_git];

        return (
            <ReactTable
                data={repoList}
                columns={columns}
                pageSizeOptions={[5, 10, 20, 25]}
            />
        );
    }





}

const mapToStateProps = (state: IApplicationState) => ({
    loading: state.repos.loading,
    repoList: state.repos.repoList
});

const mapDispatchProps = {
    describeRepos
}


export default connect(mapToStateProps, mapDispatchProps)(Repos);