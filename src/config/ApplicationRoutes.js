import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Button, Layout, Dropdown, Menu, Modal } from "antd";
import jwt_decode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import { Redirect } from "react-router";

import * as authActions from "../actions/auth";
import SideNav from "../components/layouts/sidebar";
import Form from "../components/pages/form";
import Login from "../components/pages/login.admin";
import ProductList from "../components/pages/productList";
import OrderList from "../components/pages/orderList";
import ProductType from "../components/pages/product-type";
import Register from "../components/pages/register.admin";
import UserList from "../components/pages/userList";
import PrivateRoute from "../components/privateRoute";
import Home from "../Home/Home";
import Footer from "../Home/Home_components/Footer_components/Footer";
import Header_bottom from "../Home/Home_components/Header_components/Header_bottom";
import Header_middle from "../Home/Home_components/Header_components/Header_middle";
import Header_top from "../Home/Home_components/Header_components/Header_top";
import Slider from "../Home/Home_components/Slider_components/Slider";
import Cart from "../Home/layouts/Cart";
import Not_found from "../Home/layouts/Not_found";
import user from "../image/no-avatar.png";
import userActions from "../redux/user/actions";
import RedirectIfUserAuth from "./RedireactIfUserAuth";
import RedirectIfAuth from "./RedirectIfAuth";
import notification from "../helper/Notification";

// import List from "../components/pages/list";
// import File from "../components/pages/files";
// import Videos from "../components/pages/videos";
const { Header, Sider, Content } = Layout;
const { confirm } = Modal;

const ApplicationRoutes = (props) => {
  const { isAuthenticated, username } = props.auth;
  const [collapse, setCollapse] = useState(false);
  let history = useHistory();

  const dispatch = useDispatch();
  useEffect(() => {
    window.innerWidth <= 760 ? setCollapse(true) : setCollapse(false);
    dispatch({ type: authActions.CHECK_AUTH });
  }, []);

  const handleToggle = (event) => {
    event.preventDefault();
    collapse ? setCollapse(false) : setCollapse(true);
  };

  const logout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("userauth");
    // localStorage.setItem(
    //   'auth',
    //   JSON.stringify({
    //     token: '',
    //     username: '',
    //   })
    // );
    props.logout();
  };
  const info = (userId) => {
    this.setState({ ShowInfo: true });
    this.props.getUserById(userId).then((res) => {
      this.setState({
        address: res.data.data.address,
        avatar: res.data.data.avatar,
        dayOfBirth: res.data.data.dayOfBirth,
        email: res.data.data.email,
        phoneNumber: res.data.data.phoneNumber,
        role: res.data.data.role,
        username: res.data.data.username,
      });
    });
    console.log("baoooooo:", this.state.ShowInfo);
  };
  const showConfirm = () => {
    confirm({
      title: "This action will log out of the account",
      icon: <ExclamationCircleOutlined />,
      content: "are you sure ?",
      okText: "Logout",
      onOk() {
        // console.log('OK');
        localStorage.removeItem("auth");
        notification("success", `Logout Successfully`, "");
        // history.push("/admin");
        // history.push("/admin");
        window.location.reload();
      },
      onCancel() {
        // console.log('Cancel');
      },
    });
  };
  const menu = (
    <Menu>
      {/* <Menu.Item>
        <a onClick={() => info(this.state.userid)}>Account Information</a>
      </Menu.Item>
      <Menu.Item>
        <a onClick={""}>Change Password</a>
      </Menu.Item>
      <Menu.Item>
        <a onClick={() => info()}>Settings</a>
      </Menu.Item> */}
      <Menu.Item>
        <a onClick={showConfirm}>Logout</a>
      </Menu.Item>
    </Menu>
  );
  return (
    <React.Fragment>
      <Router>
        <Route exact path="/" component={Home} />
        <Route exact path="/:brand" component={Home} />
        {/* <RedirectIfUserAuth exact path={'/login'} component={Home} /> */}
        <RedirectIfUserAuth exact path="/shop/login" component={Home}>
          <Login />
        </RedirectIfUserAuth>
        <Route exact path="/detail/:id" component={Home} />
        <Route exact path="/verify/:id" component={Home} />
        <Route exact path="/orderhistory/:id" component={Home} />
        <Route exact path="/search/:keyword" component={Home} />
        <Route path="/shop/checkout" exact component={Home} />
        <Route path="/shop/aboutus" exact component={Home} />
        <Route path="/shop/cart" component={Home} />
        {/* <Route component={Not_found} /> */}

        <Route
          path={"/admin"}
          render={() => (
            <Layout>
              <Sider trigger={null} collapsible collapsed={collapse}>
                <SideNav />
              </Sider>
              <Layout>
                <Header
                  className="siteLayoutBackground"
                  style={{ padding: 0, background: "#001529" }}
                >
                  {React.createElement(
                    collapse ? MenuUnfoldOutlined : MenuFoldOutlined,
                    {
                      className: "trigger",
                      onClick: handleToggle,
                      style: {
                        color: "#fff",
                        clear: "both",
                        float: "left",
                        marginTop: "23px",
                      },
                    }
                  )}
                  <p style={{ color: "#fff", marginLeft: "70%" }}>
                    {/* {username ? username : 'You are not login'} */}
                    {isAuthenticated ? (
                      // <Button className='btn-delete' type='danger' onClick={logout}>
                      //   Logout
                      // </Button>
                      <Dropdown overlay={menu} placement="bottomCenter" arrow>
                        <img
                          style={{ width: "50px", marginLeft: "200px" }}
                          src={user}
                        ></img>
                      </Dropdown>
                    ) : (
                      "You are not login"
                    )}
                  </p>
                </Header>
                <Content
                  style={{
                    margin: "24px 16px",
                    padding: 24,
                    minHeight: "calc(100vh - 114px)",
                    background: "#fff",
                  }}
                >
                  <Switch>
                    <RedirectIfAuth exact path="/admin/login">
                      <Login />
                    </RedirectIfAuth>
                    <PrivateRoute
                      exact
                      path="/admin/userlist"
                      component={UserList}
                    />
                    <PrivateRoute
                      path="/admin/productlist"
                      component={ProductList}
                    />
                    <PrivateRoute
                      path="/admin/orderlist"
                      component={OrderList}
                    />
                    <PrivateRoute
                      path="/admin/product-type"
                      component={ProductType}
                    />
                    <Route path="/admin/register" component={Register} />
                    {/* <Route exact path="/admin/bao">
                      <Redirect to="/admin/login"></Redirect>
                    </Route> */}
                    <Redirect from="/admin" to="/admin/login" />
                    {/* <Route path="/list" component={List} /> */}
                    <Route path="/form" component={Form} />
                    {/* <Route path="/files" component={File} /> */}

                    {/* <Route path="/cart" component={Cart} /> */}

                    {/* <Route path="/videos" component={Videos} /> */}

                    {/* <PrivateRoute path='/sss'></PrivateRoute> */}
                  </Switch>
                </Content>
              </Layout>
            </Layout>
          )}
        />
        {/* <Route component={Home} /> */}
      </Router>
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkAuth: () => dispatch(userActions.checkAuth()),
    logout: () => dispatch(userActions.logout()),
  };
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationRoutes);
