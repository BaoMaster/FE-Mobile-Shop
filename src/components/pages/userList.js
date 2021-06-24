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

import LocalStorageService from '../../config/LocalStorageService';
import notification from '../../helper/Notification';
import userActions from '../../redux/user/actions';
import ChatBox from '../pages/Messages/mess';

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
  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button type='primary' onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)} icon={<SearchOutlined />} size='small' style={{ width: 90 }}>
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size='small' style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) => (record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : ''),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      ...this.getColumnSearchProps('username'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      ...this.getColumnSearchProps('email'),
    },
    {
      title: 'Role',
      key: 'role',
      dataIndex: 'role',
    },

    {
      title: 'IsVerify',
      dataIndex: 'idverify',
      render: (data) => {
        return <span>{data ? <CheckOutlined style={{ color: 'green' }} /> : <CloseOutlined style={{ color: 'red' }} />}</span>;
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (com) => {
        return (
          // <Space size="middle">
          <div>
            <Button className='btn-delete' type='danger' onClick={() => this.handleToggleDeletedModal(true, com.id)}>
              Delete
            </Button>

            <Button className='btn-update' type='primary' onClick={() => this.handleUpdate(com.id)}>
              Update
            </Button>
            <Button className='btn-update' type='primary' onClick={() => this.handleChat(com.id)}>
              Chat
            </Button>
          </div>
          //   </Space>
        );
      },
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      persons: [],
      isShowModal: false,
      userId: null,
      users: [],
      usersInTable: [],
      idverify: false,
      totalItem: 0,
      visibleDelete: false,
      userIdDelete: null,
      searchInput: '',
      username: '',
      email: '',
      password: '',
      avatar: undefined,
      phoneNumber: '',
      address: '',
      dayOfBirth: '',
      errors: {},
      loading: false,
      imageUrl: null,
      role: '',
      tempSearch: [],
      isChangeModal: false,
      isChange: false,
      userData: [],
      userUpdateData: [],
      isChat: false,
      searchText: '',
      searchedColumn: '',
      userName: '',
    };
  }
  componentDidMount() {
    this.getUser();
  }

  handleToggleDeletedModal = (isShow, id = 0) => {
    this.setState({
      ...this.state,
      userIdDelete: id,
      visibleDelete: isShow,
    });
  };
  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  beforeUpload = (file) => {
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
  handleChange = (info) => {
    this.setState({ isChange: true });
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      // console.log("info:", info.file.response.name);
      return;
    }
    if (info.file.status === 'done') {
      this.setState({
        // loading: true,
        avatar: info.file.response.name,
      });
      this.getBase64(info.file.originFileObj, (imageUrl) =>
        this.setState({
          imageUrl,
          loading: false,
        })
      );
    }
  };

  getUser = async () => {
    const userId = await jwt_decode(localStorage.getItem('auth')).id;
    await this.props
      .getAllUser(userId)
      // await axios
      //   .get('http://localhost:8080/api/get-all')
      .then((response) => {
        console.log(response.data);
        this.setState({
          users: response.data,
          usersInTable: response.data,
          tempSearch: response.data,
          idverify: response.data.idverify,
        });
        const { users } = this.state;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  handleUpdate = (userId) => {
    this.props.getUserById(userId).then((res) => {
      this.setState(
        {
          password: res.data.password,
          address: res.data.address,
          avatar: res.data.avatar,
          dayOfBirth: res.data.dayOfBirth !== null ? moment(res.data.dayOfBirth) : '',
          email: res.data.email,
          phoneNumber: res.data.phoneNumber,
          role: res.data.role,
          username: res.data.username,
          idverify: res.data.idverify,
          userData: res.data,
        },
        () => {
          this.setState({ isShowModal: true, userId: userId });
        }
      );
    });
  };
  handleChat = (id) => {
    this.props.getUserById(id).then((res) => {
      console.log('re', res.data);
      this.setState({
        userName: res.data.username,
        isChat: true,
        userId: id,
      });
    });
  };

  handleModal = () => {
    this.setState({ isShowModal: true });
    this.cleanData();
  };

  handleDelete = (userId) => {
    this.props.deleteUser(userId).then((res) => {
      if (res.data.status === 200) {
        this.getUser();
        this.handleToggleDeletedModal(false, 0);
        notification('success', `Delete User Account Successfully`, '');
      }
    });
  };

  handleOk = async () => {
    if (this.state.userId) {
      const obj = {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        role: this.state.role,
        avatar: this.state.avatar,
        phoneNumber: this.state.phoneNumber,
        address: this.state.address,
        dayOfBirth: this.state.dayOfBirth,
      };
      await this.props.updateUser(this.state.userId, obj).then((res) => {
        if (res.data.status === 'success') {
          this.getUser();
          this.setState({ isShowModal: false });
          notification('success', `Update User Successfully`, '');
        }
      });
    } else {
      const obj = {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        role: this.state.role,
        avatar: this.state.avatar,
        phoneNumber: this.state.phoneNumber,
        address: this.state.address,
        dayOfBirth: this.state.dayOfBirth,
      };
      await this.props.addUser(obj).then((res) => {
        if (res.data.status === 'success') {
          this.getUser();
          this.handleToggleDeletedModal(false, 0);
          notification('success', `Add User Successfully`, '');
          this.setState({ isShowModal: false });
        }
      });
    }
  };
  cleanData = () => {
    this.setState({
      userId: '',
      address: '',
      avatar: '',
      dayOfBirth: '',
      email: '',
      phoneNumber: '',
      role: '',
      username: '',
    });
  };
  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value, isChange: true });
  };
  onChangeCheck = () => {
    this.setState({ isChange: true });
  };
  onChangeRole(e) {
    this.setState({
      role: e.target.value,
      isChange: true,
    });
  }
  handleCancel = (e) => {
    const { userData, userUpdateData, isChange } = this.state;
    let check = false;
    console.log('userData', userData);
    console.log('userUpdateData', userUpdateData);
    if (
      userData.address !== userUpdateData.address ||
      userData.idverify !== userUpdateData.idverify ||
      userData.phoneNumber !== userUpdateData.phoneNumber ||
      userData.role !== userUpdateData.role
    ) {
      console.log(1);
      check = true;
    }
    if (userData.dayOfBirth !== userUpdateData.dayOfBirth) {
      if (userData.dayOfBirth === null && userUpdateData.dayOfBirth === '') {
      } else {
        console.log(2);
        check = true;
      }
    }
    if (isChange) {
      this.setState({ isChange: true, isChangeModal: true });
    } else {
      this.setState({ isShowModal: false, imageUrl: null });
    }
  };
  handleClickCloseUpdate = () => {
    this.setState({ isChangeModal: false });
  };
  handleUpdateCancel = () => {
    this.setState({ isShowModal: false, isShowModal: false, imageUrl: null, isChangeModal: false });
  };
  handleClickCloseChat = () => {
    this.setState({ isChat: false });
  };
  handelUpdateOk = async () => {
    await this.onUpdateUser();
    this.setState({ isChangeModal: false, isShowModal: false });
  };
  onSearch = (value) => {
    const { usersInTable, tempSearch } = this.state;
    if (tempSearch.length) {
      const arr = [];
      if (value.length) {
        for (const i of tempSearch) {
          if (i.username.includes(value) || i.email.includes(value)) {
            arr.push(i);
          }
        }
        this.setState({ usersInTable: arr });
      } else {
        this.setState({ usersInTable: tempSearch });
      }
    }
  };
  onUpdateUser = async (value) => {
    this.setState({ userUpdateData: value });

    if (this.state.userId) {
      console.log('rwee', value);
      value.avatar = this.state.avatar;
      await this.props.updateUser(this.state.userId, value).then(async (res) => {
        if (res.data.status === 200) {
          await this.getUser();
          this.setState({ isShowModal: false });
          notification('success', `Update User Successfully`, '');
        }
      });
    } else {
      value.avatar = this.state.avatar;
      if (value.dayOfBirth === '') {
        value.dayOfBirth = null;
      }

      await this.props.addUser(value).then(async (res) => {
        if (res.data.status === 200) {
          await this.getUser();
          this.handleToggleDeletedModal(false, 0);
          notification('success', `Add User Successfully`, '');
          this.setState({ isShowModal: false });
        }
      });
    }
  };

  render() {
    const { loading, imageUrl, password, email, username, address, dayOfBirth, role, avatar, phoneNumber, idverify } = this.state;
    console.log('id', idverify);
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <div>
        <Card
          header={{ title: 'Companies' }}
          extra={
            <>
              <Search placeholder='Search users' onSearch={this.onSearch} style={{ width: 200 }} />

              <React.Fragment>
                <Button className='btn-add' type='primary' onClick={this.handleModal}>
                  Add User
                </Button>
              </React.Fragment>
            </>
          }
        >
          <Modal
            title='Are you sure?'
            visible={this.state.visibleDelete}
            onOk={() => this.handleDelete(this.state.userIdDelete)}
            okType={'danger'}
            onCancel={() => this.handleToggleDeletedModal(false, this.state.userIdDelete)}
          >
            <p>Do you really want to delete this account?</p>
          </Modal>

          <Table columns={this.columns} dataSource={this.state.usersInTable} rowKey={(item) => item.userId} />
        </Card>
        {this.state.isShowModal && (
          <>
            <Modal
              className='company-details'
              title={this.state.userId ? 'Update User' : 'Add New User'}
              visible={this.state.isShowModal}
              // onOk={this.handleOk}
              onCancel={this.handleCancel}
              okButtonProps={{ style: { display: 'none' } }}
              cancelButtonProps={{ style: { display: 'none' } }}
            >
              <Form
                // layout="vertical"
                onFinish={this.onUpdateUser}
                initialValues={{
                  // employeeId: employeeId,
                  username: username,
                  email: email,
                  phoneNumber: phoneNumber,
                  address: address,
                  role: role,
                  idverify: idverify,
                  // firstname: firstname,
                  // lastname: lastname,
                  password: email,
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
                    beforeUpload={this.beforeUpload}
                    onChange={this.handleChange}
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
                  <Input onChange={this.onChange} disabled={this.state.userId ? true : false} />
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
                  <Input onChange={this.onChangeCheck} disabled={this.state.userId ? true : false} />
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
                  <Input onChange={this.onChangeCheck} />
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
                  <Input onChange={this.onChangeCheck} />
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
                    showSearch
                    style={{ width: 145 }}
                    placeholder='Select a Role'
                    optionFilterProp='children'
                    filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    onChange={this.onChangeCheck}
                  >
                    <Option value='ADMIN'>Admin</Option>
                    <Option value='USER'>User</Option>
                  </Select>
                </Form.Item>

                <Form.Item {...formItemProp} {...labelItem} name='idverify' label='Verify'>
                  <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined onChange={this.onChangeCheck} />} defaultChecked={idverify} />
                </Form.Item>
                {!this.state.userId && (
                  <Form.Item
                    {...formItemProp}
                    {...labelItem}
                    name='password'
                    label='Password'
                    rules={[
                      {
                        required: true,
                        message: 'Please input your password!',
                      },
                    ]}
                  >
                    <Input.Password onChange={this.onChangeCheck} />
                  </Form.Item>
                )}
                <Row justify='end'>
                  <Space>
                    <Button htmlType='button' onClick={this.handleCancel}>
                      Cancel
                    </Button>
                    <Button type='primary' htmlType='submit' loading={this.state.updateLoading}>
                      OK
                    </Button>
                  </Space>
                </Row>
              </Form>
            </Modal>
          </>
        )}
        <Modal
          title={'Update User'}
          visible={this.state.isChangeModal}
          onCancel={this.handleClickCloseUpdate}
          footer={[
            <Button key='back' onClick={this.handleUpdateCancel}>
              Cancel
            </Button>,
            <Button key='submit' type='primary' loading={loading} onClick={this.handelUpdateOk}>
              Update
            </Button>,
          ]}
        >
          Do you want to update the changes?
        </Modal>
        <Modal visible={this.state.isChat} onCancel={this.handleClickCloseChat} footer={''} width={470}>
          <ChatBox id={this.state.userId} name={this.state.userName} />
        </Modal>
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
});

export default connect(null, mapDispatchToProps)(withRouter(UserList));
