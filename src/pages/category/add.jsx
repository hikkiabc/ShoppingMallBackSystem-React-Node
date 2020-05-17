import React, { Component } from 'react'
import {
  Form,
  Select,
  Input
} from 'antd';
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 18,
  },
};
export default class add extends Component {
  formRef = React.createRef();

  componentDidMount() {


    this.props.getform(this.formRef.current)


  }
  finish = () => {
    console.log('f');

    this.props.validate(1)
  }
  render() {
    // console.log(this.props);

    return (
      <Form
        onFinish={this.finish}
        ref={this.formRef} style={{ marginLeft: '30px' }}
        name="validate_other"
        // onFinish={onFinish}
        initialValues={{
          'input': this.props.name,
          'select': this.props.pid || '0'
        }}
        {...formItemLayout}
      >

        <Form.Item
          name="select"
          label="Category"
          // hasFeedback
          rules={[{ required: true, message: 'Please select category' }]}
        >
          <Select placeholder="Please select a Category">
            <Option value="0">Level One</Option>
            {this.props.all.map(item => {
              return <Option key={item._id} value={item._id}>{item.name}</Option>
            })}
          </Select>
        </Form.Item>
        <Form.Item
          name="input"
          label="Name"
          // hasFeedback
          rules={[{ required: true, message: 'Please input name', whitespace: true, }]}
        >
          <Input placeholder="Please input your name" />
        </Form.Item>
      </Form>
    )
  }
}
