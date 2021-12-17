import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
  InputLabel,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
    marginTop: "16px",
    marginBottom: "8px",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function AppSelectField(props) {
  const classes = useStyles();
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
      className={classes.formControl}
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
