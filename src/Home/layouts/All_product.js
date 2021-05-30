/* eslint-disable */
import { Badge, Form, Modal, Select } from "antd";
import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Rolex from "../../image/Rolex.png";
import sale from "../../image/sale.jpg";
import salee from "../../image/salee.jpg";
import productActions from "../../redux/product/actions";
import ShopProductActions from "../../redux/shopProduct/actions";
import Left_slidebar from "../Home_components/Slider_components/Left_slidebar";
import Slider from "../Home_components/Slider_components/Slider";

const { Option } = Select;
class All_product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: "",
      productname: "",
      productcode: "",
      illustration: "",
      description: "",
      price: "",
      product: [],
      imagePro: [],
      photo: [],
      id: "",
      productInCart: [],
      count: "",
      userid: "",
      sort: "",
    };
  }
  handleCancel = () => {
    this.setState({ isShowModal: false });
    console.log("status:", this.state.isShowModal);
  };
  componentDidMount = async () => {
    console.log("key", this.props.match.params.brand);
    if (this.props.match.params.brand) {
      this.props.findBrand(this.props.match.params.brand).then((data) => {
        this.setState({ product: data.data.data });
      });
      // console.log("yessss");
    } else {
      this.getProduct();
    }
    if (localStorage.getItem("userauth")) {
      await this.setState({
        userid: localStorage.getItem("userauth").split("id")[1].split(`"`)[2],
      });
      // this.getProductFromCart(this.state.userid);
      console.log("this:", this.state.userid);
    }
  };
  search = (e) => {
    // this.setState({ sort: e });
    this.props.sortPrice(e.toString()).then((data) => {
      this.setState({
        product: data.data,
      });
    });
    console.log("ass", e);
  };
  getProductFromCart = (userid) => {
    console.log("id:", userid);
    axios
      .get("http://localhost:3030/shop/api/getproductfromcart/" + userid)
      .then((res) => {
        this.setState({
          productInCart: res.data,
          // count: this.state.productInCart.length(),
        });
        console.log("length:", this.state.productInCart.length);
        // localStorage.setItem('count', this.state.productInCart.length);
        // var temp = localStorage.getItem('userauth');
        // const { productInCart } = this.state;
        // var total = 0;
        // var checkout = [];
        // for (let index = 0; index < productInCart.length; index++) {
        //   checkout = checkout + productInCart[index].productid + '/' + productInCart[index].amount + '***';
        //   total = total + parseInt(productInCart[index].amount) * parseInt(productInCart[index].products.price);
        // }
        // this.setState({ total: total, checkout: checkout });
        // console.log('baooo:', this.state.total);
        // console.log('checkout:', this.state.checkout);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  addCart = (e) => {
    const obj = {
      userid: localStorage.getItem("userauth").split("id")[1].split(`"`)[2],
      productid: e,
    };
    this.props.addProductToCart(obj);
  };
  handleSelect = async (productId) => {
    this.props.history.push("/detail/" + productId);
  };
  getProduct = async () => {
    await axios
      .get("http://localhost:3030/shop/api/getproduct")
      .then((res) => {
        // console.log(res.data), console.log('id', res.data.length);
        for (let index = 0; index < res.data.length; index++) {
          this.setState({
            product: res.data,
            // product: [
            //   (id = res.data.index.id),
            //   (img = res.data.index.illustration),
            //   (name = res.data.index.productname),
            //   (price = res.data.index.price),
            // ],
          });
        }
        // const { photo } = this.state;
        // photo = this.state.product.map((photo) => {
        //   this.setState({ imagePro: photo.illustration });
        //   const { imagePro } = this.state;
        //   // console.log("asasasa", imagePro);
        // });
        // this.setState({
        //   // product: [
        //   //   (id = res.data.id),
        //   //   (img = res.data.illustration),
        //   //   (name = res.data.productname),
        //   //   (price = res.data.price),
        //   // ],
        // }),
        // let product=this.state.product
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    const { imagePro } = this.state;

    var im = imagePro;

    const { product } = this.state;
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
              {/* <button
                style={{ marginLeft: "25%" }}
                type="button"
                onClick={() => this.addCart(product.id)}
                className="btn btn-default add-to-cart"
              >
                <i className="fa fa-shopping-cart"></i>Add to cart
              </button> */}
              {/* <div className='product-overlay'>
                <div className='overlay-content'>
                  <h2>{product.price}</h2>
                  <p>{product.productname}</p>
                  <a href='#' className='btn btn-default add-to-cart'>
                    <i className='fa fa-shopping-cart'></i>Add to cart
                  </a>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      );
    });
    return (
      <div className="container">
        <div className="row">
          <Left_slidebar />
          <div className="col-sm-9 padding-right">
            <div className="features_items">
              <div style={{ border: "3px solid #ee4d2d" }}>
                <div style={{ marginBottom: "6px" }}>
                  <section id="slider" className="clr-white">
                    <Slider />
                  </section>
                </div>
                <div style={{ marginBottom: "6px" }}>
                  <img
                    style={{
                      width: "49%",
                      marginRight: "5px",
                      marginLeft: "6px",
                      float: "left",
                    }}
                    src={sale}
                  ></img>
                  <img style={{ width: "49%" }} src={salee}></img>
                </div>
              </div>
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
              <div>
                {/* {this.state.isShowModal === true && ( */}
                <>
                  {/* {console.log('that work')} */}
                  <Modal
                    okText="Add to Cart"
                    className="company-details"
                    title="Product Details"
                    visible={this.state.isShowModal}
                    onOk={() => this.addCart(this.state.id)}
                    onCancel={this.handleCancel}
                  >
                    <Form>
                      <h1>{this.state.productname}</h1>
                      <div
                        style={{
                          float: "left",
                          textAlign: "center",
                          width: "50%",
                          height: "auto",
                        }}
                      >
                        <p>{this.state.description}</p>
                      </div>
                      <div>
                        {/* <img style={{ marginLeft: '10px' }} src={shoes + this.state.productId} /> */}
                        <p style={{ textAlign: "center" }}>
                          Price:<b>{this.state.price}$</b>
                        </p>
                      </div>
                    </Form>
                  </Modal>
                </>
                {/* )} */}
              </div>
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
  // deleteUser: (userId) => dispatch(userActions.deleteUser(userId)),
  // updateUser: (userId, user) => dispatch(userActions.updateUser(userId, user)),
  // getUserById: (userId) => dispatch(userActions.getUserById(userId)),
  // addUser: (user) => dispatch(userActions.addUser(user)),
  // loginUser: (user) => dispatch(userActions.loginUser(user)),
  getProduct: () => dispatch(productActions.getProduct),
  getProductById: (productId) =>
    dispatch(ShopProductActions.getProductById(productId)),
  sortPrice: (key) => dispatch(ShopProductActions.sortPrice(key)),
  findBrand: (brand) => dispatch(ShopProductActions.findBrand(brand)),
  addProductToCart: (product) =>
    dispatch(ShopProductActions.addProductToCart(product)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(All_product));

// export default All_product;
