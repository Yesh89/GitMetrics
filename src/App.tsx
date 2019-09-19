import React from 'react';
import './App.css';
import Repos from "./modules/reposList/repos";
import { Route, Switch, Redirect } from "react-router-dom";
import Commits from "./modules/commitsView/commit";
import { Location } from "history";
const routes: JSX.Element[] = [];
routes.push(
  <Route
    exact path="/repos" component={Repos} key="repo"
  />);

routes.push(
  <Route
    exact path="/commits" component={Commits} key="commits"
  />);

interface RoutesProps {
  location?: Location;
}

export const Routes: React.FunctionComponent<RoutesProps> = (props) => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Switch location={props.location}>
        {routes}
      </Switch>
    </React.Suspense>
  )
}


