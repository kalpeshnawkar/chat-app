/**
 * Purpose      :create chatapp for chating to each other
* 
* @description
* 
* @file        :App.js
* @overview    :It is a front end of chatapp, create it using react,HTML,CSS in front end.
* @author      :Kshiteej Nawkar <knawkar@gmail.com>
* @version     :1.0
* @since       :`22/03/2019  */

import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router,Route} from "react-router-dom"
import login from "./pages/login"
import registration from "./pages/registration"
import forgotpassword from "./pages/forgotpassword"
import resetpassword from "./pages/resetpassword"
import dashboard from "./pages/dashboard"
export default class App extends Component {

  render() {
    return (
  
<div>
  <Router>
  <div className="App">

<Route path="/login" component={login}></Route>

<Route path="/register" component={registration}></Route>

<Route path="/forgotpassword" component={forgotpassword}></Route>

<Route path="/reset" component={resetpassword}></Route>
<Route path="/dashboard" component={dashboard}></Route>
</div>
</Router>
</div>
 );
  }
}


