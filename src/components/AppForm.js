import React, { useContext, useEffect, useState } from "react";
import { AppInputField, AppButton } from "../components";
import {
  AppConstant,
  getErrorFields,
  isFormValid,
  getFormValue,
} from "../utils";
import { AppContext } from "../contexts";

export default function AppForm(props) {
  const { showSnackbar } = useContext(AppContext);
  const { fields, buttonLabel, formSubmit } = props;

  const [formFields, setFormFields] = useState(null);

  useEffect(() => {
    setFormFields(fields);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fields]);

  const formFieldChange = (value, name) => {
    const field = { ...formFields[name], value };
    setFormFields({ ...formFields, [name]: field });
  };

  const formSubmitEvent = async () => {
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
          return (
            <AppInputField key={i} {...field} handleChange={formFieldChange} />
          );
        })}
      <AppButton onClick={formSubmitEvent}>{buttonLabel}</AppButton>
    </form>
  );
}
