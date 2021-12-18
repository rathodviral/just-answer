import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AppContext } from "../contexts";

export default function PrivateRoute({ children, ...rest }) {
  const { isUserValid } = useContext(AppContext);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isUserValid() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
