import React from "react";
import { Button } from "@material-ui/core";
import PropTypes from "prop-types";

export default function AppButton(props) {
  const { type = "button", onClick, children } = props;

  return (
    <Button
      type={type}
      variant="contained"
      color="primary"
      className="app_margin--top-1"
      fullWidth
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

AppButton.prototype = {
  type: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.any,
};
