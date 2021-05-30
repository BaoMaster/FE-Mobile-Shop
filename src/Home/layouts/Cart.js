/* eslint-disable */
import { CloseOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Empty, Modal } from "antd";
import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";

import notification from "../../helper/Notification";
import productActions from "../../redux/product/actions";
import shopProduct from "../../redux/shopProduct/actions";

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: "",
      productInCart: [],
      header: [{ id: "", name: "", price: "" }],
      total: 0,
      finalTotal: 0,
      discount: 0,
      name: "",
      email: "",
      phone: "",
      address: "",
      notes: "",
      checkout: "",
      show: true,
      showModal: false,
      cart: [],
    };
  }
  componentDidMount = async () => {
    // if (localStorage.getItem("userauth")) {
    //   await this.setState({
    //     userid: localStorage.getItem("userauth").split("id")[1].split(`"`)[2],
    //   });
    //   this.getProductFromCart(this.state.userid);
    // }
    if (localStorage.getItem("cart")) {
      let cartList = [];
      let cart = localStorage.getItem("cart").split(",");
      console.log("test:", cart.length);
      const length = cart.length;
      for (let index = 0; index < length; index++) {
        // const element = array[index];
        let cartDetail = cart[index].split("-");
        cartList[index] = {
          productid: cartDetail[0],
          size: cartDetail[1],
          amount: cartDetail[2],
        };
        console.log("baotest:", cartList);
        if (parseInt(index) + 1 === length) {
          console.log("ummmm:", cartList, "-", length);
          await this.setState({ cart: cartList });
        }
      }
      console.log("cartlist:", this.state.cart);
      this.getProductFromCart(this.state.cart);
    }
    // let userid = localStorage.getItem("userauth").split("id")[1].split(`"`)[2];
    // this.props.getProductFromCart(userid);
    // console.log("baoooo:", userid);
  };
  addOne = (e, size) => {
    // const obj = {
    //   userid: localStorage.getItem("userauth").split("id")[1].split(`"`)[2],
    //   size: size,
    //   productid: e,
    // };
    // this.props.addOneInCart(obj);
    // this.getProductFromCart(this.state.userid);
    let cartMain = localStorage.getItem("cart");
    let cart = localStorage.getItem("cart").split("-");
    let cartList = localStorage.getItem("cart").split(",");
    for (let index = 0; index < cartList.length; index++) {
      // const element = array[index];

      console.log("bao:", cartList[index]);
      let cartDetail = cartList[index].split("-");
      if (cartDetail[0] === e && cartDetail[1] === size) {
        cartList[index] = e + "-" + size + "-" + (parseInt(cartDetail[2]) + 1);
        window.location.reload();

        localStorage.setItem("cart", cartList);
      }

      // else {
      //   localStorage.setItem(
      //     "cart",
      //     cartMain + "," + e + "-" + size + "-" + amount
      //   );
      //   window.location.reload();
      // }
    }

    // notification('success', 'Add product to cart success');
  };
  subOne = (e, size) => {
    let cartMain = localStorage.getItem("cart");
    let cart = localStorage.getItem("cart").split("-");
    let cartList = localStorage.getItem("cart").split(",");
    for (let index = 0; index < cartList.length; index++) {
      // const element = array[index];

      console.log("bao:", cartList[index]);
      let cartDetail = cartList[index].split("-");
      if (cartDetail[0] === e && cartDetail[1] === size) {
        cartList[index] = e + "-" + size + "-" + (parseInt(cartDetail[2]) - 1);
        window.location.reload();

        localStorage.setItem("cart", cartList);
      }
    }
    // const obj = {
    //   userid: localStorage.getItem("userauth").split("id")[1].split(`"`)[2],
    //   size: size,
    //   productid: e,
    // };
    // this.props.subOneInCart(obj);
    // this.getProductFromCart(this.state.userid);

    // notification('success', 'Add product to cart success');
  };
  onCheckout = () => {
    if (localStorage.getItem("userauth")) {
      var obj = {
        userid: this.state.userid,
        email: this.state.email,
        name: this.state.name,
        phone: this.state.phone,
        address: this.state.address,
        // total: this.state.finalTotal,
        total: this.state.total,
        discount: this.state.discount,
        product: this.state.checkout,
        note: this.state.note,
      };
      this.props.addToCheckout(obj).then((res) => {
        console.log("how:", res);
        this.props.history.push("/shop/checkout");
      });
    } else {
      this.setState({ showModal: true });
    }
  };
  handleDelete = (e, size) => {
    // productId.preventDefault();
    console.log("delete action:", this.state.userid);
    console.log("delete action aa:", e, size);
    const { userid } = this.state;

    let cartList = localStorage.getItem("cart").split(",");
    for (let index = 0; index < cartList.length; index++) {
      // const element = array[index];

      console.log("bao:", cartList[index]);
      let cartDetail = cartList[index].split("-");
      if (cartDetail[0] === e && cartDetail[1] === size) {
        cartList[index] = "";
        window.location.reload();
        // cartLists = cartList.substring(0, cartList.length - 1);
        localStorage.setItem("cart", cartList);
        const temp = localStorage.getItem("cart");
        if (temp.search(",,")) {
          const result = temp.replace(",,", ",");
          localStorage.setItem("cart", result);
        }
        if (temp.substr(-1) === ",") {
          const result = temp.substring(0, temp.length - 1);
          console.log("temp:", temp);
          console.log("result:", result);
          localStorage.setItem("cart", result);
        }
        if (temp.charAt(0) === ",") {
          const result = temp.substr(1);
          console.log("temp:", result);
          localStorage.setItem("cart", result);
        }

        // const result = temp.substring(0, temp.length - 1);
      }
    }
    // const obj = {
    //   userid: userid,
    //   productid: productId,
    // };
    // this.props.removeFromCart(obj).then((res) => {
    //   const { userid } = this.state;
    //   if (res.data.status === "success") {
    //     this.getProductFromCart(userid);
    //     notification(res.data.status, res.data.message);
    //     this.props.history.push("/shop/cart");
    //   }
    // });
  };
  handleOk = () => {
    this.props.history.push("/shop/login");
  };
  handleCancel = () => {
    this.setState({ showModal: false });
  };
  getProductFromCart = (data) => {
    // console.log("id:", userid);
    axios
      .post("http://localhost:3030/shop/api/getproductfromcart/", data)
      .then((res) => {
        console.log("try:", res.data.data);
        this.setState({
          productInCart: res.data.data,
        });
        console.log("carrtttt:", this.state.productInCart);
        if (res.data.data.length) {
          this.setState({ show: false });
        }
        console.log("state:", this.state.show);
        var temp = localStorage.getItem("userauth");
        const { productInCart } = this.state;
        localStorage.setItem("count", productInCart.length);
        var total = 0;
        var checkout = [];
        for (let index = 0; index < productInCart.length; index++) {
          checkout =
            checkout +
            productInCart[index].productid +
            "/" +
            productInCart[index].amount +
            "***";
          total =
            total +
            parseInt(productInCart[index].amount) *
              parseInt(productInCart[index].products.price);
        }
        this.setState({ total: total, checkout: checkout });
        console.log("baooo:", this.state.total);
        console.log("checkout:", this.state.checkout);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
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
      var result = productInCart.map((productInCart, index) => {
        return (
          <tr key={index}>
            {/* <td className='cart_product'>
            <a href=''>
              <img src='images/cart/one.png' alt='' />
            </a>
          </td> */}
            <td className="cart_description">
              {/* <h4>
                <a href=''>{productInCart.productid}</a>
              </h4> */}
              <img
                src={
                  "http://localhost:3030/images/product/" +
                  productInCart.products.illustration
                }
                style={{ height: "auto", width: "80px" }}
              ></img>
            </td>
            <td className="cart_name">
              <p>{productInCart.products.productname}</p>
            </td>
            <td className="cart_name">
              {/* <p>{productInCart.products.productname}</p> */}
              <p style={{ fontSize: "18px" }} className="cart_quantity_input">
                {productInCart.size}
              </p>
            </td>
            <td className="cart_price">
              <p>${productInCart.products.price}</p>
            </td>
            <td className="cart_quantity">
              <div className="cart_quantity_button">
                {/* <a href=''> + </a> */}

                <button
                  onClick={() =>
                    this.subOne(productInCart.productid, productInCart.size)
                  }
                  style={{
                    width: "28px",
                    height: "28px",
                  }}
                >
                  -
                </button>
                <input
                  id="amountChoose"
                  type="decimal"
                  value={productInCart.amount}
                  style={{ width: "30px", textAlign: "center" }}
                ></input>
                <button
                  onClick={() =>
                    this.addOne(productInCart.productid, productInCart.size)
                  }
                  style={{ width: "28px", height: "28px" }}
                >
                  +
                </button>
              </div>
            </td>
            <td className="cart_total">
              <p className="cart_total_price">
                {parseInt(productInCart.amount) *
                  parseInt(productInCart.products.price)}
                $
              </p>
            </td>
            <td>
              {/* <a className='cart_quantity_delete' href=''>
              <CloseOutlined />
            </a> */}
              <button
                className="btn btn-danger"
                type="button"
                onClick={() =>
                  this.handleDelete(productInCart.productid, productInCart.size)
                }
              >
                <CloseOutlined />
              </button>
            </td>
          </tr>
        );
      });
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
                <li className="active">Shopping Cart</li>
              </ol>
            </div>
            <div className="table-responsive cart_info">
              <table className="table table-condensed">
                <thead>
                  <tr className="cart_menu">
                    <td className="image">Item</td>
                    <td className="description">Product Name</td>
                    <td className="description">Size</td>
                    <td className="price">Price</td>
                    <td className="quantity">Quantity</td>
                    <td className="total">Total</td>
                    <td className="total">Action</td>
                    <td></td>
                  </tr>
                </thead>
                <tbody>
                  {/* <tr> {renderTableHeader}</tr> */}
                  {result}
                </tbody>
              </table>
            </div>
          </div>
        </section>
        <section id="do_action">
          <div className="container">
            <div className="row">
              {this.state.show == false && (
                <button
                  onClick={this.onCheckout}
                  className="btn btn-default check_out"
                  style={{
                    textAlign: "center",
                    marginLeft: "520px",
                    marginTop: "25px",
                  }}
                >
                  Continue Checkout
                </button>
              )}
            </div>
          </div>
        </section>
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
  addOneInCart: (data) => dispatch(shopProduct.addOneInCart(data)),
  subOneInCart: (data) => dispatch(shopProduct.subOneInCart(data)),

  getProductFromCart: () => dispatch(productActions.getProductFromCart),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Cart));
