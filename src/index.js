import './index.css';
import 'antd/dist/antd.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import ApplicationRoutes from './config/ApplicationRoutes';
import Home from './Home/Home';
import reportWebVitals from './reportWebVitals';

axios.defaults.baseURL = process.env.URL || 'http://localhost:8080';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
