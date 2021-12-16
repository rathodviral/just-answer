import React from "react";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemIcon,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  noPadding: {
    paddingLeft: 0,
    paddingRight: 0,
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
  },
  avatar: {
    maxWidth: "50px",
    borderRadius: "50%",
    margin: "0 1rem",
  },
}));

export default function AppListItem(props) {
  const classes = useStyles();
  const { listItemClick, id, first_name, last_name, avatar, email } = props;

  return (
    <ListItem
      className={classes.noPadding}
      button
      onClick={(e) => listItemClick(id)}
    >
      <ListItemAvatar>
        <ListItemIcon>
          <img className={classes.avatar} src={avatar} alt={first_name} />
        </ListItemIcon>
      </ListItemAvatar>
      <ListItemText primary={`${first_name} ${last_name}`} secondary={email} />
    </ListItem>
  );
}
