import React, { Component } from 'react'
import {
  Form,
  Select,
  Input
} from 'antd';
// const { Option } = Select;
const formItemLayout = {
  labelCol: {
    span: 5,
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
    // this.props.validate(1)
  }
  render() {
    // console.log(this.props);

    return (
      <Form
        // onFinish={this.finish}
        ref={this.formRef} style={{ marginLeft: '30px' }}
        name="validate_other"

        {...formItemLayout}
      >

        <Form.Item
          name="rolename"
          label="Role Name"
          // hasFeedback
          rules={[{ required: true, message: 'role name', whitespace: true, }]}
        >
          <Input placeholder="Please input role name" />
        </Form.Item>
      </Form>
    )
  }
}
