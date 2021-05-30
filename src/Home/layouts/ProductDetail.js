/* eslint-disable */
import { CloseOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Empty, Modal } from "antd";
import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";

import notification from "../../helper/Notification";
import sample from "../../image/2.jpg";
import productActions from "../../redux/product/actions";
import shopProduct from "../../redux/shopProduct/actions";

class ProductDetail extends React.Component {
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
    };
  }
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
    this.props.getProductById(this.props.match.params.id).then((data) => {
      this.setState({
        name: data.data.data.productname,
        brand: data.data.data.brand,
        description: data.data.data.description,
        illustration: data.data.data.illustration,
        price: data.data.data.price,
        // size: data.data.data.size,
      });
      console.log("bao:", data.data.data);
    });

    // let userid = localStorage.getItem("userauth").split("id")[1].split(`"`)[2];
    // this.props.getProductFromCart(userid);
    // console.log("baoooo:", userid);
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
    if (localStorage.getItem("cart")) {
      let cartMain = localStorage.getItem("cart");
      let cart = localStorage.getItem("cart").split("-");
      let cartList = localStorage.getItem("cart").split(",");
      for (let index = 0; index < cartList.length; index++) {
        // const element = array[index];

        console.log("bao:", cartList[index]);
        let cartDetail = cartList[index].split("-");
        if (cartDetail[0] === e && cartDetail[1] === size) {
          cartList[index] =
            e + "-" + size + "-" + (parseInt(cartDetail[2]) + 1);
          window.location.reload();
          return localStorage.setItem("cart", cartList);
        } else {
          localStorage.setItem(
            "cart",
            cartMain + "," + e + "-" + size + "-" + amount
          );
          window.location.reload();
        }
      }
      // if (cart[0] === e && cart[1] === size) {
      //   localStorage.setItem(
      //     "cart",
      //     e + "-" + size + "-" + (parseInt(cart[2]) + 1)
      //   );
      // } else {
      //   localStorage.setItem(
      //     "cart",
      //     cartMain + "," + e + "-" + size + "-" + amount
      //   );
      // }
    } else {
      localStorage.setItem("cart", e + "-" + size + "-" + amount);
      window.location.reload();
    }
    // if (localStorage.getItem("userauth")) {
    //   const obj = {
    //     userid: localStorage.getItem("userauth").split("id")[1].split(`"`)[2],
    //     size: size,
    //     amountChoose: amount,
    //     productid: e,
    //   };
    //   this.props.addProductToCart(obj);
    //   notification("success", "Add product to cart success");
    // } else {
    //   this.setState({ showModal: true });
    // }
    console.log(e + "==", size, "==", amount);
  };
  byNow = (e, size, amount) => {
    if (localStorage.getItem("cart")) {
      let cartMain = localStorage.getItem("cart");
      let cart = localStorage.getItem("cart").split("-");
      let cartList = localStorage.getItem("cart").split(",");
      for (let index = 0; index < cartList.length; index++) {
        // const element = array[index];

        console.log("bao:", cartList[index]);
        let cartDetail = cartList[index].split("-");
        if (cartDetail[0] === e && cartDetail[1] === size) {
          cartList[index] =
            e + "-" + size + "-" + (parseInt(cartDetail[2]) + 1);
          this.props.history.push("/shop/cart");
          window.location.reload();
          return localStorage.setItem("cart", cartList);
        } else {
          localStorage.setItem(
            "cart",
            cartMain + "," + e + "-" + size + "-" + amount
          );
          this.props.history.push("/shop/cart");
          window.location.reload();
        }
      }
      // if (cart[0] === e && cart[1] === size) {
      //   localStorage.setItem(
      //     "cart",
      //     e + "-" + size + "-" + (parseInt(cart[2]) + 1)
      //   );
      // } else {
      //   localStorage.setItem(
      //     "cart",
      //     cartMain + "," + e + "-" + size + "-" + amount
      //   );
      // }
    } else {
      localStorage.setItem("cart", e + "-" + size + "-" + amount);
      this.props.history.push("/shop/cart");
    }
    // if (localStorage.getItem("userauth")) {
    //   const obj = {
    //     userid: localStorage.getItem("userauth").split("id")[1].split(`"`)[2],
    //     size: size,
    //     amountChoose: amount,
    //     productid: e,
    //   };
    //   this.props.addProductToCart(obj);
    //   notification("success", "Add product to cart success");
    // } else {
    //   this.setState({ showModal: true });
    // }
    console.log(e + "==", size, "==", amount);

    // if (localStorage.getItem("userauth")) {
    //   const obj = {
    //     userid: localStorage.getItem("userauth").split("id")[1].split(`"`)[2],
    //     size: size,
    //     amountChoose: amount,
    //     productid: e,
    //   };
    //   this.props.addProductToCart(obj);
    //   notification("success", "Add product to cart success");
    //   this.props.history.push("/shop/cart");
    // } else {
    //   this.setState({ showModal: true });
    // }
  };
  // handleDelete = (productId) => {
  //   // productId.preventDefault();
  //   console.log("delete action:", this.state.userid);
  //   console.log("delete action aa:", productId);
  //   const { userid } = this.state;
  //   const obj = {
  //     userid: userid,
  //     productid: productId,
  //   };
  //   this.props.removeFromCart(obj).then((res) => {
  //     const { userid } = this.state;
  //     if (res.data.status === "success") {
  //       this.getProductFromCart(userid);
  //       notification(res.data.status, res.data.message);
  //     }
  //   });
  // };
  // getProductFromCart = (userid) => {
  //   console.log("id:", userid);
  //   axios
  //     .get("http://localhost:3030/shop/api/getproductfromcart/" + userid)
  //     .then((res) => {
  //       this.setState({
  //         productInCart: res.data,
  //       });
  //       var temp = localStorage.getItem("userauth");
  //       const { productInCart } = this.state;
  //       var total = 0;
  //       var checkout = [];
  //       for (let index = 0; index < productInCart.length; index++) {
  //         checkout =
  //           checkout +
  //           productInCart[index].productid +
  //           "/" +
  //           productInCart[index].amount +
  //           "***";
  //         total =
  //           total +
  //           parseInt(productInCart[index].amount) *
  //             parseInt(productInCart[index].products.price);
  //       }
  //       this.setState({ total: total, checkout: checkout });
  //       console.log("baooo:", this.state.total);
  //       console.log("checkout:", this.state.checkout);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
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
    const { productInCart } = this.state;
    !productInCart.length
      ? console.log("true:", productInCart)
      : console.log("false:", productInCart);
    if (!productInCart.length) {
      var result = <Empty />;
    } else {
    }

    var renderTableHeader = () => {
      const header = Object.keys(this.state.header);
      return header.map((key, index) => (
        <th key={index}>{key.toUpperCase()}</th>
      ));
    };

    return (
      <div>
        <section id="cart_items">
          <div className="container">
            <div className="breadcrumbs">
              <ol className="breadcrumb">
                <li>
                  <NavLink to="/">Home</NavLink>
                </li>
                <li className="active">Products detail</li>
              </ol>
            </div>
          </div>
        </section>
        <section id="do_action">
          <div className="container" style={{ backgroundColor: "#E6E4DF" }}>
            {/* <div className="heading">
              <h3>{this.state.name}</h3>
              <p>
                Choose if you have a discount code or reward points you want to
                use or would like to estimate your delivery cost.
              </p>
            </div> */}
            <div className="row">
              <div className="col-sm-6">
                <div className="chose_area">
                  <img
                    src={
                      "http://localhost:3030/images/product/" +
                      this.state.illustration
                    }
                    style={{ height: "auto", width: "400px" }}
                  ></img>
                </div>
              </div>

              <div className="col-sm-6" style={{ marginBottom: "10px" }}>
                <div
                  className="total_area"
                  style={{ backgroundColor: "#E6E4DF", marginBottom: "10px" }}
                >
                  <h3>{this.state.name}</h3>
                  <p>{this.state.description}</p>
                  <p style={{ fontSize: "25px" }}>
                    CURRENT PRICE:
                    <b style={{ color: "red" }}> ${this.state.price}</b>
                  </p>
                  <p style={{ fontSize: "18px" }}>
                    <b>91%</b> of buyers enjoyed this product!<b> (87 votes)</b>
                  </p>
                  <p>
                    SIZE:{" "}
                    <select
                      onChange={this.onChange}
                      name="size"
                      id="size"
                      style={{ marginLeft: "60px", width: "60px" }}
                    >
                      <option value="38">38</option>
                      <option value="39">39</option>
                      <option value="40">40</option>
                      <option value="41">41</option>
                      <option value="42">42</option>
                      <option value="43">43</option>
                    </select>
                  </p>
                  <p>
                    AMOUNT:
                    <button
                      onClick={this.subOne}
                      style={{
                        marginLeft: "30px",
                        width: "28px",
                        height: "28px",
                      }}
                    >
                      -
                    </button>
                    <input
                      id="amountChoose"
                      type="decimal"
                      value={this.state.amountChoose}
                      style={{ width: "30px", textAlign: "center" }}
                    ></input>
                    <button
                      onClick={this.addOne}
                      style={{ width: "28px", height: "28px" }}
                    >
                      +
                    </button>
                  </p>
                  {/* <NavLink to='/cartupdate' activeClassName='btn btn-default update'>
                    Update
                  </NavLink>
                  <NavLink to='/checkout' activeClassName='btn btn-default check_out'>
                    Check Out
                  </NavLink> */}
                </div>
                <button
                  onClick={() =>
                    this.addCart(
                      this.props.match.params.id,
                      this.state.size,
                      this.state.amountChoose
                    )
                  }
                  style={{
                    borderRadius: "2px",
                    marginLeft: "20%",
                    borderColor: "#ee4d2d",
                    height: "50px",
                    color: "#ee4d2d",
                    backgroundColor: "rgba(255,87,34,.1)",
                  }}
                  type="button"
                >
                  {" "}
                  ADD TO CART
                </button>
                <button
                  onClick={() =>
                    this.byNow(
                      this.props.match.params.id,
                      this.state.size,
                      this.state.amountChoose
                    )
                  }
                  style={{
                    borderRadius: "2px",
                    marginLeft: "5%",

                    borderColor: "#ee4d2d",
                    height: "50px",
                    color: "white",
                    backgroundColor: "#ee4d2d",
                  }}
                  type="button"
                >
                  {" "}
                  BUY NOW
                </button>
              </div>
              <Modal
                title="Notification"
                visible={this.state.showModal}
                onOk={this.handleOk}
                // confirmLoading={confirmLoading}
                onCancel={this.handleCancel}
                okText="Login"
              >
                <p>You must Login to add this product to cart !</p>
              </Modal>
              {/* <button
                onClick={this.onCheckout}
                className="btn btn-default check_out"
                style={{
                  textAlign: "center",
                  marginLeft: "520px",
                  marginTop: "25px",
                }}
              >
                Continue Checkout
              </button> */}
            </div>
          </div>
        </section>
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
  getProductFromCart: () => dispatch(productActions.getProductFromCart),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProductDetail));
