import axios from 'axios';

import * as authActions from '../../actions/auth';
import notification from '../../helper/Notification';

// import { UserRoles } from 'src/shared/library/helpers/userRoles';

const userActions = {
  getUsers: () => {
    return (dispatch) => {
      return axios.get(`./users/api/getall`);
    };
  },

  checkAuth: () => {
    return (dispatch) => {
      dispatch({ type: authActions.CHECK_AUTH });
    };
  },

  logout: () => {
    return (dispatch) => {
      dispatch({ type: authActions.LOGOUT });
    };
  },

  // getCompanyById: companyId => {
  //   return dispatch => {
  //     return axios.get(`./api/companies/${companyId}`);
  //   };
  // },

  // getSupportData: () => {
  //   return dispatch => {
  //     return axios.get(`./api/companies/support-data`);
  //   };
  // },

  // getSelections: () => () => axios.get(`./api/companies/selections`),

  deleteUser: (userId) => {
    return (dispatch) => {
      return axios.delete(`./users/api/delete/${userId}`);
    };
  },
  loginUser: (user) => {
    return (dispatch) => {
      dispatch({ type: authActions.LOGIN });
      try {
        axios
          .post('./api/loginadmin', user)
          .then((res) => {
            dispatch({ type: authActions.LOGIN_SUCCESS, data: res.data });
            notification(res.data.status, res.data.message);
            console.log('staus:', res.data.status, '-', res.data.message);
          })
          .catch((err) => {
            notification(err.response.data.status, err.response.data.message);
          });
      } catch (err) {
        // console.log("staus:", err.response.status, "-", err.response.message);

        dispatch({ type: authActions.LOGIN_FAIL, data: err?.response?.data });
      }
    };
  },
  addUser: (user) => {
    return (dispatch) => {
      return axios.post(`./api/register`, user);
    };
  },
  updateUser: (userId, user) => {
    return (dispatch) => {
      return axios.put(`./api/update/${userId}`, user);
    };
  },
  getUserById: (userId) => {
    return (dispatch) => {
      return axios.get(`./api/get-one/${userId}`);
    };
  },
  loginGuestUser: (user) => {
    return (dispatch) => {
      dispatch({ type: authActions.USER_LOGIN });
      try {
        axios
          .post('./api/login', user)
          .then((res) => {
            dispatch({ type: authActions.USER_LOGIN_SUCCESS, data: res.data });
            dispatch({ type: authActions.CHECK_AUTH_USER });
            notification(res.data.status, res.data.message);
            // console.log('res:', res);
          })
          .catch((err) => {
            // console.log('baoff', err.response.data);
            notification(err.response.data.status, err.response.data.message);
          });
      } catch (err) {
        dispatch({
          type: authActions.USER_LOGIN_FAIL,
          data: err?.response?.data,
        });
        // notification('error', 'Login Fail!');
        console.log('bao fail');
      }
    };
  },
};

export default userActions;
