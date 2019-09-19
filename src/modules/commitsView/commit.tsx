import * as React from "react";
import { connect } from "react-redux";
import { IApplicationState } from "../../store/store";
import { describeCommits } from "../../store/commit/actions";
import { Repo, Order, RepoColumHeader, QueryParams } from "../../store/repos/types";
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import '../common/customTable.css';
import { RouteProps, RouterProps } from "react-router";
import { Commit, CommitColumnHeader } from "../../store/commit/types";
interface IDispatchComponents {
    describeCommits: typeof describeCommits
}

interface IComponentProps {
    loading: boolean;
    commitsList: Commit[]
}

interface IOwnState {
    repoGitLink?: string;
    gitUser?: string;
    repoName?: string;
}

type ICommitProps = IDispatchComponents & IComponentProps & RouteProps & RouterProps;

class Commits extends React.Component<ICommitProps, IOwnState> {
    constructor(props: ICommitProps) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const params = new URLSearchParams(this.props.location.search);
        let gitUser = params.get(QueryParams.user);
        let repoName = params.get(QueryParams.repo);
        if (!gitUser || !repoName) {
            this.props.history.push('/repos')
        }
        this.setState({ repoGitLink: 'https://github.com', gitUser: gitUser, repoName: repoName });
        this.props.describeCommits(gitUser, repoName);
    }

    render() {
        return (
            <div>
                <h2>Commits - {this.state.gitUser}/{this.state.repoName}</h2>
                {this.renderTable()}
            </div>
        );
    }

    headerMap: CommitColumnHeader = {
        id: {
            accessor: 'sha', Header: 'ID', Cell: ((e: any) => {
                return (
                    <a href={`${this.state.repoGitLink}\\${this.state.gitUser}\\${this.state.repoName}\\commit\\${e.value}`} target="_blank">
                        {e.value}
                    </a>)
            })
        },
        message: { accessor: 'commit.message', Header: 'Commit message' },
        author_name: { accessor: 'commit.author.name', Header: 'Author' },
        commit_date: { accessor: 'commit.author.date', Header: 'Date',
         Cell: ((e: any) => {
            return new Date(e.value).toLocaleString()
        }) },
    }


    renderTable() {
        const { commitsList } = this.props;


        const columns = [this.headerMap.id, this.headerMap.author_name, this.headerMap.message, this.headerMap.commit_date];

        return (
            <ReactTable
                data={commitsList}
                columns={columns}
                pageSizeOptions={[5, 10, 20, 25]}
            />
        );
    }





}

const mapToStateProps = (state: IApplicationState) => ({
    loading: state.commits.loading,
    commitsList: state.commits.commitList
});

const mapDispatchProps = {
    describeCommits
}


export default connect(mapToStateProps, mapDispatchProps)(Commits);