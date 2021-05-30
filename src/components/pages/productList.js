import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Form,
  Input,
  Menu,
  message,
  Modal,
  Select,
  Table,
  Tabs,
  Upload,
} from "antd";
import axios from "axios";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { Link, withRouter } from "react-router-dom";

import LocalStorageService from "../../config/LocalStorageService";
import notification from "../../helper/Notification";
import productActions from "../../redux/product/actions";
import LayoutContentWrapper from "../../utility/layoutWrapper";

// import { getAll } from "../../Actions/authActions";
// import CreateOrUpdateUser from "./CreateOrUpdateCompany.js";
// import { registerUser } from "../../Actions/authActions";
// import TableRow from "./TableRow";
const { confirm } = Modal;
const { Option } = Select;

const { TabPane } = Tabs;

class ProductList extends Component {
  columns = [
    {
      title: "Name",
      dataIndex: "productname",
    },
    {
      title: "Product Code",
      dataIndex: "productcode",
    },
    {
      title: "Brand",
      key: "brand",
      dataIndex: "brand",
    },
    {
      title: "Description",
      key: "description",
      dataIndex: "description",
    },

    {
      title: "Price",
      key: "price",
      dataIndex: "price",
    },
    {
      title: "Amount",
      key: "amount",
      dataIndex: "amount",
    },
    // {
    //   title:'IsVerify',
    //   dataIndex: 'idverify'
    // },
    {
      title: "Action",
      key: "action",
      render: (com) => {
        return (
          // <Space size="middle">
          <div>
            <Button
              className="btn-delete"
              type="danger"
              onClick={() => this.handleToggleDeletedModal(true, com.productId)}
            >
              Delete
            </Button>

            <Button
              className="btn-update"
              type="primary"
              onClick={() => this.handleUpdate(com.productId)}
            >
              Update
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
      products: [],
      isShowModal: false,
      productId: null,
      products: [],
      productsInTable: [],
      idverify: [],
      totalItem: 0,
      visibleDelete: false,
      productIdDelete: null,
      searchInput: "",
      productname: "",
      price: "",
      amount: "",
      illustration: "",
      brand: "",
      productcode: "",
      description: "",
      errors: {},
      loading: false,
      imageUrl: "",
    };
  }
  componentDidMount() {
    this.getProduct();
  }
  handleToggleDeletedModal = (isShow, id = 0) => {
    this.setState({
      ...this.state,
      productIdDelete: id,
      visibleDelete: isShow,
    });
  };
  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };
  handleChange = (info) => {
    if (info.file.status === "uploading") {
      this.setState({
        loading: true,
        // illustration: info.file,
      });
      const { illustration } = this.state;
      // console.log("url", imageUrl);
      // console.log("info:", info.file);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      this.setState({
        // loading: true,
        illustration: info.file.response.name,
      });
      console.log("info:", info.file.response.name);

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
      .get("http://localhost:8080/products/api/get-all-product")
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
    this.setState({ productId: productId });
    this.props.getProductById(productId).then((res) => {
      console.log("daat:", res);

      this.setState({
        brand: res.data.data.brand,
        productname: res.data.data.productname,
        productcode: res.data.data.productcode,
        illustration: res.data.data.illustration,
        description: res.data.data.description,
        price: res.data.data.price,
        amount: res.data.data.amount,
        isShowModal: true,
      });
    });
  };

  handleModal = () => {
    this.setState({ isShowModal: true });
    this.cleanData();
  };

  handleDelete = (productId) => {
    this.props.deleteProduct(productId).then((res) => {
      console.log("status:", res.data.status);
      if (res.data.status === "success") {
        console.log("okkkk");
        this.getProduct();
        this.handleToggleDeletedModal(false, 0);
        notification("success", `Delete Product Successfully`, "");
      }
    });
  };

  handleOk = async () => {
    if (this.state.productId) {
      console.log("update");
      const obj = {
        brand: this.state.brand,
        productname: this.state.productname,
        productcode: this.state.productcode,
        illustration: this.state.illustration,
        description: this.state.description,
        price: this.state.price,
        amount: this.state.amount,
      };
      await this.props.updateProduct(this.state.productId, obj).then((res) => {
        if (res.data.status === "success") {
          this.getProduct();
          this.setState({ isShowModal: false });
          notification("success", `Update Product Successfully`, "");
        }
      });
    } else {
      console.log("submit");
      const obj = {
        brand: this.state.brand,
        productname: this.state.productname,
        productcode: this.state.productcode,
        illustration: this.state.illustration,
        description: this.state.description,
        price: this.state.price,
        amount: this.state.amount,
      };
      await this.props.addProduct(obj).then((res) => {
        if (res.data.status === "success") {
          console.log("okkkk add");
          this.getProduct();
          this.handleToggleDeletedModal(false, 0);
          notification("success", `Add Product Successfully`, "");
          this.setState({ isShowModal: false });
        }
      });
    }
    // const closeModal = localStorage.getItem("openModal");
    // this.setState({ isShowModal: false });
    // message.success("Add user success!");
  };
  cleanData = () => {
    this.setState({
      brand: "",
      productname: "",
      productcode: "",
      illustration: "",
      description: "",
      price: "",
      amount: "",
    });
  };
  handleAva = () => {};
  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleCancel = (e) => {
    this.setState({ isShowModal: false });
  };

  render() {
    const { loading, imageUrl } = this.state;
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    // console.log("imageUrl", imageUrl);
    const fileList = [
      {
        uid: "-1",
        name: "image.png",
        status: "done",
        url: "http://localhost:8080/images/product/9a479496-e723-4991-bc35-6e4080736ef8.png",
      },
      // {
      //   uid: "-2",
      //   name: "image.png",
      //   status: "done",
      //   url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      // },
      // {
      //   uid: "-3",
      //   name: "image.png",
      //   status: "done",
      //   url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      // },
      // {
      //   uid: "-4",
      //   name: "image.png",
      //   status: "done",
      //   url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      // },
      // {
      //   uid: "-xxx",
      //   percent: 50,
      //   name: "image.png",
      //   status: "uploading",
      //   url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      // },
      // {
      //   uid: "-5",
      //   name: "image.png",
      //   status: "error",
      // },
    ];
    return (
      // <LayoutContentWrapper className="company">
      <div>
        <Card
          header={{ title: "Product" }}
          extra={
            <React.Fragment>
              {/* <SearchBox
                placeholder="Search companies"
                handleOnTransferText={this.handleOnTransferText}
              ></SearchBox> */}
              <Button
                className="btn-add"
                type="primary"
                onClick={this.handleModal}
              >
                Add Product
              </Button>
            </React.Fragment>
          }
        >
          <Modal
            title="Are you sure?"
            visible={this.state.visibleDelete}
            onOk={() => this.handleDelete(this.state.productIdDelete)}
            okType={"danger"}
            onCancel={() =>
              this.handleToggleDeletedModal(false, this.state.productIdDelete)
            }
          >
            <p>Do you really want to delete this product?</p>
          </Modal>

          <Table
            columns={this.columns}
            dataSource={this.state.productsInTable}
            rowKey={(item) => item.productId}
          />
        </Card>

        {this.state.isShowModal && (
          <>
            <Modal
              className="company-details"
              title={
                this.state.productId ? "Update Product" : "Add New Product"
              }
              visible={this.state.isShowModal}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              <div>
                <label>Illustration</label>
                {/* <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={this.handlePreview}
                  onChange={this.handleChange}
                >
                  {fileList.length >= 8 ? null : uploadButton}
                </Upload> */}
                <Upload
                  name="image"
                  listType="picture-card"
                  className="avatar-uploader"
                  // showUploadList={false}
                  action="http://localhost:8080/products/post"
                  fileList={fileList}
                  headers={{
                    authorization: `Bearer ${LocalStorageService.getAccessToken()}`,
                  }}
                  beforeUpload={this.beforeUpload}
                  onChange={this.handleChange}
                >
                  {fileList.length >= 8 ? null : uploadButton}

                  {/* {imageUrl ? (
                    <img src={imageUrl} alt="image" style={{ width: "100%" }} />
                  ) : (
                    uploadButton
                  )} */}
                </Upload>
                {/* <Input
                        type="file"
                        name="image"
                        beforeUpload={this.beforeUpload}
                      ></Input> */}
              </div>
              <div>
                <label>Product Name</label>
                <Input
                  type="text"
                  name="productname"
                  value={this.state.productname}
                  onChange={this.onChange}
                  id="productname"
                ></Input>
              </div>
              <div>
                <label>Product Code</label>
                <Input
                  type="text"
                  name="productcode"
                  value={this.state.productcode}
                  onChange={this.onChange}
                  id="productcode"
                ></Input>
              </div>
              <div>
                <label>Brand</label>
                <Input
                  type="text"
                  name="brand"
                  value={this.state.brand}
                  onChange={this.onChange}
                  id="brand"
                ></Input>
              </div>
              <div>
                <label>Description</label>
                <Input
                  type="text"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  id="description"
                ></Input>
              </div>
              <div>
                <label>Price</label>
                <Input
                  type="text"
                  name="price"
                  value={this.state.price}
                  onChange={this.onChange}
                  id="price"
                ></Input>
              </div>

              <div>
                <label>amount</label>

                <Input
                  type="text"
                  name="amount"
                  value={this.state.amount}
                  onChange={this.onChange}
                  id="amount"
                ></Input>
              </div>
            </Modal>
          </>
        )}
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  deleteProduct: (productId) =>
    dispatch(productActions.deleteProduct(productId)),
  updateProduct: (productId, product) =>
    dispatch(productActions.updateProduct(productId, product)),
  getProductById: (productId) =>
    dispatch(productActions.getProductById(productId)),
  addProduct: (product) => dispatch(productActions.addProduct(product)),
});

export default connect(null, mapDispatchToProps)(withRouter(ProductList));
