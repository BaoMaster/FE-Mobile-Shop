import {
  CheckOutlined,
  CloseOutlined,
  ExclamationCircleOutlined,
  LoadingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MessageOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Button, DatePicker, Dropdown, Form, Input, Layout, Menu, message, Modal, Row, Select, Space, Upload } from 'antd';
import jwt_decode from 'jwt-decode';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';

import * as authActions from '../actions/auth';
import SideNav from '../components/layouts/sidebar';
import Login from '../components/pages/login.admin';
import Test from '../components/pages/Messages/list-user';
import ChatList from '../components/pages/Messages/list-user';
import Message from '../components/pages/Messages/mess';
import OrderList from '../components/pages/orderList';
import ProductType from '../components/pages/product-type';
import ProductList from '../components/pages/productList';
import Register from '../components/pages/register.admin';
import MonthlyRevenue from '../components/pages/Statistical/monthlyRevenue';
import ProductOfMonth from '../components/pages/Statistical/productOfMonth';
import ProductOfYear from '../components/pages/Statistical/productOfYear';
import Revenue from '../components/pages/Statistical/revenue';
import QuickSignUp from '../components/pages/user/quick-signup';
import ForgotPassword from '../components/pages/user/user-forgot-password';
import UserList from '../components/pages/userList';
import PrivateRoute from '../components/privateRoute';
import LocalStorageService from '../config/LocalStorageService';
import notification from '../helper/Notification';
import Home from '../Home/Home';
import Footer from '../Home/Home_components/Footer_components/Footer';
import Header_bottom from '../Home/Home_components/Header_components/Header_bottom';
import Header_middle from '../Home/Home_components/Header_components/Header_middle';
import Header_top from '../Home/Home_components/Header_components/Header_top';
import Slider from '../Home/Home_components/Slider_components/Slider';
import Cart from '../Home/layouts/Cart';
import Not_found from '../Home/layouts/Not_found';
import user from '../image/no-avatar.png';
import userActions from '../redux/user/actions';
import RedirectIfUserAuth from './RedireactIfUserAuth';
import RedirectIfAuth from './RedirectIfAuth';

// import Form from '../components/pages/form';
const { Option } = Select;

// import message from '../components/pages/chat'
const { Header, Sider, Content } = Layout;
const { confirm } = Modal;
const formItemProp = {
  labelAlign: 'left',
  // labelCol: { span: 11 },
};

const labelItem = {
  labelCol: { span: 8 },
};
const ApplicationRoutes = (props) => {
  const { isAuthenticated, username } = props.auth;
  const [collapse, setCollapse] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowChangePass, setIsShowChangePass] = useState(false);
  const [userData, setUserData] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState(null);
  let history = useHistory();

  const dispatch = useDispatch();
  useEffect(() => {
    window.innerWidth <= 760 ? setCollapse(true) : setCollapse(false);
    dispatch({ type: authActions.CHECK_AUTH });
  }, []);

  const handleToggle = (event) => {
    event.preventDefault();
    collapse ? setCollapse(false) : setCollapse(true);
  };

  const logout = () => {
    localStorage.removeItem('auth');
    localStorage.removeItem('userauth');

    props.logout();
  };
  const info = async (userId) => {
    await props.getUserById(userId).then(async (res) => {
      await setUserData(res.data);
      await setAvatar(res.data.avatar);

      return null;
    });
  };
  const openModal = () => {
    setIsShowModal(true);
  };
  const showConfirm = () => {
    confirm({
      title: 'This action will log out of the account',
      icon: <ExclamationCircleOutlined />,
      content: 'are you sure ?',
      okText: 'Logout',
      onOk() {
        localStorage.removeItem('auth');
        notification('success', `Logout Successfully`, '');

        window.location.reload();
      },
      onCancel() {},
    });
  };
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  const handleChange = (info) => {
    // this.setState({ isChange: true });
    if (info.file.status === 'uploading') {
      // this.setState({ loading: true });
      // console.log("info:", info.file.response.name);
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // this.setState({
      //   // loading: true,
      //   avatar: info.file.response.name,
      // });
      setAvatar(info.file.response.name);
      getBase64(info.file.originFileObj, (imageUrl) => setImageUrl(imageUrl));
    }
  };
  const showUserProfile = async () => {
    const userId = await jwt_decode(localStorage.getItem('auth')).id;
    console.log('userId', userId);
    await info(userId).then(() => {
      openModal();
    });
  };
  const showChangePassword = async () => {
    const userId = await jwt_decode(localStorage.getItem('auth')).id;
    console.log('userId', userId);
    await info(userId).then(() => {
      setIsShowChangePass(true);
    });
  };
  const handleCancel = () => {
    setIsShowModal(false);
    setImageUrl(null);
    setAvatar(null);
  };
  const handleCancelChangePass = () => {
    setIsShowChangePass(false);
  };
  const onChangePassword = async (e) => {
    const obj = {
      email: userData.email,
      currentPassword: e.currentPassword,
      newPassword: e.newPassword,
    };
    await props.ChangePass(obj).then((res) => {
      if (res.data.status === 200) {
        notification('success', `Change password Successfully`, '');
        setIsShowChangePass(false);
      } else {
        notification('error', res.data.message, '');
      }
    });
  };
  const onUpdateUser = async (e) => {
    const userId = await jwt_decode(localStorage.getItem('auth')).id;
    const obj = {
      username: e.username,
      email: e.email,
      avatar: avatar,
      phoneNumber: userData.phoneNumber,
      address: userData.address,
    };
    await props.updateUser(userId, obj).then((data) => {
      if (data.status === 200) {
        notification('success', `Update Successfully`, '');
      }
    });
    console.log('e', e);
  };
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };
  const cancel = () => {
    console.log('false');
    setVisible(true);
  };
  const menu = (
    <Menu>
      <Menu.Item>
        <a onClick={showUserProfile}>User Profile</a>
        <a onClick={showChangePassword}>Change password</a>
        <a onClick={showConfirm}>Logout</a>
      </Menu.Item>
    </Menu>
  );
  const mess = <ChatList style={{ backgroundColor: 'black' }} />;
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <>
      <React.Fragment>
        <Router>
          <Route exact path='/'>
            <Redirect to='/admin/userlist' />
          </Route>
          {/* <Route exact path='/:brand' component={Home} />

          <RedirectIfUserAuth exact path='/shop/login' component={Home}>
            <Login />
          </RedirectIfUserAuth>
          <Route exact path='/detail/:id' component={Home} />
          <Route exact path='/verify/:id' component={Home} />
          <Route exact path='/orderhistory/:id' component={Home} />
          <Route exact path='/search/:keyword' component={Home} />
          <Route path='/shop/checkout' exact component={Home} />
          <Route path='/shop/aboutus' exact component={Home} /> */}
          <Route path='/shop/cart' component={Home} />
          {/* <Route component={Not_found} /> */}
          <Route
            path={'/admin'}
            render={() => (
              <Layout>
                <Sider>
                  <SideNav />
                </Sider>
                <Layout>
                  <Header className='siteLayoutBackground' style={{ padding: 0, background: '#001529' }}>
                    <p style={{ color: '#fff', marginLeft: '70%' }}>
                      {/* {username ? username : 'You are not login'} */}
                      {isAuthenticated ? (
                        // <Button className='btn-delete' type='danger' onClick={logout}>
                        //   Logout
                        // </Button>
                        <>
                          <Dropdown overlay={menu} placement='bottomCenter' arrow trigger={['click']}>
                            <img style={{ width: '50px' }} src={user}></img>
                          </Dropdown>
                          <Dropdown overlay={mess} trigger={['click']} placement='bottomCenter' arrow style={{ size: '50px' }}>
                            <Button style={{ marginLeft: '15px', borderRadius: '50px', height: '48px' }}>
                              <MessageOutlined style={{ fontSize: '20px' }} />
                            </Button>
                          </Dropdown>
                          {/* <Button onClick={() => setVisible(true)}>Message</Button>
                          {visible ? <Message visible={visible} /> : ''} */}
                        </>
                      ) : (
                        'You are not login'
                      )}
                    </p>
                  </Header>
                  <Content
                    style={{
                      margin: '24px 16px',
                      padding: 24,
                      minHeight: 'calc(100vh - 114px)',
                      background: '#fff',
                    }}
                  >
                    <Switch>
                      <RedirectIfAuth exact path='/admin/login'>
                        <Login />
                      </RedirectIfAuth>
                      <RedirectIfAuth exact path='/admin/forgot-password'>
                        <ForgotPassword />
                      </RedirectIfAuth>
                      <RedirectIfAuth exact path='/admin/quick-signup'>
                        <QuickSignUp />
                      </RedirectIfAuth>
                      <PrivateRoute exact path='/admin/userlist' component={UserList} />
                      <PrivateRoute path='/admin/productlist' component={ProductList} />
                      <PrivateRoute path='/admin/orderlist' component={OrderList} />
                      <PrivateRoute path='/admin/product-type' component={ProductType} />
                      <PrivateRoute path='/admin/revenue' component={Revenue} />
                      <PrivateRoute path='/admin/monthly-revenue' component={MonthlyRevenue} />
                      <PrivateRoute path='/admin/product-of-month' component={ProductOfMonth} />
                      <PrivateRoute path='/admin/product-of-year' component={ProductOfYear} />
                      <PrivateRoute path='/admin/message' component={Message} />
                      <PrivateRoute path='/admin/test-mess' component={Test} />
                      {/* <PrivateRoute path='/admin/forgot-password' component={ForgotPassword} /> */}
                      {/* <PrivateRoute path='/admin/chat/' component={Chat} /> */}
                      <Route path='/admin/register' component={Register} />
                      {/* <Route exact path="/admin/bao">
                      <Redirect to="/admin/login"></Redirect>
                    </Route> */}
                      <Redirect from='/admin' to='/admin/login' />
                      {/* <Route path="/list" component={List} /> */}
                      {/* <Route path='/form' component={Form} /> */}
                    </Switch>
                  </Content>
                </Layout>
              </Layout>
            )}
          />
          {/* <Route component={Home} /> */}
        </Router>
      </React.Fragment>
      <Modal
        className='company-details'
        title={'Update User'}
        visible={isShowModal}
        // onOk={this.handleOk}
        onCancel={handleCancel}
        okButtonProps={{ style: { display: 'none' } }}
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        <Form
          // layout="vertical"
          onFinish={onUpdateUser}
          initialValues={{
            // employeeId: employeeId,
            username: userData.username,
            email: userData.email,
            phoneNumber: userData.phoneNumber,
            address: userData.address,
            role: userData.role,
            // dayOfBirth: moment(userData.dayOfBirth).format('YYYY-MM-DD'),
            idverify: userData.idverify,
            // firstname: firstname,
            // lastname: lastname,
            password: userData.email,
          }}
        >
          <Form.Item {...formItemProp} {...labelItem} label='Avatar'>
            <Upload
              name='image'
              listType='picture-card'
              className='avatar-uploader'
              showUploadList={false}
              action='http://localhost:8080/post'
              headers={{
                authorization: `Bearer ${LocalStorageService.getAccessToken()}`,
              }}
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imageUrl !== null ? (
                <img src={imageUrl} alt='image' style={{ width: '100%' }} />
              ) : avatar ? (
                <img src={`http://localhost:8080/images/user/${avatar}`} alt='image' style={{ width: '100%' }} />
              ) : (
                uploadButton
              )}
            </Upload>
          </Form.Item>
          <Form.Item
            {...formItemProp}
            {...labelItem}
            name='username'
            label='User Name'
            rules={[
              {
                required: true,
                message: 'Please input your user name',
              },
            ]}
          >
            <Input
              disabled
              // onChange={this.onChange}
              // disabled={this.state.userId ? true : false}
            />
          </Form.Item>

          <Form.Item
            {...formItemProp}
            {...labelItem}
            name='email'
            label='Email'
            rules={[
              {
                required: true,
                message: 'Please input your Email',
              },
            ]}
          >
            <Input
              disabled
              //  onChange={this.onChangeCheck}
              // disabled={this.state.userId ? true : false}
            />
          </Form.Item>

          <Form.Item
            {...formItemProp}
            {...labelItem}
            name='phoneNumber'
            label='Phone Number'
            rules={[
              {
                required: true,
                message: 'Please input your Email',
              },
            ]}
          >
            <Input
            // onChange={this.onChangeCheck}
            />
          </Form.Item>

          <Form.Item
            {...formItemProp}
            {...labelItem}
            name='address'
            label='Address'
            rules={[
              {
                required: true,
                message: 'Please input your Address',
              },
            ]}
          >
            <Input
            // onChange={this.onChangeCheck}
            />
          </Form.Item>

          <Form.Item
            placeholder='Select a person'
            {...formItemProp}
            {...labelItem}
            name='role'
            label='Role'
            rules={[
              {
                required: true,
                message: 'Please select your Role',
              },
            ]}
          >
            <Select
              disabled
              showSearch
              style={{ width: 145 }}
              placeholder='Select a Role'
              optionFilterProp='children'
              filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              // onChange={this.onChangeCheck}
            >
              <Option value='ADMIN'>Admin</Option>
              <Option value='USER'>User</Option>
            </Select>
          </Form.Item>

          <Row justify='end'>
            <Space>
              <Button
                htmlType='button'
                // onClick={this.handleCancel}
              >
                Cancel
              </Button>
              <Button
                type='primary'
                htmlType='submit'
                // loading={this.state.updateLoading}
              >
                OK
              </Button>
            </Space>
          </Row>
        </Form>
      </Modal>
      <Modal
        className='company-details'
        title={'Change Password'}
        visible={isShowChangePass}
        // onOk={this.handleOk}
        onCancel={handleCancelChangePass}
        okButtonProps={{ style: { display: 'none' } }}
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        <Form onFinish={onChangePassword}>
          <Form.Item
            name='currentPassword'
            label='Current password'
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
            name='newPassword'
            label='New Password'
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
            label='Confirm new password'
            dependencies={['newPassword']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
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
      </Modal>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkAuth: () => dispatch(userActions.checkAuth()),
    logout: () => dispatch(userActions.logout()),
    getUserById: (userId) => dispatch(userActions.getUserById(userId)),
    updateUser: (userId, data) => dispatch(userActions.updateUser(userId, data)),
    ChangePass: (data) => dispatch(userActions.changePassCheck(data)),
  };
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationRoutes);
