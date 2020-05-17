import React, { Component } from 'react'
import menu from '../../config/menu'
import './left-nav.css'
import logo from '../../pages/login/logo192.png'
import { Link, withRouter } from 'react-router-dom'
import { Menu, Button } from 'antd';
import storage from '../../utili/storage'


const { SubMenu } = Menu;

class leftnav extends Component {

  isAuthed = (i) => {
    const roleinfo = storage.getuser().roleInfo
    // console.log(roleinfo);

    if (i.public || roleinfo.role_name == 'admin' || roleinfo.menu.indexOf(i.key) != -1) {
      return true
    } else if (i.children) {

      return !!i.children.find(i1 => roleinfo.menu.indexOf(i1.key) != -1)
    }
    else return false

  }

  getmenu = (menu) => {
    return menu.map(item => {

      if (this.isAuthed(item)) {
        if (item.children) {

          if (item.children.find(item1 => item1.key == '/' + this.props.location.pathname.split('/')[1])) {
            this.openkey = item.key
          }
          return (
            <SubMenu
              key={item.key}
              title={
                <span>
                  {item.icon}
                  <span>{item.title}</span>
                </span>
              }
            >
              {this.getmenu(item.children)}
            </SubMenu>
          )
        } else {
          return (
            <Menu.Item key={item.key}>
              {item.icon}
              <Link to={item.path}>    <span>{item.title}</span></Link>

            </Menu.Item>
          )
        }
      }
    })
  }
  componentWillMount() {
    this.readymenu = this.getmenu(menu)
  }
  render() {

    // this.props.location.pathname.split

    return (
      <div className='left-nav'>
        <Link to='/home' className='nav-header'>
          <img className='left-nav-img' src={logo} alt="" />
          <h1>Manage Panel</h1>
        </Link>
        <Menu
          selectedKeys={['/' + this.props.location.pathname.split('/')[1]]}
          defaultOpenKeys={[this.openkey]}
          mode="inline"
          theme="dark"
        >
          {this.readymenu}

        </Menu>
      </div>
    )
  }
}
export default withRouter(leftnav)