import {
  CheckOutlined,
  CloseOutlined,
  LoadingOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Menu,
  message,
  Modal,
  Radio,
  Row,
  Select,
  Slider,
  Space,
  Table,
  Tabs,
} from 'antd';
import axios from 'axios';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { Link, withRouter } from 'react-router-dom';

import LocalStorageService from '../../config/LocalStorageService';
import notification from '../../helper/Notification';
import orderService from '../../redux/order/order.service';
import productActions from '../../redux/product/actions';
import shopProductActions from '../../redux/shopProduct/actions';
import LayoutContentWrapper from '../../utility/layoutWrapper';
import { BEService } from './index.service';

// import { getAll } from "../../Actions/authActions";
// import CreateOrUpdateUser from "./CreateOrUpdateCompany.js";
// import { registerUser } from "../../Actions/authActions";
// import TableRow from "./TableRow";
const { confirm } = Modal;
const { Option } = Select;
const { TextArea } = Input;

const { TabPane } = Tabs;

const formItemProp = {
  labelAlign: 'left',
  // labelCol: { span: 11 },
};

const labelItem = {
  labelCol: { span: 3 },
};
class OrderList extends Component {
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
      title: 'User Name',
      dataIndex: 'customerName',
      ...this.getColumnSearchProps('customerName'),
    },
    {
      title: 'PhoneNumber',
      dataIndex: 'phone',
      ...this.getColumnSearchProps('phone'),
    },
    {
      title: 'Address',
      //   key: "brand",
      dataIndex: 'address',
    },
    {
      title: 'OrderId',
      //   key: "description",
      dataIndex: 'orderId',
      ...this.getColumnSearchProps('orderId'),
    },

    {
      title: 'Total',
      dataIndex: 'total',
    },
    {
      title: 'isPaid',
      dataIndex: 'isPaid',
      render: (item) => {
        return <span> {item === true ? <CheckOutlined style={{ color: 'green' }} /> : <CloseOutlined style={{ color: 'red' }} />}</span>;
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (item) => {
        // let statusShow=

        return <span>{item}</span>;
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (com) => {
        return (
          <div>
            <Button className='btn-delete' type='danger' onClick={() => this.handleToggleDeletedModal(true, com.orderId)}>
              Delete
            </Button>

            <Button className='btn-update' type='primary' onClick={() => this.handleUpdate(com.orderId)}>
              Update
            </Button>
          </div>
        );
      },
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      products: [],
      isShowModal: false,
      productId: null,
      products: [],
      productsInTable: [],
      idverify: [],
      totalItem: 0,
      visibleDelete: false,
      productIdDelete: null,
      searchInput: '',
      productname: '',
      price: '',
      amount: '',
      illustration: '',
      brand: '',
      productcode: '',
      description: '',
      errors: {},
      loading: false,
      imageUrl: '',
      paid: '',
      status: '',
      orderData: null,
      productArray: [],
      searchText: '',
      searchedColumn: '',
    };
  }
  componentDidMount() {
    this.getProduct();
  }
  handleToggleDeletedModal = (isShow, id) => {
    console.log('id', id);
    this.setState({
      ...this.state,
      productIdDelete: id,
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
    if (info.file.status === 'uploading') {
      this.setState({
        loading: true,
        // illustration: info.file,
      });
      const { illustration } = this.state;
      // console.log("url", imageUrl);
      // console.log("info:", info.file);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.setState({
        // loading: true,
        illustration: info.file.response.name,
      });
      console.log('info:', info.file.response.name);

      this.getBase64(info.file.originFileObj, (imageUrl) =>
        this.setState({
          imageUrl,
          loading: false,
        })
      );
    }
  };

  getProduct = async () => {
    await axios
      .get('http://localhost:8080/api/get-order')
      .then((response) => {
        console.log(response.data.data);
        this.setState({
          products: response.data.data,
          productsInTable: response.data.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  handleUpdate = (orderid) => {
    console.log('bao:', orderid, '-', this.state.paid, '-', this.state.status);
    this.props.getOrderDetail(orderid).then((response) => {
      const value = response.data.data;
      console.log('data', value);
      this.setState({
        isShowModal: true,
        orderData: value,
        productArray: response.data.data.productInfo,
      });
    });

    // this.props.getProductById(productId).then((res) => {
    //   console.log("daat:", res);
    //   this.setState({
    //     brand: res.data.data.brand,
    //     productname: res.data.data.productname,
    //     productcode: res.data.data.productcode,
    //     illustration: res.data.data.illustration,
    //     description: res.data.data.description,
    //     price: res.data.data.price,
    //     amount: res.data.data.amount,
    //   });
    // });
  };

  handleModal = () => {
    this.setState({ isShowModal: true });
    this.cleanData();
  };

  handleDelete = (productId) => {
    this.props.deleteProduct(productId).then((res) => {
      console.log('status:', res.data.status);
      if (res.data.status === 200) {
        console.log('okkkk');
        this.getProduct();
        this.handleToggleDeletedModal(false, 0);
        notification('success', `Delete Order Successfully`, '');
      }
    });
  };

  cleanData = () => {
    this.setState({
      brand: '',
      productname: '',
      productcode: '',
      illustration: '',
      description: '',
      price: '',
      amount: '',
    });
  };
  handleAva = () => {};
  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
    console.log(e.target.value);
  };

  handleCancel = (e) => {
    this.setState({ isShowModal: false });
  };
  onUpdateOrder = async (data) => {
    const orderId = this.state.orderData.orderId;
    let statusUpdate = null;
    switch (data.status) {
      case 0:
        statusUpdate = 'canceled';
        break;
      case 1:
        statusUpdate = 'waiting-verify';

        break;
      case 2:
        statusUpdate = 'delivering';

        break;
      case 3:
        statusUpdate = 'delivered';

        break;

      default:
        break;
    }
    const arrData = [];
    for (const i of data.product) {
      const obj = {
        productId: i.productId,
        price: i.price,
        size: i.size,
        color: i.color,
        amount: i.amount,
      };
      arrData.push(obj);
    }
    const updateData = {
      address: data.address,
      note: data.note,
      isPaid: data.paid,
      phone: data.phoneNumber,
      status: statusUpdate,
      productInfo: arrData,
    };
    console.log('data', updateData);
    await this.props.updateOrder(orderId, updateData).then((response) => {
      console.log('ok');
      if (response.data.status === 200) {
        notification('success', `Update order Successfully`, '');
        this.getProduct();
      } else {
        notification('error', response.data.message, '');
      }
    });
  };
  onFinish = (values) => {
    console.log('Received values of form:', values);
  };
  re = (e) => {
    console.log('e', e);
  };
  render() {
    const { loading, imageUrl, orderData, productArray } = this.state;
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    console.log('orderData', orderData);
    let userName = '';
    let phoneNumber = '';
    let address = '';
    let note = '';
    let product = '';
    let paid = '';
    let status = '';
    if (orderData) {
      userName = orderData.customerName;
      phoneNumber = orderData.phone;
      address = orderData.address;
      note = orderData.note;
      product = orderData.productInfo;
      paid = orderData.isPaid;
      if (orderData.status === 'waiting-verify') {
      }
      switch (orderData.status) {
        case 'waiting-verify':
          status = 1;
          break;
        case 'delivering':
          status = 2;
          break;
        case 'delivered':
          status = 3;
          break;
        case 'canceled':
          console.log('here');
          status = 0;
          break;
        default:
          break;
      }
      // status = orderData.status;
    }
    return (
      // <LayoutContentWrapper className="company">
      <div>
        <Card header={{ title: 'Product' }}>
          <Modal
            title='Are you sure?'
            visible={this.state.visibleDelete}
            onOk={() => this.handleDelete(this.state.productIdDelete)}
            okType={'danger'}
            onCancel={() => this.handleToggleDeletedModal(false, this.state.productIdDelete)}
          >
            <p>Do you really want to delete this order?</p>
          </Modal>

          <Table columns={this.columns} dataSource={this.state.productsInTable} rowKey={(item) => item.userId} />
        </Card>

        {this.state.isShowModal && (
          <>
            <Modal width='1000px' className='company-details' title={'Update order'} visible={this.state.isShowModal} onOk={this.handleOk} onCancel={this.handleCancel} footer={''}>
              <Form
                onFinish={this.onUpdateOrder}
                initialValues={{
                  userName: userName,
                  phoneNumber: phoneNumber,
                  address: address,
                  note: note,
                  product: product,
                  paid: paid,
                  status: status,
                  // dayOfBirth: dayOfBirth,
                  // idverify: idverify,
                  // password: email,
                }}
              >
                <Form.Item {...formItemProp} {...labelItem} label='User Name'>
                  <span>{userName}</span>
                </Form.Item>
                <Form.Item
                  {...formItemProp}
                  {...labelItem}
                  name='phoneNumber'
                  label='Phone number'
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Phone number',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  {...formItemProp}
                  {...labelItem}
                  name='address'
                  label='Address'
                  rules={[
                    {
                      required: true,
                      message: 'Please input Address',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.List name='product'>
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, fieldKey, ...restField }) => (
                        <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align='baseline'>
                          <Form.Item {...restField} label='Product' name={[name, 'productname']} fieldKey={[fieldKey, 'productname']} style={{ marginLeft: '20px' }}>
                            <Input disabled />
                          </Form.Item>
                          <Form.Item {...restField} label='Amount' name={[name, 'amount']} fieldKey={[fieldKey, 'amount']}>
                            <InputNumber placeholder='Amount' style={{ width: '40px' }} disabled />
                          </Form.Item>
                          <Form.Item {...restField} label='Price' name={[name, 'price']} fieldKey={[fieldKey, 'price']}>
                            <InputNumber disabled />
                          </Form.Item>
                          <Form.Item {...restField} label='Size' name={[name, 'size']} fieldKey={[fieldKey, 'size']}>
                            <InputNumber disabled />
                          </Form.Item>
                          <Form.Item {...restField} label='Color' name={[name, 'color']} fieldKey={[fieldKey, 'color']}>
                            <InputNumber disabled />
                          </Form.Item>
                        </Space>
                      ))}
                    </>
                  )}
                </Form.List>

                <Form.Item {...formItemProp} {...labelItem} name='note' label='Note'>
                  <TextArea rows={4} />
                </Form.Item>
                <Form.Item {...formItemProp} {...labelItem} name='paid' label='Paid'>
                  <Radio.Group>
                    <Radio value={true}>
                      <CheckOutlined style={{ color: 'green' }} />
                    </Radio>
                    <Radio value={false}>
                      <CloseOutlined style={{ color: 'red' }} />
                    </Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item {...formItemProp} {...labelItem} name='status' label='Order status'>
                  {0 <= status < 4 ? (
                    <Slider
                      min={0}
                      max={3}
                      marks={{
                        0: <span style={{ color: 'red' }}>Canceled</span>,
                        1: <span>Waiting verify</span>,
                        2: <span>Delivering</span>,
                        3: <span style={{ color: 'green' }}>Delivered</span>,
                      }}
                    />
                  ) : (
                    orderData.status
                  )}
                  {/* {status===0&&
                  
                  } */}
                  {/* <Radio.Group>
                    <Radio value='waiting-verify'>Waiting verify</Radio>
                    <Radio value='delivering'>Delivering</Radio>
                    <Radio value='delivered'>Delivered</Radio>
                    <Radio value='canceled'>Canceled</Radio>
                  </Radio.Group> */}
                </Form.Item>
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
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  deleteProduct: (productId) => dispatch(productActions.deleteProduct(productId)),
  updateProduct: (productId, product) => dispatch(productActions.updateProduct(productId, product)),
  getProductById: (productId) => dispatch(productActions.getProductById(productId)),
  addProduct: (product) => dispatch(productActions.addProduct(product)),
  updateOrder: (orderId, data) => dispatch(orderService.updateOrder(orderId, data)),
  getOrderDetail: (orderId) => dispatch(orderService.getOrderDetail(orderId)),
});

export default connect(null, mapDispatchToProps)(withRouter(OrderList));
