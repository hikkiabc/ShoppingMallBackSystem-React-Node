import React, { Component } from 'react'
import { Card, List } from 'antd';
import request from '../../network/network'
import { LeftOutlined } from '@ant-design/icons';
export default class detail extends Component {
  state = {
    pcname: '',
    cname: ''
  }
  async componentDidMount() {
    const data = await request('/product/getcatename', { id: this.props.location.state.cateid }, 'post')
    this.setState({
      pcname: data.data[0].name,
      cname: data.data[0].children.name
    })

  }
  render() {
    // console.log(this.props.location.state);

    const { catename, pcatename, price, desc, detail, name } = this.props.location.state

    const title = <span style={{ fontSize: 20 }}><LeftOutlined onClick={() => this.props.history.goBack()} style={{ color: 'white', paddingRight: 15 }} /> Product Detail</span>
    const data = [
      <span><span style={{ fontSize: '22px', marginRight: '15px', fontWeight: 'bold' }}>Product Name:</span>
        <span>This is Name</span></span>
      , <span><span>Product Price:</span>
        <span>{price}</span></span>,
      <span><span>Product Description:</span>
        <span>{desc}</span></span>,
      <span><span>Product Detail:</span>
        <span dangerouslySetInnerHTML={{ __html: detail }}></span></span>, <span><span>Product Category:</span>
        <span> {pcatename}>>>{catename}</span></span>,

    ];
    return (
      <Card title={title} extra={<a href="#">More</a>} style={{}}>
        <List
          header={<div>Header</div>}
          // footer={<div>Footer</div>}
          bordered
          dataSource={data}
          renderItem={item => (
            <List.Item>
              {item}
            </List.Item>
          )}
        />
      </Card>
    )
  }
}
