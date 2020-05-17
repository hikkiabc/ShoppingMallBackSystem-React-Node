import React, { Component } from 'react'
import './login.css'
import { Redirect } from 'react-router-dom'
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import logo from './logo192.png'
import '../../assets/css/style.css'
import request from '../../network/network'
import memory from '../../utili/memory'
import storage from '../../utili/storage'


export default class login extends Component {

  render() {
    if (storage.getuser()) {
      return <Redirect to='/'></Redirect>
    }

    const onFinish = async values => {
      const data = await request('/user/login', values, 'post')
      if (data.data.code == 1) {
        // console.log(data);

        storage.saveuser({ userInfo: data.data.user, roleInfo: data.data.role })
        this.props.history.replace('/')
      }
    }
    return (
      <div className='login'> <header className='header'>
        <img className='logo' src={logo} alt="" />
        <div className='hfont'>React WebSystem</div>
      </header>
        <section className='section'>
          <div className='sfont'>Login</div>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, whitespace: true, message: 'Please input your Username!' },
              { pattern: /^[0-9a-zA-Z_]+$/, message: 'Please input correct' }]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
        </Button>

            </Form.Item>
          </Form>
        </section></div>

    )
  }
}
