/**
This file renders the React app and attaches it to the DOM.
@author @omar-adel1 
@global 
*/
import React from 'react'
import ReactDOM from 'react-dom';
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
