import React from "react";
import "./components.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";

export default function AppLink({ children }) {
  return (
    <Typography
      variant="overline"
      component="p"
      className="app_margin--top-1 app_text--horizontal-center"
    >
      <Link
        to={children.toLowerCase().includes("register") ? "/register" : "/"}
      >
        {children}
      </Link>
    </Typography>
  );
}
AppLink.prototype = {
  children: PropTypes.any,
};
