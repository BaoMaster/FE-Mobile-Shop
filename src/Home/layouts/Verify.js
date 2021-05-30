/* eslint-disable */
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import userActions from "../../redux/user/actions";
import userGuestActions from "../../redux/user/userAction";

class Verify extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      message: "",
    };
  }
  componentDidMount = () => {
    this.props.verifyAccount(this.props.match.params.id).then((data) => {
      this.setState({ message: data.data.message });
      console.log("baooo:", data.data.message);
    });
  };

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
    console.log("sas:", e.target.value);
  };
  onclick = () => {
    this.props.history.push("/shop/login");
  };
  render() {
    return (
      <div style={{ textAlign: "center", height: "500px" }}>
        <h1 style={{ marginTop: "50px" }}>{this.state.message}</h1>
        <h2>Click here to return to the login page </h2>
        <button
          style={{
            borderRadius: "2px",

            borderColor: "#ee4d2d",
            height: "50px",
            color: "white",
            backgroundColor: "#ee4d2d",
          }}
          onClick={this.onclick}
        >
          Login Page
        </button>
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
  verifyAccount: (username) =>
    dispatch(userGuestActions.verifyAccount(username)),
});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Verify));

// export default Login;
