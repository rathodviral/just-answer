import React from "react";
import "./components.css";
import PropTypes from "prop-types";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";

export default function AppListItem(props) {
  const { listItemClick, id, first_name, last_name, avatar, email } = props;

  return (
    <ListItem
      className="ListItem_border--bottom app_padding--left-right-0"
      button
      onClick={(e) => listItemClick(id)}
    >
      <ListItemAvatar>
        <ListItemIcon>
          <img
            className="img--avtar app_margin--left-right-1"
            src={avatar}
            alt={first_name}
          />
        </ListItemIcon>
      </ListItemAvatar>
      <ListItemText primary={`${first_name} ${last_name}`} secondary={email} />
    </ListItem>
  );
}

AppListItem.prototype = {
  listItemClick: PropTypes.func,
  id: PropTypes.any,
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  avatar: PropTypes.string,
  email: PropTypes.string,
};
