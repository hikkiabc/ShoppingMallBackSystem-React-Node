import React, { Component } from 'react'
import {
  Form,
  Select,
  Input, Button,
} from 'antd';
// import PropTypes from 'prop-types'
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 18,
  },
};

export default class edit extends Component {
  formRef = React.createRef();
  state = {

  }

  componentDidMount() {

    this.props.getform(this.formRef.current)
  }
  shouldComponentUpdate(nextProps, nextState) {

    this.props.getform(this.formRef.current)
    this.formRef.current.setFieldsValue({
      input: nextProps.name,
    });
    return false
  }

  render() {

    return (
      <Form ref={this.formRef} style={{ marginLeft: '30px' }}
        name="validate_other"
        // onFinish={onFinish}
        initialValues={{
          'input': this.props.name
        }}

        {...formItemLayout}
      >

        <Form.Item

          name="input"
          label="Name"
          // hasFeedback
          rules={[{ required: true, message: 'Please input name' }]}
        >
          <Input placeholder="Please input  name" />
        </Form.Item>

      </Form>


    )
  }
}
