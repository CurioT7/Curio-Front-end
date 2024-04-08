import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../../Components/Login/Login';

describe('Login', () => {
    test('renders Login component', () => {
        render(<Login />);
        const loginComponent = screen.getByTestId('loginComponent');
        expect(loginComponent).toBeInTheDocument();
    });

    test('renders login button', () => {
        render(<Login />);
        const buttonElement = screen.getByText("Continue with Google");
        expect(buttonElement).toBeInTheDocument();
    });

    test('renders forgot username link', () => {
        render(<Login />);
        const linkElement = screen.getByText("username");
        expect(linkElement).toBeInTheDocument();
    });

    test('renders forgot password link', () => {
        render(<Login />);
        const linkElement = screen.getByText("password");
        expect(linkElement).toBeInTheDocument();
    });

    test('disables the login button when username or password is invalid', () => {
        render(<Login />);
        
        const buttonElement = screen.getByText('Login');
        const usernameInput = screen.getByPlaceholderText('Username *');
        const passwordInput = screen.getByPlaceholderText('Password *');
      
        fireEvent.change(usernameInput, { target: { value: '' } });
        fireEvent.change(passwordInput, { target: { value: '' } });
      
        expect(buttonElement).toBeDisabled();
    });
});
