import React, { createContext, useState } from "react";
import { AppConstant } from "../utils";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const body = document.querySelector("body");

  const initialSnackbarObj = AppConstant.snackbar;
  const initialAlertDialogObj = AppConstant.alertDialog;

  const [snackbarStatus, setSnackbarStatus] = useState(initialSnackbarObj);
  const [alertDialogStatus, setAlertDialogStatus] = useState(
    initialAlertDialogObj
  );

  const showSnackbar = (message) => {
    setSnackbarStatus({ isOpen: true, message });
  };

  const hideSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarStatus(initialSnackbarObj);
  };

  const showAlertDialog = (obj) => {
    setAlertDialogStatus({ ...obj, isOpen: true });
  };

  const hideAlertDialog = (event, reason) => {
    setAlertDialogStatus(initialAlertDialogObj);
  };

  return (
    <AppContext.Provider
      value={{
        body,
        snackbarStatus,
        showSnackbar,
        hideSnackbar,
        alertDialogStatus,
        showAlertDialog,
        hideAlertDialog,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
