import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router} from 'react-router-dom'
import 'antd/dist/antd.css';
import { ConfigProvider } from 'antd';


import './index.css';
import App from './App';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <ConfigProvider direction="rtl">
  <Router>
     <App />
  </Router>
  </ConfigProvider>

);

