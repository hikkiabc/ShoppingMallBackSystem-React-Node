import React, { Component } from 'react'
import { Modal, Card, Table, Button } from 'antd';
import request from '../../network/network'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import AddOrEdit from './addoredit'
export default class user extends Component {
  state = {
    num: 1,
    size: 2,
    loading: true,
    total: 0,
    visible: 0,
    userData: [],
    roleMap: {}

  }
  async componentDidMount() {
    const data = await this.getusers(this.state.size, this.state.num)
    const roleMap = data.data.roledoc.reduce((pre, role) => {
      pre[role._id] = role.role_name
      return pre
    }, {})
    this.setState({ roleMap })
  }
  numchange = (num) => {
    this.getusers(this.state.size, num)
    this.setState({ num })
  }
  deleteUser = (user) => {
    Modal.confirm({
      title: 'Do you want to delete ' + user.username + '?',
      icon: <ExclamationCircleOutlined />,

      onOk: async () => {
        const data = await request('/user/deleteUser', { _id: user._id }, 'post')
        this.getusers()
      },
      onCancel() { },
    });
    // console.log(user);

  }
  handleOk = async () => {

    const res = await this.form.validateFields()

    const data = await request(`/user/${this.user ? 'updateuser' : 'adduser'}`, { username: res.username, _id: this.user ? this.user._id : '1', password: res.password, roleid: res.role_id }, 'post')
    this.form.resetFields()
    this.user = null
    this.getusers()
  }
  getusers = async (size = this.state.size, num = this.state.num) => {
    this.setState({ loading: true })
    const data = await request('/user/getusers', { size, num }, 'post')
    // console.log(data);
    this.roleData = data.data.roledoc
    data.data.userdoc.map(i => i.key = i._id)
    this.setState({ visible: 0, userData: data.data.userdoc, total: data.data.total, loading: false })
    return data
  }
  render() {

    const columns = [{
      title: 'User Name',
      dataIndex: 'username',
      key: 'username',
    }, {
      title: 'Pass',
      dataIndex: 'password',
      key: 'ps',
    }, {
      title: 'Role Name',
      dataIndex: 'role_id',
      render: (roleid => this.state.roleMap[roleid]),
      key: 'role',
    }, {
      title: 'Action',
      // dataIndex: 'role_id',
      width: '232px',
      render: (user) => (<span><Button onClick={
        () => {
          this.user = user
          this.setState({ visible: 2 })
        }
      } type='primary'>Edit</Button><Button style={{ marginLeft: '5px' }} onClick={() => this.deleteUser(user)} type='primary'>Delete</Button></span>),
      key: 'role',
    }]
    const title = <span><Button type='primary' onClick={() => this.setState({ visible: 1 })}>Add User</Button></span>
    return (
      <Card title={title}  >
        <Table

          pagination={{
            onChange: this.numchange,
            total: this.state.total,
            pageSize: this.state.size,
            showSizeChanger: true,
            pageSizeOptions: ['1', '2'],
            current: this.state.num,
            showQuickJumper: true,
            // onShowSizeChange: this.sizechange
          }}
          loading={this.state.loading} bordered
          columns={columns} dataSource={this.state.userData}
        />
        <Modal
          title={this.user ? 'Edit User' : "Add User"}
          visible={this.state.visible != 0}
          onOk={this.handleOk}
          onCancel={() => {
            this.user = null
            this.setState({ visible: 0 })
          }}
        >
          <AddOrEdit getform={(form) => this.form = form} role={this.state.roleMap} user={this.user || {}}></AddOrEdit>
        </Modal>
      </Card>
    )
  }
}
