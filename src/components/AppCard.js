import React from "react";
import { makeStyles, Card, CardContent, Typography } from "@material-ui/core";
import AppDivider from "./AppDivider";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  card: {
    marginTop: "1rem",
    maxWidth: 400,
    minWidth: 360,
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: 400,
    textAlign: "center",
    textTransform: "capitalize",
  },
  bottomNote: {
    fontSize: "0.8rem",
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
    marginTop: "0.8rem",
    marginBottom: 0,
  },
});

export default function AppCard(props) {
  const { title = "", children, bottomNote } = props;
  const classes = useStyles();
  return (
    <Card className={classes.card} variant="outlined">
      <CardContent>
        <Typography className={classes.title}>{title}</Typography>
        <AppDivider />
        {children}
        {bottomNote && (
          <p className={classes.bottomNote}>
            <Link
              to={
                bottomNote.toLowerCase().includes("register")
                  ? "/register"
                  : "/"
              }
            >
              {bottomNote}
            </Link>
          </p>
        )}
      </CardContent>
    </Card>
  );
}
