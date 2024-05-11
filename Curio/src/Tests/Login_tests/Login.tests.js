import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Login from './Login';
import { loginUser } from './LoginEndpoints';

jest.mock('./LoginEndpoints', () => ({
  loginUser: jest.fn(),
}));

describe('<Login />', () => {
  test('renders without crashing', () => {
    render(
      <Router>
        <GoogleOAuthProvider clientId="your-google-oauth-client-id">
          <Login
            forgotUser={false}
            setForgotUser={() => {}}
            forgotPass={false}
            setForgotPass={() => {}}
            isOpen={true}
            setIsOpen={() => {}}
          />
        </GoogleOAuthProvider>
      </Router>
    );
  });
});