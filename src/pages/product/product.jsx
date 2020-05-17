import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Add from './add'
import Detail from './detail'
import Index from './index'
export default class product extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/product' component={Index}></Route>
        <Route path='/product/add' component={Add}></Route>
        <Route path='/product/detail' component={Detail}></Route>
        {/* <Route path='/product' component={Index}></Route> */}
      </Switch>
    )
  }
}
