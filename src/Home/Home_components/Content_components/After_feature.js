/* eslint-disable */
import React from "react";
import Products from "./Product";
import Product_bar from "./Product_bar";


class After_feature extends React.Component {
  
  render() {
    return (
        <div className="category-tab">
            <Product_bar />
            <Products />
        </div>
    );
  }
}

export default After_feature;
