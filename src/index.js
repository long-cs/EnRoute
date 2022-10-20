import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';

// axios.defaults.baseURL = "http://184.169.242.37:8000";
axios.defaults.baseURL = process.env.REACT_APP_SERVER_ENDPOINT
// axios.defaults.baseURL = "https://server.whatsenroute.org/";
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';

ReactDOM.render(
  //  "proxy": "http://184.169.242.37:8000",
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
