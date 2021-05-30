/* eslint-disable */
import {
  CaretLeftOutlined,
  CaretRightOutlined,
  LeftOutlined,
  MessageOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Form, Modal, Tabs } from "antd";
import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import SlickSlider from "react-slick";

import notification from "../../../helper/Notification";
import shoes1 from "../../../image/giay1.jpg";
import shoes2 from "../../../image/giay2.jpg";
import shoes3 from "../../../image/giayadi3.jpg";
import shoes4 from "../../../image/4.jpg";
import shoes5 from "../../../image/5.jpg";
import ao1 from "../../../image/ao1.jpg";
import ao2 from "../../../image/ao2.jpg";
import ao3 from "../../../image/ao3.jpg";

import ShopProductActions from "../../../redux/shopProduct/actions";

const RenderArrow = ({ className, style, onClick, type }) => {
  return (
    <div className={className} style={{ ...style }} onClick={onClick}>
      {type === "pre" && (
        <LeftOutlined style={{ fontSize: 24, color: "black" }} />
      )}
      {type === "next" && (
        <RightOutlined
          style={{ fontSize: 24, color: "black", height: "50px" }}
        />
      )}
    </div>
  );
};

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      price: "",
      productname: "",
      productcode: "",
      illustration: "",
      isShowModal: false,
      productId: "",
      brand: "",
      id: "",
    };
  }
  handleSelect = async (productId) => {
    this.props.history.push("/detail/" + productId);
  };
  // handleSelect = async (productId) => {
  //   console.log("clicked");
  //   await this.setState({ isShowModal: true, productId: productId });
  //   console.log("bao:", this.state.isShowModal);
  //   this.props.getProductById(productId).then((res) => {
  //     this.setState({
  //       // id: res.data.data.id,
  //       productname: res.data.data.productname,
  //       productcode: res.data.data.productcode,
  //       illustration: res.data.data.illustration,
  //       price: res.data.data.price,
  //       description: res.data.data.description,
  //       brand: res.data.data.brand,
  //     });
  //     console.log("bao:", res.data.data.productname);
  //   });
  // };
  handleCancel = () => {
    this.setState({ isShowModal: false });
    console.log("status:", this.state.isShowModal);
  };
  handleOk = () => {
    this.setState({ isShowModal: false });
    const obj = {
      productId: this.state.id,
      userId: localStorage.getItem("userauth").split("id")[1].split(`"`)[2],
    };
    // console.log("baoo:", obj);
  };
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 800,
      autoplay: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <RenderArrow type={"next"} />,
      prevArrow: <RenderArrow type={"pre"} />,
    };
    return (
      <div className="container" style={{ width: "845px", marginTop: "30px" }}>
        <div className="row">
          <div className="col-sm-12">
            <div
              id="slider-carousel"
              className="carousel slide"
              data-ride="carousel"
            >
              {/* <div className='carousel-inner'>
                <div className='item active'>
                  <div className='col-sm-6'>
                    <h1>
                      <span>Watch</span>-Shop
                    </h1>
                    <p>Welcome to greate website to buy Real Watch</p>
                  </div>
                  <div className='col-sm-6'>
                    <img src={Rolex} className='girl img-responsive' />
                  </div>
                </div>
              </div> */}
              <div>
                <SlickSlider {...settings}>
                  <div
                    onClick={(e) => this.handleSelect("1")}
                    className="col-sm-6"
                    style={{ marginTop: "10px" }}
                  >
                    <div
                      style={{
                        marginTop: "5px",
                        float: "left",
                        textAlign: "center",
                        width: "60%",
                      }}
                    >
                      <h2> Nike Air Jordan 1 Mid</h2>
                      <h3>Color: Red/White</h3>
                      <p>
                        The Spider-Man x Air Jordan 1 on the upper feature a
                        tonal dot print that is also reflective, referencing
                        Spider-Man¬ís suit. The Nike Air tongue tag is presented
                        in blue and red as another nod to the superhero, while
                        an icy clear outsole completes the colorway. Released on
                        December 14, 2018 to coincide with the opening of the
                        film, the Spider-Man
                      </p>
                    </div>
                    <div>
                      <img
                        style={{ paddingLeft: "50px", width: "300px" }}
                        src={shoes1}
                        className="girl img-responsive"
                      />
                    </div>
                  </div>
                  <div onClick={(e) => this.handleSelect("2")}>
                    <div
                      style={{
                        float: "left",
                        textAlign: "center",
                        width: "60%",
                      }}
                    >
                      <h2> Nike Air Jordan 1 Mid z700 </h2>
                      <h3>Color: Red/White</h3>
                      <p>
                        With buzz around the Dior x AJ1 stembraces such
                        connections as palettes are nearly shot-for-shot the
                        same as its high-end counterpart, though sans any of the
                        luxury imprint’s signature all-over graphic or their
                        luxe Italian made leathers.#airjordan1mid
                      </p>
                    </div>
                    <div>
                      <img
                        style={{ paddingLeft: "50px", width: "300px" }}
                        src={shoes2}
                        className="girl img-responsive"
                      />
                    </div>
                  </div>
                  <div onClick={(e) => this.handleSelect("3")}>
                    <div
                      style={{
                        float: "left",
                        textAlign: "center",
                        width: "60%",
                      }}
                    >
                      <h2> Nike SUPERSTAR 100 </h2>
                      <h3>Color: Black/White</h3>
                      <p>
                        Originally made for basketball courts in the '70s.
                        Celebrated by hip hop royalty in the '80s. The adidas
                        Superstar shoe is now a lifestyle staple for streetwear
                        enthusiasts. The world-famous shell toe feature remains,
                        providing style and protection. Just like it did on the
                        B-ball courts back in the day.
                      </p>
                    </div>
                    <div>
                      <img
                        style={{ paddingLeft: "50px", width: "300px" }}
                        src={shoes3}
                        className="girl img-responsive"
                      />
                    </div>
                  </div>
                </SlickSlider>
              </div>
              <div>
                {/* {this.state.isShowModal === true && ( */}
                <>
                  {/* {console.log('that work')} */}
                  <Modal
                    okText="Add to Cart"
                    className="company-details"
                    title="Product Details"
                    visible={this.state.isShowModal}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                  >
                    <Form>
                      <h1>{this.state.productname}</h1>
                      <div
                        style={{
                          float: "left",
                          textAlign: "center",
                          width: "60%",
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  deleteProduct: (productId) =>
    dispatch(ShopProductActions.deleteProduct(productId)),
  updateProductr: (productId, product) =>
    dispatch(ShopProductActions.updateProduct(productId, product)),
  getProductById: (productId) =>
    dispatch(ShopProductActions.getProductById(productId)),
  addProduct: (product) => dispatch(ShopProductActions.addProduct(product)),
});

export default connect(null, mapDispatchToProps)(withRouter(Slider));

// export default Slider;
