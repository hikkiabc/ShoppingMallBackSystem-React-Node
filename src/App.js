import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Admin from './pages/admin/admin'
import Login from './pages/login/login'
// import './assets/css/style.css'
export default class app extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/login' component={Login}></Route>
          <Route path='/' component={Admin}></Route>
        </Switch>
      </BrowserRouter>
    )

  }
}

