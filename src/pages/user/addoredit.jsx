import React, { Component } from 'react'
import {
  Form,
  Select,
  Input
} from 'antd';
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 18,
  },
};
export default class AddOrEdit extends Component {
  formRef = React.createRef();
  state = {
    user: {}
  }
  componentDidMount() {

    this.props.getform(this.formRef.current)
    // this.setState({ user: this.props.user })
  }

  shouldComponentUpdate(props, next) {

    if (this.props.user == props.user) {
      console.log('false');

      return false
    }
    else {
      console.log('true');
      this.formRef.current.setFieldsValue({
        username: props.user.username,
        role_id: props.user.role_id,
      });
      return true
    }

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
        initialValues={{
          username: this.props.user.username,
          role_id: this.props.user.role_id,
        }}
        {...formItemLayout}
      >

        <Form.Item
          name="username"
          label="User Name"
          // hasFeedback
          rules={[{ required: true, message: 'input user name', whitespace: true, }]}
        >
          <Input placeholder="Please input user name" />
        </Form.Item>
        {this.props.user._id ? null : (<Form.Item
          name="password"
          label="Password"
          // hasFeedback
          rules={[{ required: true, message: 'input user name', whitespace: true, }]}
        >
          <Input placeholder="Please input user name" />
        </Form.Item>)}

        <Form.Item
          name="role_id"
          label="Role Name"
          // hasFeedback
          rules={[{ required: true, message: 'input user name', whitespace: true, }]}
        >
          <Select placeholder="Please Select">
            {Object.keys(this.props.role).map(i => <Option key={i} value={i}>{this.props.role[i]}</Option>)}
          </Select>
        </Form.Item>
      </Form>
    )
  }
}
