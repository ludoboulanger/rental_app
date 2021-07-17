import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import SignUpPage from "./SignUpPage/SignUpPage.jsx";
import InitPage from "./InitPage";
import SignInPage from "./SignInPage";
import WelcomePage from "./WelcomePage";
import SettingsPage from "./SettingsPage";
import SearchPage from "./SearchPage";
import { ThemeProvider } from "@material-ui/styles";
import { LightTheme } from "../services/ThemeService";
import {ROUTES} from "../utils/enums";
import Header from "../components/Headers";
import BottomNavigation from "../components/BottomNavigation";
import {useMediaQuery, useTheme} from "@material-ui/core";
import AuthBackgroundContainer from "../components/AuthPageBackground/AuthBackgroundContainer.jsx";

const isAuthenticationPage = path => (
  path === ROUTES.SIGN_IN
  || path === ROUTES.SIGN_UP
  || path === ROUTES.INIT
);

/**
 * Component responsible for rendering the correct page based on the current URL
 * DOCS: https://reactrouter.com/web/guides/quick-start
 */
export default function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery( theme.breakpoints.down("sm"));
  const location = useLocation();

  return (
    <ThemeProvider theme={LightTheme}>
      {
        !isAuthenticationPage(location.pathname) &&
        <Header withSearchBar={true}/>
      }
      <Switch>

        <Route exact path={ROUTES.SIGN_IN}>
          <AuthBackgroundContainer>
            <SignInPage />
          </AuthBackgroundContainer>
        </Route>
        <Route exact path={ROUTES.SIGN_UP}>
          <AuthBackgroundContainer>
            <SignUpPage />
          </AuthBackgroundContainer>
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
      {
        (!isAuthenticationPage(location.pathname) && isMobile) &&
        <BottomNavigation/>
      }
    </ThemeProvider>
  );
}
