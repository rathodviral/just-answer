import React, { createContext, useEffect, useState } from "react";
import { AppConstant } from "../utils";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const body = document.querySelector("body");

  const [isSmallScreen, setSmallScreen] = useState(0);

  let resizeWindow = () => {
    setSmallScreen(window.innerWidth <= 450);
  };

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

  useEffect(() => {
    resizeWindow();
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  }, []);

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
        isSmallScreen,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
