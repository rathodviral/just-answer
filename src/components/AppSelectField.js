import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
  InputLabel,
} from "@material-ui/core";

export default function AppSelectField(props) {
  const {
    isDisabled = false,
    isError = false,
    name,
    label,
    value,
    handleChange,
    helperText = "",
    defaultValue = null,
    options = [],
  } = props;

  const [fieldValue, setFieldValue] = useState(value);

  useEffect(() => {
    setFieldValue(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <FormControl
      variant="outlined"
      className="FormControl--width app_margin--top-bottom-1"
      disabled={isDisabled}
      error={isError}
      size="small"
    >
      <InputLabel id={name}>{label}</InputLabel>
      <Select
        labelId={name}
        id={name}
        value={fieldValue}
        label={label}
        onChange={(e) => handleChange(e.target.value, name)}
      >
        {defaultValue && (
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
        )}
        {options.map((option, key) => (
          <MenuItem value={option} key={key}>
            {option.name || option}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}
AppSelectField.prototype = {
  isDisabled: PropTypes.bool,
  isError: PropTypes.bool,
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.any,
  handleChange: PropTypes.func,
  helperText: PropTypes.string,
  defaultValue: PropTypes.any,
  options: PropTypes.array,
};
