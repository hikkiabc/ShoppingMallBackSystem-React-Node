import React, { Component } from 'react'
import { Modal, Card, Table, Button } from 'antd';
import request from '../../network/network'
import Add from './add'
import Set from './set'
import storage from '../../utili/storage';
import moment from 'moment'
export default class role extends Component {
  constructor() {
    super()
    this.setform = React.createRef()
  }
  state = {
    loading: false,
    num: 1,
    size: 2,
    total: 1,
    roledata: [],
    currentrole: {},
    visible: 0,
    setvisible: 0,
    loading: true
  }

  async  componentDidMount() {
    const data = await this.getroles(this.state.size, this.state.num)


    data.data.doc.forEach(i => {
      i.key = i._id
    })
    // console.log(data.data.doc);

    this.setState({ roledata: data.data.doc, total: data.data.total, loading: false })
  }
  numchange = async (page) => {
    const data = await this.getroles(this.state.size, page)
    this.setState({ roledata: data.data.doc, num: page, loading: false })
  }
  getroles = async (size, num) => {
    this.setState({ loading: true })
    const data = await request('/role/getroles', { size, num }, 'post')
    data.data.doc.forEach(i => {
      i.key = i._id
    })
    return data
  }
  sethandleOk = async () => {
    let { currentrole } = this.state
    currentrole.menu = this.setform.current.getkeys()
    // this.setState({ loading: true, currentrole })
    const username = storage.getuser().userInfo.username
    const data = await request('/role/setrole', { username, _id: this.state.currentrole._id, menu: this.setform.current.getkeys() }, 'post')
    // console.log(data);
    if (this.state.currentrole._id == storage.getuser().userInfo.role_id) {

      storage.removeuser()
      this.props.history.replace('/login')

    }
    else {
      const newdata = await this.getroles(this.state.size, this.state.num)

      this.setState({
        currentrole, setvisible: false, loading: false,
        roledata: newdata.data.doc
      })
    }

  }
  handleOk = async () => {
    const res = await this.form.validateFields()

    await request('/role/addrole', { rolename: res.rolename }, 'post')
    this.setState({ loading: false, visible: 0 })
    this.form.resetFields()
    const data = await this.getroles(this.state.size, 1)
    this.setState({ roledata: data.data.doc, total: data.data.total, loading: false, num: 1 })

  }
  render() {
    // console.log(moment(1589409277140).format("MMM Do YY"));
    const columns = [{
      title: 'Role Name',
      dataIndex: 'role_name',
      key: 'role_name',
    }, {
      title: 'Create Time',
      dataIndex: 'create_time',
      render: (time) => {

        return moment(time * 1).format("MMM Do YY")

      },
      key: 'create_time',
    }, {
      title: 'Auth Time',
      dataIndex: 'auth_time',
      render: (time) => time ? moment(time * 1).format("MMM Do YY") : 'No time',
      key: 'auth_time',
    }, {
      title: 'Authorizer',
      dataIndex: 'authorizer',
      key: 'authorizer',
    }]
    const title = <span><Button onClick={() => this.setState({ visible: 1 })} type='primary'>Create Role</Button> &nbsp;&nbsp; <Button onClick={() => this.setState({ setvisible: 1 })} type='primary' disabled={!this.state.currentrole._id}>Set Role</Button></span>
    return (
      <Card title={title}  >
        <Table
          onSelect={record => {
            console.log(record);

            this.setState({ currentrole: record })

          }}
          onRow={record => {
            return {
              onClick: event => {
                // console.log(record);

                this.setState({ currentrole: record })
              }, // 点击行


            };
          }}
          rowSelection={{
            onSelect: record => {
              // console.log(record);

              this.setState({ currentrole: record })

            },
            type: 'radio',
            selectedRowKeys: [this.state.currentrole._id]
          }}
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
          columns={columns} dataSource={this.state.roledata} />
        <Modal
          title={"Add Role"}
          visible={this.state.visible != 0}
          onOk={this.handleOk}
          onCancel={() => {
            this.form.resetFields()
            this.setState({ visible: 0 })
          }}
        >
          <Add getform={(form) => this.form = form}> </Add>
        </Modal>
        <Modal
          title={"Set Role"}
          visible={this.state.setvisible != 0}
          onOk={this.sethandleOk}
          onCancel={() => {
            // this.form.resetFields()
            // console.log(this.state.currentrole);

            this.setState({ setvisible: 0 })
          }}
        >
          <Set ref={this.setform} role={this.state.currentrole}> </Set>
        </Modal>
      </Card>
    )
  }
}
