/* eslint-disable */
import React from "react";
import { BrowserRouter as Router ,Route, Switch } from "react-router-dom";

import Features_items from "./Features_items";
import Products from "./Product";
import Product_bar from "./Product_bar";
import Recommended_items from "./Recommended_items";
import Left_slidebar from "../Slider_components/Left_slidebar";
import After_feature from "./After_feature";

class Subcontent extends React.Component {
  
  render() {
    return (
        <div>
            <Features_items />
            <After_feature />
            <Recommended_items />
        </div>				
    );
  }
}

export default Subcontent;
