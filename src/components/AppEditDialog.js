import React, { useContext, useEffect, useState } from "react";
import {
  makeStyles,
  IconButton,
  Typography,
  Slide,
  Dialog,
  AppBar,
  Toolbar,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import { AppContext } from "../contexts";
import { useDispatch, useSelector } from "react-redux";
import { showLoader, toggleLoader, userListPageDetail } from "../reducers";
import { userApi } from "../services";
import { AppConstant } from "../utils";
import { AppForm, AppSpinner } from ".";
import { updateUserWithCurrentPage } from "../pages/user/User.utils";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  saveButton: {
    marginLeft: "auto",
  },
  title: {
    textTransform: "capitalize",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AppEditDialog(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { page } = useSelector(userListPageDetail);
  const { showAlertDialog, showSnackbar } = useContext(AppContext);
  const { dialogStatus, toggleDialog, selectedItem } = props;
  const { fields, title, buttonLabel } = AppConstant.user;
  const editTitle = selectedItem ? `${title} ${selectedItem.first_name}` : "";

  const showSpinner = useSelector(showLoader);
  const [formFields, setFormFields] = useState(null);

  useEffect(() => {
    if (selectedItem) {
      const updatedFields = {};
      Object.keys(fields).forEach((key) => {
        const field = fields[key];
        updatedFields[key] = { ...field, value: selectedItem[key] };
      });
      setFormFields(updatedFields);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItem]);

  const alertDeleteListItem = () => {
    const obj = {
      title: `Delete ${selectedItem.first_name}`,
      message: `Are you sure, you want to delete?`,
      agreeBtnText: "Agree",
      disagreeBtnText: "Disagree",
      dialogBtnClick: (isDelete) => {
        if (isDelete) {
          deleteListItem("delete");
        }
      },
    };
    showAlertDialog(obj);
  };

  const deleteListItem = async () => {
    dispatch(toggleLoader(true));
    const { status } = await userApi.delete(selectedItem.id);
    if (status) {
      showSnackbar(`Deleted.`);
      updateUserWithCurrentPage(dispatch, page);
      toggleDialog(false);
    } else {
      showSnackbar("Some Issue");
    }
  };

  const formSubmit = async (formData) => {
    dispatch(toggleLoader(true));
    try {
      const { status, message } = await userApi.update(
        selectedItem.id,
        formData
      );
      if (status) {
        showSnackbar(message);
        updateUserWithCurrentPage(dispatch, page);
      } else {
        // setValues(defaultFields);
        throw message;
      }
    } catch (error) {
      showSnackbar(error);
    }
  };

  return (
    <Dialog
      fullScreen
      open={dialogStatus}
      onClose={(e) => toggleDialog(false)}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={(e) => toggleDialog(false)}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title} noWrap={true}>
            {editTitle}
          </Typography>
          <IconButton
            className={classes.saveButton}
            edge="start"
            color="inherit"
            onClick={(e) => alertDeleteListItem()}
            aria-label="delete"
          >
            <DeleteIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div style={{ padding: "1rem" }}>
        <AppForm
          fields={formFields}
          buttonLabel={buttonLabel}
          formSubmit={formSubmit}
        ></AppForm>
      </div>
      {showSpinner && <AppSpinner />}
    </Dialog>
  );
}
