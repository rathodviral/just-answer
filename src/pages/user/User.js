import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { AppSpinner, AppTopNavigation } from "../../components";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, showLoader } from "../../reducers";
import UserList from "./List";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  dashboard: {
    marginTop: "4.8rem",
  },
});

export default function User() {
  const classes = useStyles();
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const showSpinner = useSelector(showLoader);
  useEffect(() => {
    dispatch(fetchUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <div className={classes.root}>
        <AppTopNavigation></AppTopNavigation>
        <div className={classes.dashboard}>
          <Switch>
            <Route exact path={`${path}`}>
              <UserList />
            </Route>
          </Switch>
        </div>
      </div>
      {showSpinner && <AppSpinner />}
    </React.Fragment>
  );
}
