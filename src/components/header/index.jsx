import React, { Component } from 'react'
import './header.css'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import moment from 'moment'
import { Modal, Button } from 'antd';
import Clickbn from '../clickbn/clickbn'
import { withRouter } from 'react-router-dom'
import menu from '../../config/menu'
import storage from '../../utili/storage'
const { confirm } = Modal;


class header extends Component {
  state = {
    time: moment().format('MMMM Do YYYY, h:mm:ss a'),

  }
  componentDidMount() {
    this.time = setInterval(() => {
      // console.log(1);

      this.setState({
        time: moment().format('MMMM Do YYYY, h:mm:ss A')
      })
    }, 1000)
  }
  componentWillUnmount() {
    clearInterval(this.time)
  }
  quit = () => {
    confirm({
      title: 'Do you Want to delete these items?',
      icon: <ExclamationCircleOutlined />,
      content: 'Some descriptions',
      onOk: () => {
        storage.removeuser()

        this.props.history.replace('/login')

      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  gettitle = () => {
    menu.forEach(item => {
      if (item.key == this.props.location.pathname) {
        this.title = item.title
      }
      else if (item.children)
        item.children.forEach(citem => {
          if (citem.key == this.props.location.pathname)
            this.title = citem.title
        })
    })
  }

  render() {
    const name = JSON.parse(localStorage.getItem('user')).userInfo.username

    this.gettitle()
    return (
      <div className='cheader'>
        <div className='h-top'><span>welcome , {name}</span> <Clickbn type="primary" className='quit' onClick={this.quit}>Quit</Clickbn></div>
        <div className='h-bot'><div className='bleft'>{this.title}</div><div className='bright'>{this.state.time}</div></div>
      </div>
    )
  }
}
export default withRouter(header)