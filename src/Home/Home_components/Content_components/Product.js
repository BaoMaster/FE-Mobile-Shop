/* eslint-disable */
import React from "react";

class Products extends React.Component {
  
  render() {
    return (
        <div className="tab-content">
            <div className="tab-pane fade active in" id="tshirt" >
                <div className="col-sm-3">
                    <div className="product-image-wrapper">
                        <div className="single-products">
                            <div className="productinfo text-center">
                                <img src="public/assets/site/images/gallery1.jpg" />
                                <h2>$56</h2>
                                <p>Easy Polo Black Edition</p>
                                <a className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default Products;


								