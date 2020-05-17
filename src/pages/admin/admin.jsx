import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import storage from '../../utili/storage'
import { Layout } from 'antd';
import { Switch, Route } from 'react-router-dom'
import LeftNav from '../../components/left-nav'
import Header from '../../components/header'
import Product from '../product/product'
import User from '../user/user'
import Pie from '../charts/pie'
import Home from '../home/home'
import Line from '../charts/line'
import Bar from '../charts/bar'
import Role from '../role/role'
import Category from '../category/category'


const { Footer, Sider, Content } = Layout;
export default class admin extends Component {
  render() {
    if (!storage.getuser()) {

      return <Redirect to='/login'></Redirect>
    }
    else {
      return (
        <Layout style={{ minHeight: '100%' }}>
          <Sider><LeftNav></LeftNav></Sider>
          <Layout>
            <Header>Header</Header>
            <Content style={{ margin: '40px', backgroundColor: '#161616' }}>
              <Switch>
                <Route path='/role' component={Role}>
                </Route>
                <Route path='/user' component={User}>
                </Route>
                <Route path='/home' component={Home}>
                </Route>
                <Route path='/chart/pie' component={Pie}>
                </Route>
                <Route path='/chart/line' component={Line}>
                </Route>
                <Route path='/chart/bar' component={Bar}>
                </Route>
                <Route path='/product' component={Product}>
                </Route>
                <Route path='/category' component={Category}>
                </Route>
                <Redirect to='/home'></Redirect>
              </Switch>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Welcome to Deck</Footer>
          </Layout>
        </Layout>
      )
    }
  }
}
