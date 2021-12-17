import React, { useContext, useEffect, useState } from "react";
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
    alignItems: "center",
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

  const [formFields, setFormFields] = useState(null);

  useEffect(() => {
    const authData = AppStorage.getItemFromStorage(storage);
    if (authData && authData.token) {
      history.replace({ pathname: "/user" });
      return;
    }
    setFormFields(fields);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fields]);

  const formSubmit = async (formValue) => {
    try {
      const response = isRegister
        ? await authApi.register(formValue)
        : await authApi.login(formValue);
      const { status, data, message } = response;
      if (status) {
        AppStorage.setItemInStorage(storage, {
          ...data,
          email: formValue.email,
        });
        history.replace({ pathname: "/user" });
      } else {
        setFormFields(fields);
        throw message;
      }
    } catch (error) {
      showSnackbar(error);
    }
  };

  return (
    <div className={classes.root}>
      <AppCard title={title} bottomNote={bottomNote}>
        {formFields && (
          <AppForm
            fields={formFields}
            buttonLabel={buttonLabel}
            formSubmit={formSubmit}
          ></AppForm>
        )}
      </AppCard>
    </div>
  );
}
