/* eslint-disable */
import React from "react";

class Recommended_items extends React.Component {
  
  render() {
    return (
        <div className="recommended_items">
            <h2 className="title text-center">Recommended items</h2>    
            <div id="recommended-item-carousel" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                    <div className="item active">	
                        <div className="col-sm-4">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="public/assets/site/images/recommend1.jpg" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <a className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default Recommended_items;


								