import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import DirectiveWindow from './DirectiveWindow/DirectiveWindow';
import 'bootstrap/dist/css/bootstrap.min.css';

// import {io} from 'socket.io-client';

// export const socket = io('http://localhost:5000');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DirectiveWindow />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
