import React from "react";
import "./components.css";
import PropTypes from "prop-types";
import { Typography } from "@material-ui/core";

export default function AppTitleText(props) {
  const { count, onClick } = props;
  return (
    <Typography
      className="Typography_text--center"
      variant="h3"
      onClick={onClick}
    >
      {count}
    </Typography>
  );
}
AppTitleText.prototype = {
  count: PropTypes.string,
  onClick: PropTypes.func,
};
