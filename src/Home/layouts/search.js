/* eslint-disable */
import {
  CloseOutlined,
  MinusOutlined,
  PlusOutlined,
  BulbOutlined,
} from "@ant-design/icons";
import { Empty, Modal, Form, Select } from "antd";
import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";

import notification from "../../helper/Notification";
import sample from "../../image/2.jpg";
import productActions from "../../redux/product/actions";
import shopProduct from "../../redux/shopProduct/actions";
const { Option } = Select;

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: "",
      productInCart: [],
      name: "",
      illustration: "",
      brand: "",
      description: "",
      price: "",
      size: "38",
      buyNow: false,
      amountChoose: 1,
      showModal: false,
      product: [],
    };
  }
  search = (e) => {
    // this.setState({ sort: e });
    // const obj = { key: e, nameKey: this.props.match.params.keyword };
    const obj = `${this.props.match.params.keyword}-${e}`;
    this.props.sortPriceSearch(obj).then((data) => {
      this.setState({
        product: data.data,
      });
    });
    console.log("ass", obj);
  };
  handleOk = () => {
    this.props.history.push("/shop/login");
  };
  handleCancel = () => {
    this.setState({ showModal: false });
  };
  addOne = () => {
    this.setState({ amountChoose: this.state.amountChoose + 1 });
    console.log("add", this.state.amountChoose);
  };
  subOne = () => {
    this.setState({ amountChoose: this.state.amountChoose - 1 });
    console.log("add", this.state.amountChoose);
  };

  componentDidMount = async () => {
    if (localStorage.getItem("userauth")) {
      await this.setState({
        userid: localStorage.getItem("userauth").split("id")[1].split(`"`)[2],
      });
    }
    this.props.searchApi(this.props.match.params.keyword).then((data) => {
      this.setState({ product: data.data.data });
      //   this.setState({
      //     name: data.data.data.productname,
      //     brand: data.data.data.brand,
      //     description: data.data.data.description,
      //     illustration: data.data.data.illustration,
      //     price: data.data.data.price,
      //     // size: data.data.data.size,
      //   });
      console.log("bao:", data.data.data);
    });

    // console.log("baoooo:", this.props.match.params.keyword);
  };
  // onCheckout = () => {
  //   var obj = {
  //     userid: this.state.userid,
  //     email: this.state.email,
  //     name: this.state.name,
  //     phone: this.state.phone,
  //     address: this.state.address,
  //     // total: this.state.finalTotal,
  //     total: this.state.total,
  //     discount: this.state.discount,
  //     product: this.state.checkout,
  //     note: this.state.note,
  //   };
  //   this.props.addToCheckout(obj).then((res) => {
  //     console.log("how:", res);
  //     this.props.history.push("/checkout");
  //   });
  // };
  addCart = (e, size, amount) => {
    if (localStorage.getItem("userauth")) {
      const obj = {
        userid: localStorage.getItem("userauth").split("id")[1].split(`"`)[2],
        size: size,
        amountChoose: amount,
        productid: e,
      };
      this.props.addProductToCart(obj);
      notification("success", "Add product to cart success");
    } else {
      this.setState({ showModal: true });
    }
  };
  byNow = (e, size, amount) => {
    if (localStorage.getItem("userauth")) {
      const obj = {
        userid: localStorage.getItem("userauth").split("id")[1].split(`"`)[2],
        size: size,
        amountChoose: amount,
        productid: e,
      };
      this.props.addProductToCart(obj);
      notification("success", "Add product to cart success");
      this.props.history.push("/shop/cart");
    } else {
      this.setState({ showModal: true });
    }
  };
  handleSelect = async (productId) => {
    this.props.history.push("/detail/" + productId);
  };
  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
    console.log("aaa", e.target.value);
  };
  onChangeValue = async (e) => {
    console.log("value change:", e.target.value);
    if (e.target.value == "discount10") {
      await this.setState({ discount: 10 });
    }
    if (e.target.value == "discount20") {
      await this.setState({ discount: 20 });
    }
    if (e.target.value == "discount30") {
      await this.setState({ discount: 30 });
    }
    localStorage.setItem("discount", this.state.discount);
    this.setState({
      finalTotal:
        parseInt(this.state.total) + 2 - parseInt(this.state.discount),
    });
  };
  render() {
    const { product } = this.state;

    if (!product.length) {
      var result = <Empty />;
      console.log("empytttt");
    } else {
      var result = product.map((product, index) => {
        return (
          <div className="col-sm-4" key={index}>
            <div className="product-image-wrapper">
              <div className="single-products">
                <div
                  className="productinfo text-center"
                  onClick={(e) => this.handleSelect(product.id)}
                >
                  <div style={{ height: "200px" }}>
                    <img
                      style={{ width: "200px", height: "auto" }}
                      src={
                        "http://localhost:3030/images/product/" +
                        product.illustration
                      }
                      alt="sadad"
                    />
                  </div>
                  {/* imagee + "/" + product.illustration */}
                  <h2> Price:{product.price}$</h2>
                  <p>{product.productname}</p>
                </div>
              </div>
            </div>
          </div>
        );
      });
    }

    return (
      <div className="container">
        <div className="row">
          {/* <Left_slidebar /> */}
          <div className="col-sm-9 padding-right">
            <div className="features_items">
              <h4>
                <BulbOutlined /> Search results for keyword '
                {this.props.match.params.keyword}'
              </h4>
              <div
                style={{
                  backgroundColor: "#F0F0E9",
                  marginTop: "20px",
                  height: "50px",
                  // textAlign: "center",
                }}
              >
                <div style={{ marginTop: "10px" }}>
                  <label style={{ marginTop: "15px", marginLeft: "100px" }}>
                    SORTED BY:{" "}
                  </label>
                  <Select
                    placeholder="Price"
                    style={{ width: 120, marginLeft: "50px" }}
                    onChange={this.search}
                  >
                    <Option value="ASC">Low to High</Option>
                    <Option value="DESC">High to Low</Option>
                  </Select>
                </div>
              </div>
              <h2 style={{ marginTop: "30px" }} className="title text-center">
                All Items
              </h2>
              {result}

              <ul className="pagination">
                <li className="active">
                  <a href="">1</a>
                </li>
                <li>
                  <a href="">2</a>
                </li>
                <li>
                  <a href="">3</a>
                </li>
                <li>
                  <a href="">&raquo;</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getProduct: () => dispatch(productActions.getProduct),
  removeFromCart: (data) => dispatch(shopProduct.removeFromCart(data)),
  addToCheckout: (data) => dispatch(shopProduct.addToCheckout(data)),
  getProductById: (id) => dispatch(shopProduct.getProductById(id)),
  addProductToCart: (id) => dispatch(shopProduct.addProductToCart(id)),
  sortPriceSearch: (obj) => dispatch(shopProduct.sortPriceSearch(obj)),

  searchApi: (keyword) => dispatch(shopProduct.searchApi(keyword)),
  getProductFromCart: () => dispatch(productActions.getProductFromCart),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Search));
