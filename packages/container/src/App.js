import {
  createGenerateClassName,
  StylesProvider,
} from "@material-ui/core/styles";
import React, { lazy, Suspense, useState, useEffect } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import Header from "./components/Header";
import Progress from "./components/Progress";
import ModuleFederationExplorer from "./components/ModuleFederationExplorer";
import { createBrowserHistory } from "history";

const MarketingModuleLazy = lazy(() => import("./components/MarketingModule"));
const AuthModuleLazy = lazy(() => import("./components/AuthModule"));
const DashboardModuleLazy = lazy(() => import("./components/DashboardModule"));

const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});

const history = createBrowserHistory();

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      history.push("/dashboard");
    }
  }, [isSignedIn]);

  return (
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
        <Header signedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)} />
        <Suspense fallback={<Progress />}>
          <Switch>
            <Route path={"/auth"}>
              <AuthModuleLazy setIsSignedIn={setIsSignedIn} />
            </Route>
            <Route path={"/dashboard"}>
              {!isSignedIn && <Redirect to={"/"} />}
              <DashboardModuleLazy />
            </Route>
            <Route path={"/"} component={MarketingModuleLazy} />
          </Switch>
        </Suspense>
        <ModuleFederationExplorer />
      </StylesProvider>
    </Router>
  );
};

export default App;
