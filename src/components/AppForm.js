import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { AppInputField, AppButton } from "../components";
import {
  AppConstant,
  getErrorFields,
  isFormValid,
  getFormValue,
} from "../utils";
import { AppContext } from "../contexts";
import AppSelectField from "./AppSelectField";

export default function AppForm(props) {
  const { showSnackbar } = useContext(AppContext);
  const { fields, buttonLabel, formSubmit, resetOnSubmit = false } = props;

  const [formFields, setFormFields] = useState(null);

  useEffect(() => {
    setFormFields(fields);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fields, resetOnSubmit]);

  const formFieldChange = (value, name) => {
    const field = { ...formFields[name], value };
    setFormFields({ ...formFields, [name]: field });
  };

  const formSubmitEvent = async (e) => {
    e.preventDefault();
    try {
      const formValue = getFormValue(formFields);
      if (isFormValid(formValue)) {
        const fieldsObj = getErrorFields(formFields);
        setFormFields(fieldsObj);
        throw AppConstant.invalidForm;
      }
      formSubmit(formValue);
    } catch (error) {
      showSnackbar(error);
    }
  };

  return (
    <form noValidate autoComplete="off">
      {formFields &&
        Object.keys(formFields).map((fieldKey, i) => {
          const field = formFields[fieldKey];
          if (field.type === "select") {
            return (
              <AppSelectField
                key={i}
                {...field}
                handleChange={formFieldChange}
              />
            );
          } else {
            return (
              <AppInputField
                key={i}
                {...field}
                handleChange={formFieldChange}
              />
            );
          }
        })}
      <AppButton onClick={formSubmitEvent} type="submit">
        {buttonLabel}
      </AppButton>
    </form>
  );
}

AppForm.prototype = {
  fields: PropTypes.array,
  fieldbuttonLabels: PropTypes.string,
  formSubmit: PropTypes.func,
  resetOnSubmit: PropTypes.bool,
};
