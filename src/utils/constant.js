const AppConstant = {
  invalidForm: "Form invalid.",
  login: {
    api: "login",
    storage: "JUST_USER",
    title: "JustAnswer Login",
    buttonLabel: "Login",
    bottomNote: "Register Here",
    fields: {
      email: {
        name: "email",
        label: "Email",
        type: "email",
        helperText: null,
        isDisabled: false,
        isRequired: true,
        isError: false,
        multiline: false,
        value: "",
      },
      password: {
        name: "password",
        label: "Password",
        type: "password",
        helperText: null,
        isDisabled: false,
        isRequired: true,
        isError: false,
        multiline: false,
        value: "",
      },
    },
  },
  register: {
    api: "register",
    storage: "JUST_USER",
    title: "JustAnswer Register",
    buttonLabel: "Register",
    bottomNote: "Login Here",
    fields: {
      fullName: {
        name: "fullName",
        label: "Full Name",
        type: "text",
        helperText: null,
        isDisabled: false,
        isError: false,
        multiline: false,
        value: "",
      },
      contactNumber: {
        name: "contactNumber",
        label: "Contact Number",
        type: "number",
        helperText: null,
        isDisabled: false,
        isError: false,
        multiline: false,
        value: "",
      },
      email: {
        name: "email",
        label: "Email",
        type: "email",
        helperText: null,
        isDisabled: false,
        isRequired: true,
        isError: false,
        multiline: false,
        value: "",
      },
      password: {
        name: "password",
        label: "Password",
        type: "password",
        helperText: null,
        isDisabled: false,
        isRequired: true,
        isError: false,
        multiline: false,
        value: "",
      },
    },
  },
  user: {
    api: "users",
    title: "Change in",
    buttonLabel: "Update",
    fields: {
      first_name: {
        name: "first_name",
        label: "First Name",
        type: "text",
        helperText: null,
        isDisabled: false,
        isError: false,
        multiline: false,
        value: "",
      },
      last_name: {
        name: "last_name",
        label: "Last Name",
        type: "text",
        helperText: null,
        isDisabled: false,
        isError: false,
        multiline: false,
        value: "",
      },
      email: {
        name: "email",
        label: "Email",
        type: "email",
        helperText: null,
        isDisabled: false,
        isError: false,
        multiline: false,
        value: "",
      },
    },
  },
  snackbar: { isOpen: false, message: "" },
  alertDialog: {
    isOpen: false,
    title: "",
    message: "",
    agreeBtnText: "Agree",
    disagreeBtnText: "Disagree",
  },
};
export default AppConstant;
