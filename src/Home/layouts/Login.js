/* eslint-disable */
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import userActions from "../../redux/user/actions";
import userGuestActions from "../../redux/user/userAction";

class UserLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      phone: "",
      address: "",
    };
  }
  onSubmitLogin = (e) => {
    e.preventDefault();
    const obj = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginGuestUser(obj);
  };
  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
    console.log("sas:", e.target.value);
  };
  onSubmitRegister = (e) => {
    e.preventDefault();

    const obj = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      phone: this.state.phone,
      address: this.state.address,
    };
    this.props.addGuestUser(obj).then((data) => {
      // this.props.history.push('/verify/'+data);
    });
  };
  render() {
    return (
      <div>
        <section id="form">
          <div className="container">
            <div className="row">
              <div className="col-sm-4 col-sm-offset-1">
                <div className="login-form">
                  <h2>Login to your account</h2>
                  <form onSubmit={this.onSubmitLogin}>
                    <input
                      type="text"
                      placeholder="Email Address"
                      onChange={this.onChange}
                      //   value={this.state.email}
                      id="email"
                      required
                      //   message={"please input email"}
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      onChange={this.onChange}
                      //   value={this.state.password}
                      id="password"
                      required
                    />
                    {/* <span>
                                        <input type="checkbox" className="checkbox" /> 
                                        Keep me signed in
                                    </span> */}
                    <button type="submit" className="btn btn-default">
                      Login
                    </button>
                  </form>
                </div>
              </div>
              <div className="col-sm-1">
                <h2 className="or">OR</h2>
              </div>
              <div className="col-sm-4">
                <div className="signup-form">
                  <h2>New User Signup!</h2>
                  <form onSubmit={this.onSubmitRegister}>
                    <input
                      type="text"
                      placeholder="Name"
                      onChange={this.onChange}
                      id="username"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      onChange={this.onChange}
                      id="email"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Phone"
                      onChange={this.onChange}
                      id="phone"
                      required
                    />
                    <input
                      type="text"
                      placeholder="address"
                      onChange={this.onChange}
                      id="address"
                      required
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      onChange={this.onChange}
                      id="password"
                      required
                    />
                    <button type="submit" className="btn btn-default">
                      Signup
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
const mapDispatchToProps = (dispatch) => ({
  deleteGuestUser: (userId) =>
    dispatch(userGuestActions.deleteGuestUser(userId)),
  updateGuestUser: (userId, user) =>
    dispatch(userGuestActions.updateGuestUser(userId, user)),
  getGuestUserById: (userId) =>
    dispatch(userGuestActions.getGuestUserById(userId)),
  addGuestUser: (user) => dispatch(userGuestActions.addGuestUser(user)),
  // loginGuestUser: (user) => dispatch(userGuestActions.loginGuestUser(user)),
  loginGuestUser: (user) => dispatch(userActions.loginGuestUser(user)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UserLogin));

// export default Login;
