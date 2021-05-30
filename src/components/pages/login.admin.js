import { Button, Checkbox, Form, Input } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import localStorageService from "../../config/LocalStorageService";
import notification from "../../helper/Notification";
import userActions from "../../redux/user/actions";

class Login extends Component {
  constructor(props) {
    super(props);
    // this.onChangeUserName = this.onChangeUserName.bind(this);
    // this.onChangeEmail = this.onChangeEmail.bind(this);
    // this.onChangePassword = this.onChangePassword.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      idverify: "",
      errors: {},
    };
  }

  //   onChangeUserName(e) {
  //     this.setState({
  //       username: e.target.value,
  //     });
  //   }

  //   onChangeEmail(e) {
  //     this.setState({
  //       email: e.target.value,
  //     });
  //   }

  //   onChangePassword(e) {
  //     this.setState({
  //       password: e.target.value,
  //     });
  //   }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  submit = () => {
    const obj = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(obj);
  };

  render() {
    const { errors } = this.state;
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };
    const tailLayout = {
      wrapperCol: { offset: 8, span: 16 },
    };

    const onFinish = (values) => {
      console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
    return (
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={this.submit}
        onFinishFailed={onFinishFailed}
      >
        <label>
          <h1 style={{ textAlign: "center" }}>ADMIN LOGIN</h1>
        </label>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
          style={{ marginTop: "80px" }}
        >
          <Input style={{ width: "40%" }} onChange={this.onChange} id="email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            style={{ width: "40%" }}
            onChange={this.onChange}
            id="password"
          />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox style={{ textAlign: "left", float: "left", clear: "both" }}>
            Remember me
          </Checkbox>
          <Link to="/list" style={{ marginLeft: "18%" }}>
            Forgot password
          </Link>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="submit" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      // <div style={{ marginTop: 10 }}>
      //   <h3>Login page :</h3>
      //   <form onSubmit={this.onSubmit}>
      //     <div className="form-group">
      //       <label>Email: </label>
      //       <input
      //         type="text"
      //         className="form-control"
      //         value={this.state.email}
      //         onChange={this.onChange}
      //         error={errors.name}
      //         id="email"
      //       />
      //       <span style={{ color: "red" }}>
      //         {errors.name}
      //         {errors.usernotfound}
      //         {errors.usernotverify}
      //       </span>
      //     </div>
      //     {/* <div className="form-group">
      //       <label>Email: </label>
      //       <input
      //         type="text"
      //         className="form-control"
      //         value={this.state.email}
      //         onChange={this.onChange}
      //         id="email"
      //       />
      //     </div> */}
      //     <div className="form-group">
      //       <label>Password: </label>
      //       <input
      //         type="password"
      //         className="form-control"
      //         value={this.state.password}
      //         onChange={this.onChange}
      //         error={errors.password}
      //         id="password"
      //       />
      //       <span style={{ color: "red" }}>
      //         {errors.password}
      //         {errors.passwordincorrect}
      //       </span>
      //     </div>
      //     <div className="form-group">
      //       <input type="submit" value="Login" className="btn btn-primary" />
      //       <Link
      //         to={"/forgotpassword"}
      //         className="btn btn-info"
      //         style={{ marginLeft: "20px" }}
      //       >
      //         Forgot password
      //       </Link>
      //     </div>
      //   </form>
      // </div>
    );
  }
}
// Login.propTypes = {
//   loginUser: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired,
//   errors: PropTypes.object.isRequired,
// };
// const mapStateToProps = (state) => ({
//   auth: state.auth,
//   errors: state.errors,
// });
// export default connect(mapStateToProps, { loginUser })(withRouter(Login));

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => ({
  deleteUser: (userId) => dispatch(userActions.deleteUser(userId)),
  updateUser: (userId, user) => dispatch(userActions.updateUser(userId, user)),
  getUserById: (userId) => dispatch(userActions.getUserById(userId)),
  addUser: (user) => dispatch(userActions.addUser(user)),
  loginUser: (user) => dispatch(userActions.loginUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
