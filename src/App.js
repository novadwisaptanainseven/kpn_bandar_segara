import React, { lazy, useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import AccessibleNavigationAnnouncer from "./components/AccessibleNavigationAnnouncer";
import { GlobalContext, GlobalProvider } from "./context/Provider";

const Layout = lazy(() => import("./containers/Layout"));
const FrontPage = lazy(() => import("./pages/FrontPage"));
const Login = lazy(() => import("./pages/Login"));
const CreateAccount = lazy(() => import("./pages/CreateAccount"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));

function App() {
  return (
    <>
      <GlobalProvider>
        <Router>
          <AccessibleNavigationAnnouncer />
          <Switch>
            <Route path="/simantra/login" component={Login} />
            <Route path="/create-account" component={CreateAccount} />
            <Route path="/forgot-password" component={ForgotPassword} />

            {/* Place new routes over this */}
            <Route path="/simantra" component={Layout} />

            <Route path="/" component={FrontPage} />
            {/* If you have an index page, you can remothis Redirect */}
            <Redirect exact from="/" to="/" />
          </Switch>
        </Router>
      </GlobalProvider>
    </>
  );
}

export default App;
