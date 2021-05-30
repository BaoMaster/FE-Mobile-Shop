import axios from 'axios';
import jwt_decode from 'jwt-decode';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';

import ApplicationRoutes from './config/ApplicationRoutes';
import localStorageService from './config/LocalStorageService';
import store from './store';

function App() {
  useEffect(() => {
    axios.interceptors.request.use(
      (config) => {
        const token = localStorageService.getAccessToken();
        if (token) {
          config.headers["Authorization"] = "Bearer " + token;
        }
        // config.headers['Content-Type'] = 'application/json';
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );
    if (localStorage.getItem("cart")) {
      console.log("cart", localStorage.getItem("cart").split(",").length);
    }
    // axios.interceptors.response.use(async (response) => {
    //   if (response.status === 401) {
    //     let temp = localStorage.getItem("accsess_token");
    //     let decode = jwt_decode(temp);
    //     console.log("decode:", decode);
    //     // TODO: call api refreshToken
    //     let { data } = await axios.post("/api/refreshToken", { decode });
    //     localStorageService.setToken(data.token);
    //     return;
    //     // return axios.request(response.request);
    //   }

    //   if (response.status === 403) {
    //     // TODO
    //     return;
    //   }

    //   return response;
    // });
  }, []);

  return (
    <Provider store={store}>
      <ApplicationRoutes />
    </Provider>
  );
}

export default App;
