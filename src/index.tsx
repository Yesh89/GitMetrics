import React from 'react';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ConnectedRouter } from 'connected-react-router';
import { history } from "./store/store";
import { Routes } from "./App";
import { render } from 'react-dom';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Repos from "./modules/reposList/repos";
import Commits from "./modules/commitsView/commit";
import { BrowserRouter as Router } from 'react-router-dom';


class GitMetrics extends React.Component {


    render() {
        return (
            < Provider store={store} >
                <ConnectedRouter history={history}>
                    <Router>
                        <Routes />
                    </Router>
                </ConnectedRouter>
            </Provider >

        );
    }
}


render(<GitMetrics />, document.getElementById('root'))


export { GitMetrics };
// ReactDOM.render(<Provider store={store}>
//     <ConnectedRouter history={history}>
//         <Routes />
//     </ConnectedRouter>
//  </Provider>, document.getElementById('root'));
//ReactDOM.render(<Routes />, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
