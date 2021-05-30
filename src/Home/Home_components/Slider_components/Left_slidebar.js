/* eslint-disable */
import { Slider, Switch } from "antd";
import React from "react";

import ShipLogo from "../../../shipping.jpg";

class Left_slidebar extends React.Component {
  render() {
    return (
      <div className="col-sm-3" style={{ backgroundColor: "#F0F0E9" }}>
        <div className="left-sidebar">
          <h2>Category</h2>
          <div className="panel-group category-products" id="accordian">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h4 className="panel-title">
                  <a href="/nike">Nike</a>
                </h4>
              </div>
            </div>
            <div className="panel panel-default">
              <div className="panel-heading">
                <h4 className="panel-title">
                  <a href="/ultraboost">Ultraboost</a>
                </h4>
              </div>
            </div>
            <div className="panel panel-default">
              <div className="panel-heading">
                <h4 className="panel-title">
                  <a href="/jordan">Jordan</a>
                </h4>
              </div>
            </div>
          </div>

          <div className="price-range">
            <h2>Price Range</h2>
            <div className="well text-center">
              <Slider range defaultValue={[20, 60]} />{" "}
              {/* <input type='text' className='span2' data-slider-min='0' data-slider-max='600' data-slider-step='5' data-slider-value='[250,450]' id='sl2' /> */}
              <br />
              <b className="pull-left">$ 0</b>{" "}
              <b className="pull-right">$ 100</b>
            </div>
          </div>
          <div className="shipping text-center">
            <img src={ShipLogo} />
          </div>
        </div>
      </div>
    );
  }
}

export default Left_slidebar;
