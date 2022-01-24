/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { frontURL } from './config';

// core components
import Admin from "layouts/Admin.js";
import RTL from "layouts/RTL.js";
import Auth from "./components/Auth/Auth.js"

import "assets/css/material-dashboard-react.css?v=1.9.0";

const hist = createBrowserHistory();

const localUser = window.localStorage.getItem('user')
if (localUser == null && !hist.location.pathname.includes("auth")) {
  window.location.replace(frontURL)
}

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/auth/:id" component={Auth} />
      <Route path="/admin" component={Admin} />
      <Route path="/rtl" component={RTL} />
      <Redirect from="/" to="/admin/dashboard" />
    </Switch>
  </Router>,
  document.getElementById("root")
);
