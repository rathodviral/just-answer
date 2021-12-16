import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { AppCard, AppForm } from "../components";
import { AppConstant, AppStorage } from "../utils";
import { useHistory, useRouteMatch } from "react-router-dom";
import { AppContext } from "../contexts";
import { authApi } from "../services";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    height: "100vh",
    flexDirection: "column",
  },
});

export default function Login() {
  const classes = useStyles();
  const history = useHistory();
  const { path } = useRouteMatch();
  const { showSnackbar } = useContext(AppContext);

  const isRegister = path.includes("register");

  const { fields, title, storage, buttonLabel, bottomNote } = isRegister
    ? AppConstant.register
    : AppConstant.login;

  useEffect(() => {
    const { token } = AppStorage.getItemFromStorage(storage);
    if (token) {
      history.replace({ pathname: "/user" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formSubmit = async (formValue) => {
    try {
      const response = isRegister
        ? await authApi.register(formValue)
        : await authApi.login(formValue);
      const { status, data, message } = response;
      if (status) {
        AppStorage.setItemInStorage(storage, data);
        history.replace({ pathname: "/user" });
      } else {
        // setLoginFields(fields);
        throw message;
      }
    } catch (error) {
      showSnackbar(error);
    }
  };

  return (
    <div className={classes.root}>
      <AppCard title={title} bottomNote={bottomNote}>
        {fields && (
          <AppForm
            fields={fields}
            buttonLabel={buttonLabel}
            formSubmit={formSubmit}
          ></AppForm>
        )}
      </AppCard>
    </div>
  );
}
