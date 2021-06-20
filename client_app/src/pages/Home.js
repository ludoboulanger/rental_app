import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CreateAccountPage from "./createAccount/CreateAccountPage.jsx";
import VerifyAccount from "./VerifyAccount/VerifyAccount.jsx";
import InitPage from "./InitPage";
import SignInPage from "./SignInPage";
import WelcomePage from "./WelcomePage";
import SettingsPage from "./SettingsPage";
import SearchPage from "./SearchPage";
import { ThemeProvider } from "@material-ui/styles";
import { LightTheme } from "../services/ThemeService";
import {ROUTES} from "../utils/enums";
//import MobileHeader from "../components/Headers/MobileHeader";

/**
 * Component responsible for rendering the correct page based on the current URL
 * DOCS: https://reactrouter.com/web/guides/quick-start
 */
export default function Home() {

  return (
    <ThemeProvider theme={LightTheme}>
      <Router>
        {/* <MobileHeader /> */}
        <Switch>
          <Route exact path={ROUTES.SIGN_IN}>
            <SignInPage />
          </Route>
          <Route exact path={ROUTES.CREATE_ACCOUNT}>
            <CreateAccountPage />
          </Route>
          <Route exact path={ROUTES.VERIFY_ACCOUNT}>
            <VerifyAccount />
          </Route>
          <Route exact path={ROUTES.WELCOME}>
            <WelcomePage />
          </Route>
          <Route exact path={ROUTES.INIT}>
            <InitPage />
          </Route>
          <Route exact path={ROUTES.SETTINGS}>
            <SettingsPage />
          </Route>
          <Route exact path={ROUTES.SEARCH}>
            <SearchPage />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}
