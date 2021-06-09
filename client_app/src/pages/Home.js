import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignUpPage from "./SignUpPage";
import InitPage from "./InitPage";
import SignInPage from "./SignInPage";
import WelcomePage from "./WelcomePage";
import { ThemeProvider } from "@material-ui/styles";
import { LightTheme } from "../services/ThemeService";

const SIGN_IN = "/signin";
const SIGN_UP = "/signup";
const WELCOME = "/welcome";
const INIT = "/";

/**
 * Component responsible for rendering the correct page based on the current URL
 * DOCS: https://reactrouter.com/web/guides/quick-start
 */
export default function Home() {

  return (
    <ThemeProvider theme={LightTheme}>
      <Router>
        <Switch>
          <Route exact path={SIGN_IN}>
            <SignInPage />
          </Route>

          <Route exact path={SIGN_UP}>
            <SignUpPage />
          </Route>

          <Route exact path={WELCOME}>
            <WelcomePage />
          </Route>

          <Route exact path={INIT}>
            <InitPage />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}