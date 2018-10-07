import React from "react";
import { AppBar, Toolbar, Typography, withTheme } from "@material-ui/core";

function SimpleAppBar(props) {
  const { title, theme } = props;
  const primaryDark = theme.palette.primary.dark;
  return (
    <AppBar position="static" style={{ backgroundColor: primaryDark }}>
      <Toolbar>
        <Typography variant="title">{title}</Typography>
      </Toolbar>
    </AppBar>
  );
}

export default withTheme()(SimpleAppBar);
