import React, { useState } from "react";
import "./components.css";
import {
  Menu,
  MenuItem,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import { useHistory } from "react-router-dom";
import { AppConstant, AppStorage } from "../utils";

export default function AppTopNavigation() {
  const history = useHistory();
  const { login } = AppConstant;
  const authData = AppStorage.getItemFromStorage(login.storage);

  const menuItem = [
    { name: "Dashboard", path: "/user/" },
    { name: "List", path: "/user/list" },
    { name: "Add user", path: "/user/add" },
  ];

  const [anchorEl, setAnchorEl] = useState(false);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (page) => {
    setAnchorEl(null);
    if (typeof page === "string") history.replace({ pathname: page });
  };

  const handleLogoutClick = (event) => {
    AppStorage.removeItemFromStorage(login.storage);
    history.replace({ pathname: "/" });
  };

  const handleBackClick = (event) => {
    history.goBack();
  };

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
    <div className="div--flexgrow">
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            aria-label="back navigation"
            aria-haspopup="false"
            onClick={handleBackClick}
            color="inherit"
          >
            <ChevronLeft />
          </IconButton>
          <Typography
            variant="h6"
            className="div--flexgrow app_text-capitalize"
          >
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
