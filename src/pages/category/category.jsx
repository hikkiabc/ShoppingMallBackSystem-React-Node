import React, { Component } from 'react'
import { Modal, Card, Table, Button } from 'antd';
import { SettingOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import './category.css'
import Add from './add'
import Edit from './edit'
import request from '../../network/network'

export default class category extends Component {
  state = {
    cate1data: [],
    columns: [],
    loading: true,
    size: 2,
    num: 1,
    total: 0,
    pid: 0,
    visible: 0,
    cname: '',
    alllvl1name: [],
    numbeforesub: 0

  }

  componentDidMount() {
    this.getcate1(this.state.size, this.state.num)
  }
  sizechange = (aaa, bbb) => {
    this.setState({
      size: bbb
    })
    this.getcate1(bbb, this.state.num)
  }

  showsub = (item) => {
    this.setState({ cname: item.name, pid: item._id, numbeforesub: this.state.num })
    this.getcate1(null, 1, item._id)
  }
  backfromsub = () => {
    this.setState({ pid: 0 })
    this.getcate1(this.state.size, this.state.numbeforesub)
  }
  handleOk = async () => {

    try {
      const res = await this.form.validateFields()
      if (this.state.visible == 2) {
        const name = this.form.getFieldsValue().input
        if (this.state.cname) {

          const data = await request('/cate/edit', { _id: this.state.pid, oldname: this.name, name }, 'post')

          this.getcate1(this.state.size, this.state.num, this.state.pid)
        }
        else {
          const data = await request('/cate/edit', { _id: this.id, name }, 'post')
          this.getcate1(this.state.size, this.state.num)
        }
      }
      else {

        const data = await request('/cate/add', { pid: this.form.getFieldsValue().select, name: this.form.getFieldsValue().input }, 'post')
        if (!this.state.pid) {
          this.getcate1(this.state.size, 1)
        }
        else {
          this.getcate1(null, 1, this.state.pid)
        }
      }

      this.setState({ visible: 0 })
    }
    catch (e) {
      console.log("validate fails");

    }

  }

  numchange = (page, a) => {

    if (this.state.pid) {
      this.setState({ num: page })
    }
    else
      this.getcate1(this.state.size, page)

  }
  getcate1 = async (size, num, pid) => {
    this.setState({
      loading: true
    })

    const data = await request('/cate/getcate1', { size, num, pid }, 'post')
    console.log(data);

    let total = 0
    let cate1data = []
    let source = []
    if (pid) {
      if (!data.data[0].children) {
        source = data.data
        total = this.state.total
      }

      else {
        total = data.data[0].children.length
        source = data.data[0].children
      }

      cate1data = source.map(item => {
        item.key = item.name
        return item
      })


    }
    else {
      this.alllvl1name = data.data.all.map(item => {
        return item
      })
      cate1data = data.data.doc.map(item => {
        item.key = item.name
        return item
      })
      total = data.data.total
    }
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        // render: text => <a>{text}</a>,
        width: 800
      },
      {
        title: 'Action',
        key: 'action',
        render: (item) => (
          pid ? <div>
            <Button onClick={() => {
              this.name = item.name
              this.setState({ visible: 2 })
            }} type='primary' className="color" style={{ marginRight: '22px' }}>
              <ArrowUpOutlined />
          Edit
        </Button></div> :
            <div>
              <Button onClick={() => {
                // console.log(this.form);

                this.name = item.name
                this.id = item._id
                this.setState({ visible: 2 })
              }} type='primary' className="color" style={{ marginRight: '22px' }}>
                <ArrowUpOutlined />
            Edit
          </Button>
              <Button onClick={() => { this.showsub(item) }} type='primary'>
                <ArrowDownOutlined />
            Show Sublevel
          </Button></div>
        ),
      },
    ];
    // console.log(cate1data);

    this.setState({
      cate1data, columns, loading: false, total, num,
    })


  }
  render() {


    const extra = <Button onClick={() => {
      this.setState({ visible: 1 })
    }} type='primary'><SettingOutlined key="setting" />Add</Button>
    const aa = <span><Button type='primary' onClick={this.backfromsub}>Product Category</Button> <ArrowDownOutlined /> {this.state.cname}</span>

    return (
      <Card title={this.state.cname ? aa : <Button type='primary'>Product Category</Button>} extra={extra} >
        <Table
          pagination={{
            onChange: this.numchange, total: this.state.total, pageSize: this.state.size, showSizeChanger: true, pageSizeOptions: ['1', '2'],
            current: this.state.num,
            showQuickJumper: true, onShowSizeChange: this.sizechange
          }}
          loading={this.state.loading} bordered
          columns={this.state.columns} dataSource={this.state.cate1data} />
        <Modal
          title={this.state.visible == 2 ? "Edit Category" : "Add Category"}
          visible={this.state.visible != 0}
          onOk={this.handleOk}
          onCancel={() => this.setState({ visible: 0 })}
        >
          {this.state.visible == 1 ? <Add validate={(code) => this.validate = code} pid={this.state.pid} all={this.alllvl1name} getform={(cform) => this.form = cform} ></Add> : <Edit getform={(cform) => this.form = cform} name={this.name}></Edit>}
        </Modal>
      </Card>
    )
  }
}
