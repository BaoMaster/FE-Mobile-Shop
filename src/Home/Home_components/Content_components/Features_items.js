/* eslint-disable */
import React from "react";


class Features_items extends React.Component {
  
  render() {
    return (
        <div className="features_items">
            <h2 className="title text-center">Features Items</h2>
            <div className="col-sm-4">
                <div className="product-image-wrapper">
                    <div className="single-products">
                            <div className="productinfo text-center">
                                <img src="public/assets/site/images/product1.jpg" />
                                <h2>$56</h2>
                                <p>Easy Polo Black Edition</p>
                                <a className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
                            </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
  }
}

export default Features_items;
