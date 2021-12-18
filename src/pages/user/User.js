import React, { useContext, useEffect } from "react";
import "./user.css";
import { AppSpinner, AppTopNavigation } from "../../components";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, showLoader } from "../../reducers";
import UserList from "./List";
import Dashboard from "./Dashboard";
import AddUser from "./AddUser";
import { AppContext } from "../../contexts";
import { useHistory } from "react-router-dom";

export default function User() {
  const history = useHistory();
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const showSpinner = useSelector(showLoader);
  const { isUserValid } = useContext(AppContext);

  useEffect(() => {
    if (isUserValid()) {
      dispatch(fetchUser());
    } else {
      history.replace({ pathname: "/" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <div className="user_div--width">
        <AppTopNavigation />
        <div className="user_div--margin-top">
          <Switch>
            <Route exact path={`${path}`}>
              <Dashboard />
            </Route>
            <Route exact path={`${path}/list`}>
              <UserList />
            </Route>
            <Route exact path={`${path}/add`}>
              <AddUser />
            </Route>
          </Switch>
        </div>
      </div>
      {showSpinner && <AppSpinner />}
    </React.Fragment>
  );
}
