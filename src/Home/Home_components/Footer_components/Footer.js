/* eslint-disable */
import React from "react";

class Footer extends React.Component {
  render() {
    return (
      <footer id="footer">
        <div className="footer-widget">
          <div className="container">
            <div className="row">
              <div className="col-sm-2">
                <div className="single-widget">
                  <h2>Service</h2>
                  <ul className="nav nav-pills nav-stacked">
                    <li>
                      <a>Online Help</a>
                    </li>
                    <li>
                      <a>Contact Us</a>
                    </li>
                    <li>
                      <a>Order Status</a>
                    </li>
                    <li>
                      <a>Change Location</a>
                    </li>
                    <li>
                      <a>FAQ’s</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-2">
                <div className="single-widget">
                  <h2>Category </h2>
                  <ul className="nav nav-pills nav-stacked">
                    <li>
                      <a>Jordan</a>
                    </li>
                    <li>
                      <a>Converse</a>
                    </li>
                    <li>
                      <a>Adidas</a>
                    </li>
                    <li>
                      <a>Yeezy</a>
                    </li>
                    <li>
                      <a>Vans</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-2">
                <div className="single-widget">
                  <h2>Policies</h2>
                  <ul className="nav nav-pills nav-stacked">
                    <li>
                      <a>Terms of Use</a>
                    </li>
                    <li>
                      <a>Privecy Policy</a>
                    </li>
                    <li>
                      <a>Refund Policy</a>
                    </li>
                    <li>
                      <a>Billing System</a>
                    </li>
                    <li>
                      <a>Ticket System</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-2">
                <div className="single-widget">
                  <h2>About Shop</h2>
                  <ul className="nav nav-pills nav-stacked">
                    <li>
                      <a>Company Information</a>
                    </li>
                    <li>
                      <a>Careers</a>
                    </li>
                    <li>
                      <a>Store Location</a>
                    </li>
                    <li>
                      <a>Affillate Program</a>
                    </li>
                    <li>
                      <a>Copyright</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-3 col-sm-offset-1">
                <div className="single-widget">
                  <h2>About Shop</h2>
                  <form action="#" className="searchform">
                    <input type="text" placeholder="Your email address" />
                    <button type="submit" className="btn btn-default">
                      <i className="fa fa-arrow-circle-o-right"></i>
                    </button>
                    <p>
                      Get the most recent updates from <br />
                      our site and be updated your self...
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom"></div>
      </footer>
    );
  }
}

export default Footer;
