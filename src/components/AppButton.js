import React from "react";
import { makeStyles, Button } from "@material-ui/core";

const useStyles = makeStyles({
  button: {
    marginTop: 16,
  },
});

export default function AppButton(props) {
  const classes = useStyles();
  const { type = "button", onClick, children } = props;

  return (
    <Button
      type={type}
      variant="contained"
      color="primary"
      className={classes.button}
      fullWidth
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
