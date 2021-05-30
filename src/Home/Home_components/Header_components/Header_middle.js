/* eslint-disable */
import React from "react";
import Logo from "../../../logo.png";
import { BrowserRouter as Router ,Route, NavLink } from "react-router-dom";


class Header_middle extends React.Component {
  
  render() {
    return (
        <div className="header-middle clr-white">
            <div className="container">
                <div className="row">
                    <div className="col-sm-4">
                        <div className="mainmenu pull-left">
                            <ul className="nav navbar-nav collapse navbar-collapse">
                                <li><NavLink to='/' activeClassName="active">Home</NavLink></li>
                                <li><NavLink to='/contact'>Contact</NavLink></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-sm-8">
                        <div className="shop-menu pull-right">
                            <ul className="nav navbar-nav">
                                <li><NavLink activeClassName="active" to="/checkout"><i className="fa fa-crosshairs"></i> Checkout</NavLink></li>
                                <li><NavLink activeClassName="active" to='/cart'><i className="fa fa-shopping-cart"></i> Cart</NavLink></li>
                                <li><NavLink activeClassName="active" to="/login"><i className="fa fa-lock"></i> Login</NavLink></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default Header_middle;
