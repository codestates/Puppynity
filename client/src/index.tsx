import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import { configureStore } from '@reduxjs/toolkit'; // for redux
import { Provider } from 'react-redux'; // for redux; 생성된 Store를 모든 태그가 공유할 수 있도록 하는 클래스
import App from './App';
import configureStore from './Redux/configureStore';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={configureStore}>
    <App />
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
