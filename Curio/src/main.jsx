/**
This file renders the React app and attaches it to the DOM.
@author @omar-adel1 
@global 
*/
import React from 'react'
import ReactDOM from 'react-dom';
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
const clientId = import.meta.env.VITE_CLIENT_ID;
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId={clientId}>
        <App />
      </GoogleOAuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
