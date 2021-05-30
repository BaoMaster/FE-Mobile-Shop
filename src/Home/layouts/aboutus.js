/* eslint-disable */
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import userActions from "../../redux/user/actions";
import userGuestActions from "../../redux/user/userAction";
import about from "../../image/about.jpg";

class AboutUs extends React.Component {
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
        <img src={about}></img>
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
)(withRouter(AboutUs));

// export default Login;
