export const sortByName = (a, b) =>
  a.name > b.name ? 1 : b.name > a.name ? -1 : 0;

export const isFalsyValue = (value) =>
  value === null || value === undefined || value === "";

export const setValidField = (fieldObject) => {
  return {
    ...fieldObject,
    helperText: `Entered value is valid for ${fieldObject.label}.`,
  };
};

export const setInvalidField = (fieldObject) => {
  return {
    ...fieldObject,
    isError: true,
    label: "Error",
    helperText: `Enter ${fieldObject.label}, it's required field.`,
  };
};

export const getErrorFields = (sourceFields) => {
  const fields = {};
  Object.keys(sourceFields).forEach((item) => {
    const field = sourceFields[item];
    fields[item] =
      isFalsyValue(field.value) && field.isRequired
        ? setInvalidField(field)
        : setValidField(field);
  });

  return fields;
};

export const isFormValid = (formValue) =>
  Object.values(formValue).some((item) => isFalsyValue(item));

export const getFormValue = (sourceFields) => {
  let data = {};
  Object.keys(sourceFields).forEach((fieldKey) => {
    const { value } = sourceFields[fieldKey];
    data[fieldKey] = value;
  });
  return data;
};
