import React from 'react';
import { render, screen } from '@testing-library/react';
import LoginPage from '../../Components/Login/LoginPagenents/Login/LoginPage'

describe('LoginPage', () => {
    test('renders LoginPage component', () => {
        render(<LoginPage />);
    });

    test('renders login modal', () => {
        render(<LoginPage />);
        const modalElement = screen.getByTestId('loginModal');
        expect(modalElement).toBeInTheDocument();
    });

    test('renders login button', () => {
        render(<LoginPage />);
        const buttonElement = screen.getByText(/login/i);
        expect(buttonElement).toBeInTheDocument();
    });
});