import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ResetPass from './ResetPass';

describe('ResetPass', () => {
  test('renders ResetPass component', () => {
    render(<ResetPass />);
    // Assert that the component renders without throwing an error
  });

  test('handles password input change', () => {
    render(<ResetPass />);
    const passwordInput = screen.getByPlaceholderText('New Password *');
    fireEvent.change(passwordInput, { target: { value: 'newpassword' } });
    // Assert that the password state is updated correctly
  });

  test('handles newPassword input change', () => {
    render(<ResetPass />);
    const newPasswordInput = screen.getByPlaceholderText('Confirm Password *');
    fireEvent.change(newPasswordInput, { target: { value: 'newpassword' } });
    // Assert that the newPassword state is updated correctly
  });

  test('displays "Password does not match" when passwords do not match', () => {
    render(<ResetPass />);
    const passwordInput = screen.getByPlaceholderText('New Password *');
    const newPasswordInput = screen.getByPlaceholderText('Confirm Password *');
    fireEvent.change(passwordInput, { target: { value: 'password1' } });
    fireEvent.change(newPasswordInput, { target: { value: 'password2' } });
    // Assert that the "Password does not match" message is displayed
  });

  test('submits the form when Set Password button is clicked', () => {
    render(<ResetPass />);
    const setPasswordButton = screen.getByText('Set Password');
    fireEvent.click(setPasswordButton);
    // Assert that the form is submitted
  });
});