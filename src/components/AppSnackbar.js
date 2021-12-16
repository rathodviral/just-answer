import React, { useContext } from "react";
import { Snackbar, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { AppContext } from "../contexts";

export default function AppSnackbar(props) {
  const {
    snackbarStatus: { isOpen, message, hideDuration = 2000 },
    hideSnackbar,
  } = useContext(AppContext);
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      open={isOpen}
      autoHideDuration={hideDuration}
      onClose={hideSnackbar}
      message={message}
      key={new Date().getTime()}
      action={
        <React.Fragment>
          <IconButton aria-label="close" color="inherit" onClick={hideSnackbar}>
            <CloseIcon />
          </IconButton>
        </React.Fragment>
      }
    />
  );
}
