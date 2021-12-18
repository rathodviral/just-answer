import React, { useState, useEffect } from "react";
import { TextField } from "@material-ui/core";
import PropTypes from "prop-types";

export default function AppInputField(props) {
  const {
    margin = "normal",
    isDisabled = false,
    isError = false,
    multiline = false,
    rows = null,
    name,
    label,
    type,
    helperText,
    value,
    handleChange,
  } = props;

  const [fieldValue, setFieldValue] = useState(value);

  useEffect(() => {
    setFieldValue(value);
  }, [value]);

  return (
    <TextField
      variant="outlined"
      size="small"
      InputLabelProps={{
        shrink: true,
      }}
      fullWidth
      disabled={isDisabled}
      error={isError}
      margin={margin}
      type={type}
      id={name}
      label={label}
      helperText={helperText}
      value={fieldValue}
      multiline={multiline}
      rows={rows}
      onChange={(e) => handleChange(e.target.value, name)}
    />
  );
}

AppInputField.prototype = {
  margin: PropTypes.string,
  isDisabled: PropTypes.bool,
  isError: PropTypes.bool,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
  name: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  helperText: PropTypes.string,
  value: PropTypes.any,
  handleChange: PropTypes.func,
};
