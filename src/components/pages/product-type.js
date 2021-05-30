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
  Row,
  Col,
  Radio,
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
import shopProductActions from "../../redux/shopProduct/actions";
import LayoutContentWrapper from "../../utility/layoutWrapper";

const { confirm } = Modal;
const { Option } = Select;

const { TabPane } = Tabs;
const { Search } = Input;

class ProductType extends Component {
  columns = [
    {
      title: "Product type",
      dataIndex: "name",
    },
    // {
    //   title: "Product sub type",
    //   dataIndex: "productSubType",
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
              onClick={() => this.handleToggleDeletedModal(true, com.id)}
            >
              Delete
            </Button>

            <Button
              className="btn-update"
              type="primary"
              onClick={() => this.handleUpdate(com.id)}
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
      paid: "",
      status: "",
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
      });
      const { illustration } = this.state;

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
      .get("http://localhost:8080/products/api/get-product-type")
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
    console.log("bao:", orderid, "-", this.state.paid, "-", this.state.status);
    this.setState({ isShowModal: true, productId: orderid });
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
    console.log(
      "ddsds:",
      this.state.productId,
      "-",
      this.state.paid,
      "-",
      this.state.status
    );
    const obj = {
      orderid: this.state.productId,
      paid: this.state.paid,
      status: this.state.status,
    };
    this.props.updateOrder(obj).then((data) => {
      if (data.data.status === "success") {
        notification("success", "Update successfully");
      }
      this.setState({ isShowModal: false });
    });
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
    console.log(e.target.value);
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
    return (
      // <LayoutContentWrapper className="company">
      <div>
        {/* <Card header={{ title: "Product" }}> */}
        <Card
          header={{ title: "Product" }}
          extra={
            <>
              <Search
                placeholder="Search"
                // onSearch={this.onSearch}
                style={{ width: 200 }}
              />

              <React.Fragment>
                <Button
                  className="btn-add"
                  type="primary"
                  onClick={this.handleModal}
                >
                  Add product type
                </Button>
              </React.Fragment>
            </>
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
            rowKey={(item) => item.userId}
          />
        </Card>

        {this.state.isShowModal && (
          <>
            <Modal
              className="company-details"
              title={this.state.productId ? "Update Order" : "Add New Product"}
              visible={this.state.isShowModal}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              <Form>
                <div>
                  <label>Paid: </label>
                  <br></br>

                  <Radio.Group id="paid" onChange={this.onChange}>
                    <Radio id="paid" value="true">
                      True
                    </Radio>
                    <Radio id="paid" value="false">
                      False
                    </Radio>
                  </Radio.Group>
                </div>
                <br></br>
                <div>
                  <label>Status: </label>
                  <br></br>

                  <Radio.Group id="status" onChange={this.onChange}>
                    <Radio id="status" value="Coming">
                      Coming
                    </Radio>
                    <Radio id="status" value="Delivered">
                      Delivered
                    </Radio>
                    <Radio id="status" value="Canceled">
                      Canceled
                    </Radio>
                  </Radio.Group>
                </div>
              </Form>
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
  updateOrder: (data) => dispatch(shopProductActions.updateOrder(data)),
});

export default connect(null, mapDispatchToProps)(withRouter(ProductType));
