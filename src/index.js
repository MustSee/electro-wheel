import React from "react";
import { render } from "react-snapshot";
import { HashRouter } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#fbe9e7",
      dark: "#c8b7b5"
    },
    secondary: {
      main: "#ff9100"
    }
  }
});

render(
  <MuiThemeProvider theme={theme}>
    <HashRouter>
      <App />
    </HashRouter>
  </MuiThemeProvider>,
  document.getElementById("root")
);
registerServiceWorker();
