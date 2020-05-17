import React, { Component } from 'react'
import './style.css'
import { Link } from 'react-router-dom'
import request from '../../network/network'
import { Pagination, Table, Card, Input, Select, Button } from 'antd';
import { VerticalAlignTopOutlined } from '@ant-design/icons';
const { Option } = Select;
const { Search } = Input;
export default class index extends Component {
  state = {
    dataSource: [],
    columns: [],
    num: 1,
    size: 5,
    total: 0,
    loading: true,
    type: 'name',
    keywords: '',
    loading: true
  }

  componentDidMount() {
    this.getproducts(this.state.num, this.state.size)
  }
  search = () => {

    this.setState({
      keywords: this.refs.search.state.value, num: 1
    })
    this.getproducts(1, this.state.size, this.state.type, this.refs.search.state.value)
  }
  onchange = (num, size) => {
    this.getproducts(num, this.state.size, null, this.state.keywords)
  }
  sizechange = (current, size) => {
    this.getproducts(this.state.num, size, null, this.state.keywords)
  }
  // inputchange = (e) => {
  //   console.log(e);

  // }
  list = async (product) => {
    this.setState({ loading: true })
    const data = await request('/product/productupdate', { _id: product._id, status: product.status }, 'post')
    this.getproducts(this.state.num, this.state.size)


  }
  getproducts = async (num, size, type, keywords) => {
    let data
    this.setState({ loading: true })
    if (keywords) {

      data = await request('/product/search', { num, size, type: this.state.type, keywords }, 'post')
    }
    else { data = await request('/product/getproducts', { num, size }, 'post') }

    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      // key: 'name'
    }
      , {
      title: 'Description',
      dataIndex: 'desc',

    }, {
      title: 'Price',
      dataIndex: 'price',

    }, {
      width: 100,
      title: 'Status',
      // dataIndex: 'status',
      render: (product) => {
        return (
          product.status == 1 ? <div>For sale<Button onClick={() => this.list(product)} type='primary'>Delist</Button></div> : <div>Not for sale<Button onClick={() => this.list(product)} type='primary'>List</Button></div>

        )
      }
    }, {
      width: 100,
      title: 'Action',
      // dataIndex: 'price',
      render: (product) =>
        (<span>
          <Button onClick={() => this.props.history.push('/product/detail', product)} size='small' style={{ marginBottom: '15px' }} type='primary'>Detail</Button>
          <Button onClick={() => this.props.history.push('/product/add', product)} size='small' type='primary'>Edit</Button>
        </span>)
    },
    ]
    this.setState({
      dataSource: data.data.doc, columns, total: data.data.total, num, size, loading: false
    })

  }

  render() {

    const extra = (<span><Button onClick={() => this.props.history.push('/product/add')} icon={<VerticalAlignTopOutlined />} type='primary'>Add Product</Button></span>)
    const title = (<span> <Select onChange={(type) => this.setState({ type })
    } defaultValue={this.state.type} style={{ width: 160 }} >
      <Option value="name">Search by name</Option>
      <Option value="desc">Search by desc</Option>

    </Select>
      {/* <Search
        placeholder="input search text"
        enterButton="Search"
        style={{ width: '190px' }}
        onSearch={value => console.log(value)}
      /> */}
      <Input ref='search' allowClear style={{ margin: '0 20px', width: '160px' }} placeholder='input keywords'>

      </Input>
      <Button type='primary' onClick={this.search}>Search</Button>
    </span>)
    return (
      <Card title={title} extra={extra} style={{}}>
        <Table loading={this.state.loading} pagination={{
          current: this.state.num, pageSize: this.state.size,
          onChange: this.onchange, showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`, total: this.state.total, showSizeChanger: true, pageSizeOptions: ['3', '5', '10'], onShowSizeChange: this.sizechange
        }} bordered rowKey='_id' dataSource={this.state.dataSource} columns={this.state.columns} />
      </Card>
    )
  }
}
