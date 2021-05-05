import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import PrivateRoute from "./components/PrivateRoute";

// private routing
import Private from "./components/routing/Private.js";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Private exact path="/" component={PrivateRoute} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route
          exact
          path="/password-reset/:resetToken"
          component={ResetPassword}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
