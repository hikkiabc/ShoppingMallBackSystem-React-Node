import React, { Component } from 'react'
import { Cascader, Button, Card, Form, Input } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import request from '../../network/network'
import Pictureswall from './pictureswall';
import RichText from './richtext'
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 9,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 13,
    span: 1,
  },
};

export default class add extends Component {
  constructor(props) {
    super(props)
    this.pw = React.createRef()
    this.richtext = React.createRef()
    this.formref = React.createRef()
  }

  state = {
    options: [],
    ll: 21

  }
  async componentDidMount() {
    this.formref.current.setFieldsValue({ detail: this.props.location.state ? this.props.location.state.detail : '' })
    const data = await request('/product/getcategory', {}, 'post')
    const options = data.data.map(i => {
      let children = []
      if (this.props.location.state && i._id == this.props.location.state.pcateid) {
        children.push({ value: this.props.location.state.cateid, label: this.props.location.state.name })
        {
          return { children, value: i._id, label: i.name, isLeaf: i.children.length != 0 ? false : true }
        }
      } else {

        return { value: i._id, label: i.name, isLeaf: i.children.length != 0 ? false : true }
      }
    })
    // if (this.props.location.state.cateid) {
    //   const data1 = await request('/product/getcategory', { _id: this.props.location.state.pcateid }, 'post')
    //   data1.data[0].children.forEach(i => {
    //     if (i._id == this.props.location.state.cateid)
    //       ccatename = i.name
    //   })

    // }

    this.setState({
      options
    })
  }
  onChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
  };
  onFinish = values => {

    // console.log(this.props.location.state);
    let pcateid = values.Category[0]
    let _id = this.props.location.state._id
    let cateid = values.Category[1] || ''

    console.log('Received values of form: ', values);
    let imgs = this.pw.current.getPics()
    let detail = this.richtext.current.getcontent()

    request('/product/updateoradd', { pcateid, _id, cateid, imgs, detail, price: values.Price, name: values.name, desc: values.Description }, 'post')

  };
  richchange = (e) => {
    if (e.length > 8)
      this.formref.current.setFieldsValue({ detail: e })
    else this.formref.current.setFieldsValue({ detail: '' })
  }
  loadData = async selectedOptions => {

    const targetOption = selectedOptions[0];
    targetOption.loading = true;
    const data = await request('/product/getcategory', { _id: targetOption.value }, 'post')
    targetOption.loading = false;


    targetOption.children = data.data[0].children.map(i => {
      return { label: i.name, value: i._id }
    })

    this.setState({
      ll: 12
    });

  };
  render() {
    const hiddenvalue = '3'
    const product = this.props.location.state || {}
    const title = <span style={{ fontSize: 20 }}><LeftOutlined onClick={() => this.props.history.goBack()} style={{ color: 'white', paddingRight: 15 }} />{this.props.location.state ? 'Edit Product' : 'Add Product'} </span>
    return (
      <Card title={title} extra={<a href="#">More</a>} style={{}}>
        <Form {...layout} name="nest-messages"
          onFinish={this.onFinish}
          ref={this.formref}
          initialValues={{
            name: product.name,
            Price: product.price,
            Description: product.desc,
            Category: [product.pcateid, product.cateid] || []
          }}>
          <Form.Item
            name='name'
            label="Product Name: "
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item rules={[
            {
              required: true,
            },
          ]} name={['Description']} label="Description:">
            <Input.TextArea autoSize={{ minRows: 2, maxRows: 5 }} />
          </Form.Item>

          <Form.Item
            name='Price'
            label="Product Price: "
            rules={[{
              required: true,
              message: 'Please input the Price',
            },
            {
              validator: (_, value) =>
                value >= 0 ? Promise.resolve() : Promise.reject('Should be more then 0')

              ,
            },
            ]}
          >

            <Input type='number' addonAfter='Dollars' />
          </Form.Item>
          <Form.Item rules={[
            {
              required: true,
            },
          ]} name='Category' label="Category:">
            <Cascader
              options={this.state.options}
              loadData={this.loadData}
              onChange={this.onChange}
            />
          </Form.Item>
          <Form.Item rules={[
            {
              // required: true,
            },
          ]} name='pictures' label="Pictures:" >
            <Pictureswall imgs={this.props.location.state ? this.props.location.state.imgs : []} ref={this.pw}></Pictureswall>
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
              },
              // {
              //   validator: async (_, value) => {

              //     if (this.richtext.current.getcontent().length != 8) {
              //       // this.formref.setFieldsValue({ detail: '1' })
              //       return Promise.resolve()
              //     }
              //     else {
              //       // await this.formref.setFieldsValue({ detail: '' })
              //       return Promise.reject('Should be more then 0')
              //     }
              //   },
              // },
            ]}
            name='detail' label="detail:"
            wrapperCol={
              { span: 15, }
            }>

            <RichText change={(f) => this.richchange(f)} detail={this.props.location.state ? this.props.location.state.detail : ''} ref={this.richtext}></RichText>
          </Form.Item>
          <Form.Item  {...tailLayout}>
            <Button style={{ transform: 'translate(-100%,0)' }} type="primary" htmlType="submit">
              Submit
        </Button>
          </Form.Item>
        </Form>
      </Card>
    )
  }
}
