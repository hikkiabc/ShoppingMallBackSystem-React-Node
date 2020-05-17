import React, { PureComponent } from 'react'
import {
  Form,
  Tree,
  Input
} from 'antd';
import menu from '../../config/menu'

export default class set extends PureComponent {
  state = {
    menu: this.props.role.menu
  }
  // formRef = React.createRef();
  componentWillMount() {
    this.treeData = [{
      title: 'System Roles',
      key: 'tree',
      children: menu
    }]
  }
  componentDidMount() {
    this.keys = []
  }
  componentWillReceiveProps(props) {
    // console.log(props.role.menu);

    this.setState({ menu: props.role.menu })

  }
  onCheck = (keys) => {
    this.keys = keys
    // this.props.role.menu = keys
    this.setState({ menu: keys })

  }
  getkeys = () => {
    // console.log(this.keys);
    // this.setState({ menu: this.keys })
    return this.keys
  }
  finish = () => {
    // this.props.validate(1)
  }
  render() {


    return (
      <div>
        <Form>
          <Form.Item
            // name="rolename"
            label="Role Name"
          // hasFeedback
          // rules={[{ required: true, message: 'role name', whitespace: true, }]}
          >
            <Input value={this.props.role.role_name} disabled />
          </Form.Item>
        </Form>
        <Tree
          checkable
          defaultExpandAll
          // onSelect={onSelect}
          onCheck={this.onCheck}
          checkedKeys={this.state.menu}
          treeData={this.treeData}
        />
      </div>
    )
  }
}
