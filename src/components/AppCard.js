import React from "react";
import "./components.css";
import PropTypes from "prop-types";
import { Card, CardContent, Typography } from "@material-ui/core";
import { AppLink, AppDivider } from ".";

export default function AppCard(props) {
  const { title, children, bottomNote } = props;
  return (
    <Card
      className="Card_width--max--min-400 app_margin--top-1"
      variant="outlined"
    >
      <CardContent className="app_padding--bottom-1">
        {title && (
          <Typography className="app_text--horizontal-center" variant="h6">
            {title}
          </Typography>
        )}
        {title && <AppDivider />}
        {children}
        {bottomNote && <AppLink>{bottomNote}</AppLink>}
      </CardContent>
    </Card>
  );
}

AppCard.prototype = {
  title: PropTypes.string,
  bottomNote: PropTypes.string,
  children: PropTypes.any,
};
