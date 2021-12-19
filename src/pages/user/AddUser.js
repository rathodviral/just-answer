import React, { useContext, useState } from "react";
import "./user.css";
import { AppCard, AppForm, AppSpinner } from "../../components";
import { AppContext } from "../../contexts";
import { useDispatch, useSelector } from "react-redux";
import { AppConstant } from "../../utils";
import { userApi } from "../../services";
import { showLoader, toggleLoader } from "../../reducers";

export default function AddUser(props) {
  const dispatch = useDispatch();
  const { showSnackbar } = useContext(AppContext);
  const showSpinner = useSelector(showLoader);
  const { fields, title, buttonLabel } = AppConstant.addUser;

  let [resetOnSubmit, setResetOnSubmit] = useState(null);

  const formSubmit = async (formValue) => {
    dispatch(toggleLoader(true));
    try {
      const response = await userApi.post(formValue);
      const { status, message, data } = response;
      dispatch(toggleLoader(false));
      if (status) {
        setResetOnSubmit(data);
        showSnackbar(message);
      } else {
        throw message;
      }
    } catch (error) {
      showSnackbar(error);
    }
  };

  return (
    <div className="dashboard_items--center">
      <AppCard title={title}>
        {fields && (
          <AppForm
            fields={fields}
            buttonLabel={buttonLabel}
            formSubmit={formSubmit}
            resetOnSubmit={resetOnSubmit}
          ></AppForm>
        )}
      </AppCard>
      {showSpinner && <AppSpinner />}
    </div>
  );
}
