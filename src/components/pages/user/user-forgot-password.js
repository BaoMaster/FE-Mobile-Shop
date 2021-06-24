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
import { withRouter } from 'react-router-dom';

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
class UserList extends Component {
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

  onForgotPassword = (e) => {
    console.log('e', e);
    //send code
    const obj = { email: e.email };
    this.props.checkEmail(obj).then((data) => {
      if (data.data.status === 200) {
        this.setState({ inputEmail: false, isShowSubmitCode: true, userEmail: e.email });
      } else {
        notification('error', data.data.message);
      }
    });
  };
  onSubmitCode = (e) => {
    console.log('e', e);
    ///verify code
    const obj = {
      email: this.state.userEmail,
      code: e.code,
    };
    this.props.VerifyCode(obj).then((res) => {
      if (res.data.status === 200) {
        this.setState({ isShowSubmitCode: false, isShowChangePass: true });
      } else {
        notification('error', res.data.message);
      }
    });
  };
  onChangePassword = (e) => {
    console.log('e', e);
    //
    const obj = {
      email: this.state.userEmail,
      password: e.password,
    };
    this.props.ChangePass(obj).then((res) => {
      console.log('res', res.data);
      if (res.data.status === 200) {
        this.setState({ isShowChangePass: false, isChangePassSuccess: true });
      } else {
        notification('error', res.data.message);
      }
    });
  };
  render() {
    const { inputEmail, isShowSubmitCode, isShowChangePass, isChangePassSuccess } = this.state;

    return (
      <div>
        <h1>Forgot Password</h1>
        {inputEmail ? (
          <Form onFinish={this.onForgotPassword}>
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
            <Button type='primary' htmlType='submit'>
              Send verify code
            </Button>
          </Form>
        ) : (
          ''
        )}
        {isShowSubmitCode ? (
          <div>
            <Form onFinish={this.onSubmitCode}>
              <h4>Please input code that you receive in email</h4>
              <Form.Item
                name='code'
                label='Code'
                rules={[
                  {
                    required: true,
                    message: 'Please input your Code',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Button type='primary' htmlType='submit'>
                Submit
              </Button>
            </Form>
          </div>
        ) : (
          ''
        )}
        {isShowChangePass ? (
          <div>
            <Form onFinish={this.onChangePassword}>
              <h4>Input your new password</h4>

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
                Submit
              </Button>
            </Form>
          </div>
        ) : (
          ''
        )}
        {isChangePassSuccess ? (
          <div>
            <h1>Change password success</h1>
            <Button type='primary' href='http://localhost:3000/admin/login'>
              Return the login page
            </Button>
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  deleteUser: (userId) => dispatch(userActions.deleteUser(userId)),
  updateUser: (userId, user) => dispatch(userActions.updateUser(userId, user)),
  getUserById: (userId) => dispatch(userActions.getUserById(userId)),
  addUser: (user) => dispatch(userActions.addUser(user)),
  getAllUser: (userId) => dispatch(userActions.getAllUser(userId)),
  checkEmail: (data) => dispatch(userActions.checkEmail(data)),
  VerifyCode: (data) => dispatch(userActions.verifyCode(data)),
  ChangePass: (data) => dispatch(userActions.changePass(data)),
});

export default connect(null, mapDispatchToProps)(withRouter(UserList));
