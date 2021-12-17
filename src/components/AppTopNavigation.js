import React, { useState } from "react";
import {
  makeStyles,
  Menu,
  MenuItem,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { useHistory } from "react-router-dom";
import { AppConstant, AppStorage } from "../utils";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    textTransform: "capitalize",
  },
}));

export default function AppTopNavigation() {
  const classes = useStyles();
  const history = useHistory();
  const { login } = AppConstant;
  const [anchorEl, setAnchorEl] = useState(false);
  const authData = AppStorage.getItemFromStorage(login.storage);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (page) => {
    setAnchorEl(null);
    history.replace({ pathname: page });
  };

  const handleLogoutClick = (event) => {
    AppStorage.removeItemFromStorage(login.storage);
    history.replace({ pathname: "/" });
  };

  const menuItem = [
    { name: "Dashboard", path: "/user/" },
    { name: "List", path: "/user/list" },
    { name: "Add user", path: "/user/add" },
  ];

  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
      {menuItem.map((item, i) => (
        <MenuItem key={i} onClick={(e) => handleMenuClose(item.path)}>
          {item.name}
        </MenuItem>
      ))}
      <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
    </Menu>
  );

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {`Hello, ${authData && authData.email}`}
          </Typography>
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            onClick={handleMenuClick}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
}
