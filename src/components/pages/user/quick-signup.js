import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { SearchOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  Menu,
  message,
  Modal,
  Row,
  SearchBox,
  Select,
  Space,
  Switch,
  Table,
  Tabs,
  Upload,
} from 'antd';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';

import notification from '../../../helper/Notification';
import userActions from '../../../redux/user/actions';

// import CreateOrUpdateUser from "./CreateOrUpdateCompany.js";
// import TableRow from "./TableRow";
const { confirm } = Modal;
const { Option } = Select;
const { RangePicker } = DatePicker;

const { Search } = Input;

const { TabPane } = Tabs;

const formItemProp = {
  labelAlign: 'left',
  // labelCol: { span: 11 },
};

const labelItem = {
  labelCol: { span: 8 },
};
const menu = (
  <Menu>
    <Menu.Item value='ADMIN'>Admin</Menu.Item>
    <Menu.Item value='USER'>User</Menu.Item>
  </Menu>
);
class QuickSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputEmail: true,
      isShowSubmitCode: false,
      isShowChangePass: false,
      isChangePassSuccess: false,
      userEmail: null,
    };
  }
  componentDidMount() {}

  onSignUp = async (e) => {
    const obj = {
      username: e.userName,
      email: e.email,
      password: e.password,
    };
    await this.props.registerUser(obj).then((res) => {
      console.log('res', res.data);
      if (res.data.statusCode === 200) {
        notification('success', 'SignUp successfully');

        this.props.history.push('/admin/login');
      } else {
        notification('error', res.data.message);
      }
    });
  };
  render() {
    const { inputEmail, isShowSubmitCode, isShowChangePass, isChangePassSuccess } = this.state;

    return (
      <div>
        <h1>Quick SignUp</h1>
        {inputEmail ? (
          <Form onFinish={this.onSignUp}>
            <Form.Item
              name='userName'
              label='User Name'
              rules={[
                {
                  required: true,
                  message: 'Please input your UserName',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name='email'
              label='Email'
              rules={[
                {
                  required: true,
                  message: 'Please input your Email',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name='password'
              label='Password'
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name='confirm'
              label='Confirm Password'
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Button type='primary' htmlType='submit'>
              SignUp
            </Button>
          </Form>
        ) : (
          ''
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  registerUser: (data) => dispatch(userActions.addUser(data)),
});

export default connect(null, mapDispatchToProps)(withRouter(QuickSignUp));
