import React, { Component } from 'react'
import {
  AppstoreOutlined,
  BankOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons';


const menu = [{
  title: 'Home',
  key: '/home',
  path: '/home',
  public: true,
  icon: <BankOutlined />
}, {
  title: ' Product',
  key: 'product',
  icon: <DesktopOutlined />,
  children: [{
    title: 'Category',
    key: '/category',
    path: '/category',
    icon: <BankOutlined />
  }, {
    title: 'Product',
    key: '/product',
    path: '/product',
    icon: <AppstoreOutlined />
  }]
}, {
  title: 'User',
  key: '/user',
  path: '/user',
  icon: <BankOutlined />
}, {
  title: 'Role',
  key: '/role',
  public: true,
  path: '/role',
  icon: <BankOutlined />
}, {
  title: ' Charts',
  key: '/charts',
  public: true,
  icon: <DesktopOutlined />,
  children: [{
    title: 'Pie',
    key: '/chart/pie',
    path: '/chart/pie',
    public: true,
    icon: <BankOutlined />
  }, {
    title: 'Bar',
    key: '/chart/bar',
    path: '/chart/bar',
    icon: <MailOutlined />
  }, {
    title: 'Line',
    key: '/chart/line',
    path: '/chart/line',
    icon: <AppstoreOutlined />
  }]
}]

export default menu