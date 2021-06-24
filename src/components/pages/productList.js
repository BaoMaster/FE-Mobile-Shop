import { LoadingOutlined, MinusCircleOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Card, Checkbox, Form, Input, Menu, message, Modal, Select, Space, Table, Tabs, Upload } from 'antd';
import axios from 'axios';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { Link, withRouter } from 'react-router-dom';

import LocalStorageService from '../../config/LocalStorageService';
import notification from '../../helper/Notification';
import productActions from '../../redux/product/actions';
import LayoutContentWrapper from '../../utility/layoutWrapper';

const { confirm } = Modal;
const { Option } = Select;

const { TabPane } = Tabs;

class ProductList extends Component {
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
      title: 'Name',
      dataIndex: 'productname',
      ...this.getColumnSearchProps('productname'),
    },
    {
      title: 'Product Code',
      dataIndex: 'productcode',
      ...this.getColumnSearchProps('productcode'),
    },
    {
      title: 'Brand',
      key: 'brand',
      dataIndex: 'brand',
      ...this.getColumnSearchProps('brand'),
    },
    {
      title: 'Description',
      key: 'description',
      dataIndex: 'description',
    },
    {
      title: 'Type',
      dataIndex: 'typeName',
      ...this.getColumnSearchProps('typeName'),
    },

    {
      title: 'Price',
      key: 'price',
      dataIndex: 'price',
    },
    {
      title: 'Amount',
      key: 'amount',
      dataIndex: 'amount',
    },

    {
      title: 'Action',
      key: 'action',
      render: (com) => {
        return (
          <div>
            <Button className='btn-delete' type='danger' onClick={() => this.handleToggleDeletedModal(true, com.productId)}>
              Delete
            </Button>

            <Button className='btn-update' type='primary' onClick={() => this.handleUpdate(com.productId)}>
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
      typeList: [],
      type: '',
      isChangeModal: false,
      isChange: false,
      searchText: '',
      searchedColumn: '',
      size: [],
      color: [],
    };
  }
  componentDidMount() {
    this.getProduct();
  }
  getTypeList = async () => {
    await this.props.getProductType().then((result) => {
      const arr = [];
      if (result.data.data.length) {
        for (const i of result.data.data) {
          const obj = {
            id: i.id,
            name: i.name,
          };
          arr.push(obj);
        }
      }
      console.log('data', arr);

      this.setState({ typeList: arr });
    });
  };
  handleToggleDeletedModal = (isShow, id = 0) => {
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
    const { illustration } = this.state;
    let arr = [];
    if (illustration.length) {
      for (const i of illustration) {
        arr.push(i);
      }
    }
    if (info.file.status === 'removed') {
      for (let it = 0; it < arr.length; it++) {
        if (arr[it].uid === info.file.uid) {
          arr.splice(it, 1);
          break;
        }
      }

      this.setState({ illustration: arr });
    }

    if (info.file.status === 'done') {
      // Get this url from response in real world.
      const { illustration } = this.state;
      let obj;
      const temp = [];
      // if (illustration.length) {
      const uid = illustration.length + 1;
      obj = {
        uid: uid,
        url: `http://localhost:8080/images/product/${info.file.response.name}`,
      };
      for (const i of illustration) {
        temp.push(i);
      }
      temp.push(obj);
      // }
      console.log('temp', temp);
      this.setState({
        // loading: true,
        illustration: temp,
      });
      //   console.log('info:', info.file.response.name);

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
      .get('http://localhost:8080/products/api/get-all-product')
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

  handleUpdate = (productId) => {
    this.getTypeList();

    this.setState({ productId: productId });
    this.props.getProductById(productId).then((res) => {
      let image = [];
      let i = 0;
      if (res.data.data.illustration.length) {
        for (const i of res.data.data.illustration) {
          const obj = { uid: i, url: `http://localhost:8080/images/product/${i}` };
          image.push(obj);
        }
      }
      console.log('image', image);
      this.setState({
        brand: res.data.data.brand,
        productname: res.data.data.productname,
        productcode: res.data.data.productcode,
        illustration: image,
        size: res.data.data.size,
        color: res.data.data.color,
        description: res.data.data.description,
        price: res.data.data.price,
        amount: res.data.data.amount,
        type: res.data.data.type,
        isShowModal: true,
      });
    });
  };
  handelUpdateOk = () => {
    this.handleOk();
  };
  handleUpdateCancel = async () => {
    this.setState({ isChangeModal: false, isShowModal: false, productId: null });
  };
  handleClickCloseUpdate = () => {
    this.setState({ isChangeModal: false });
  };
  handleModal = () => {
    this.setState({ isShowModal: true });
    this.cleanData();
  };

  handleDelete = (productId) => {
    this.props.deleteProduct(productId).then((res) => {
      if (res.data.status === 'success') {
        this.getProduct();
        this.handleToggleDeletedModal(false, 0);
        notification('success', `Delete Product Successfully`, '');
      }
    });
  };

  handleOk = async () => {
    const { illustration, color, size } = this.state;
    const temp = [];
    if (illustration.length) {
      for (const i of illustration) {
        temp.push(i.url.split('/')[5]);
      }
    }
    if (this.state.productId) {
      const obj = {
        brand: this.state.brand,
        productname: this.state.productname,
        productcode: this.state.productcode,
        illustration: temp,
        description: this.state.description,
        color: color,
        size: size,
        price: this.state.price,
        amount: this.state.amount,
        type: this.state.type,
      };
      await this.props.updateProduct(this.state.productId, obj).then((res) => {
        if (res.data.status === 200) {
          this.getProduct();
          this.setState({ isShowModal: false });
          notification('success', `Update Product Successfully`, '');
        } else {
          notification('error', res.data.message, '');
        }
      });
    } else {
      const obj = {
        brand: this.state.brand,
        productname: this.state.productname,
        productcode: this.state.productcode,
        illustration: temp,
        color: color,
        size: size,
        description: this.state.description,
        price: this.state.price,
        amount: this.state.amount,
      };
      await this.props.addProduct(obj).then((res) => {
        if (res.data.status === 200) {
          this.getProduct();
          this.handleToggleDeletedModal(false, 0);
          notification('success', `Add Product Successfully`, '');
          this.setState({ isShowModal: false, isChangeModal: false });
        }
      });
    }
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
    this.setState({ [e.target.id]: e.target.value, isChange: true });
  };

  handleCancel = (e) => {
    if (this.state.isChange) {
      this.setState({ isChangeModal: true });
    } else {
      this.setState({ isShowModal: false, productId: null });
    }
  };
  onChangeType = (e) => {
    this.setState({ type: e, isChange: true });
  };
  onChangeCheckSize = (checkedValues) => {
    this.setState({ size: checkedValues });
  };
  onChangeCheckColor = (checkedValues) => {
    console.log('checked = ', checkedValues);
    this.setState({ color: checkedValues });
  };
  render() {
    const { loading, imageUrl, illustration, typeList, type, size, color } = this.state;
    const optionsSize = [
      { label: 'S', value: 'S' },
      { label: 'M', value: 'M' },
      { label: 'L', value: 'L' },
    ];
    const optionsColor = [
      { label: 'Red', value: 'Red' },
      { label: 'Blue', value: 'Blue' },
      { label: 'Green', value: 'Green' },
      { label: 'Black', value: 'Black' },
      { label: 'White', value: 'White' },
    ];
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );

    return (
      <div>
        <Card
          header={{ title: 'Product' }}
          extra={
            <React.Fragment>
              <Button className='btn-add' type='primary' onClick={this.handleModal}>
                Add Product
              </Button>
            </React.Fragment>
          }
        >
          <Modal
            title='Are you sure?'
            visible={this.state.visibleDelete}
            onOk={() => this.handleDelete(this.state.productIdDelete)}
            okType={'danger'}
            onCancel={() => this.handleToggleDeletedModal(false, this.state.productIdDelete)}
          >
            <p>Do you really want to delete this product?</p>
          </Modal>

          <Table columns={this.columns} dataSource={this.state.productsInTable} rowKey={(item) => item.productId} />
        </Card>

        {this.state.isShowModal && (
          <>
            <Modal
              className='company-details'
              title={this.state.productId ? 'Update Product' : 'Add New Product'}
              visible={this.state.isShowModal}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              <div>
                <label>Illustration</label>
                <Upload
                  name='image'
                  listType='picture-card'
                  className='avatar-uploader'
                  // showUploadList={false}
                  action='http://localhost:8080/post-product'
                  fileList={illustration}
                  headers={{
                    authorization: `Bearer ${LocalStorageService.getAccessToken()}`,
                  }}
                  beforeUpload={this.beforeUpload}
                  onRemove={this.onRemove}
                  onChange={this.handleChange}
                >
                  {illustration.length >= 8 ? null : uploadButton}
                </Upload>
              </div>
              <div>
                <label>Product Name</label>
                <Input type='text' name='productname' value={this.state.productname} onChange={this.onChange} id='productname'></Input>
              </div>
              <div>
                <label>Product Code</label>
                <Input type='text' name='productcode' value={this.state.productcode} onChange={this.onChange} id='productcode'></Input>
              </div>
              <div>
                <label>Brand</label>
                <Input type='text' name='brand' value={this.state.brand} onChange={this.onChange} id='brand'></Input>
              </div>
              <div>
                <label>Type</label>
                <br />
                {/* <Input type='text' name='brand' value={this.state.brand} onChange={this.onChange} id='brand'></Input> */}
                <Select value={type} style={{ width: '200px' }} onChange={this.onChangeType}>
                  {typeList.map((x) => {
                    return (
                      <Option key={x.id} value={x.id}>
                        {x.name}
                      </Option>
                    );
                  })}
                </Select>
              </div>
              <div style={{ marginTop: '10px', marginBottom: '10px' }}>
                <label>Size</label>
                <br></br>
                <Checkbox.Group value={size} options={optionsSize} onChange={this.onChangeCheckSize} />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label>Color</label>
                <br></br>
                <Checkbox.Group value={color} options={optionsColor} onChange={this.onChangeCheckColor} />
              </div>
              <div>
                <label>Description</label>
                <Input type='text' name='description' value={this.state.description} onChange={this.onChange} id='description'></Input>
              </div>
              <div>
                <label>Price</label>
                <Input type='text' name='price' value={this.state.price} onChange={this.onChange} id='price'></Input>
              </div>

              <div>
                <label>amount</label>

                <Input type='text' name='amount' value={this.state.amount} onChange={this.onChange} id='amount'></Input>
              </div>
            </Modal>
          </>
        )}
        {
          <Modal
            title={'Update Product'}
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
        }
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  deleteProduct: (productId) => dispatch(productActions.deleteProduct(productId)),
  updateProduct: (productId, product) => dispatch(productActions.updateProduct(productId, product)),
  getProductById: (productId) => dispatch(productActions.getProductById(productId)),
  addProduct: (product) => dispatch(productActions.addProduct(product)),
  getProductType: () => dispatch(productActions.getProductType()),
});

export default connect(null, mapDispatchToProps)(withRouter(ProductList));
