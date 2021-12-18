import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";

export default function AppUserCard(props) {
  const { first_name, last_name, avatar, email, id, cardClick } = props;
  return (
    <Card>
      <CardActionArea onClick={() => cardClick(id)}>
        <CardMedia component="img" height="140" image={avatar} alt={email} />
        <CardContent>
          <Typography noWrap gutterBottom variant="h6" component="div">
            {`${first_name} ${last_name}`}
          </Typography>
          <Typography noWrap variant="body2">
            {email}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
AppUserCard.prototype = {
  cardClick: PropTypes.func,
  id: PropTypes.any,
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  avatar: PropTypes.string,
  email: PropTypes.string,
};
