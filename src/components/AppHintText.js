import React from "react";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  detail: {
    textAlign: "center",
    fontSize: "0.8rem",
  },
});

export default function AppHintText(props) {
  const classes = useStyles();
  const { children } = props;

  return <Typography className={classes.detail}>{children}</Typography>;
}
