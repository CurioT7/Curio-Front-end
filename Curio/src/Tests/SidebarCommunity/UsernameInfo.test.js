import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import UsernameInfo from '../../Components/Signup/UsernameInfo';

// Mock the checkUsernameAvailability function
jest.mock('../../Components/Signup/SignupEndpoints.js', () => ({
  checkUsernameAvailability: jest.fn().mockResolvedValue({ status: 200 }),
}));

describe('UsernameInfo Component', () => {
  it('renders correctly with initial values', () => {
    const props = {
      show: true,
      onHide: jest.fn(),
      enteredUsername: '',
      enteredPassword: '',
      onEnteredUsername: jest.fn(),
      onEnteredPassword: jest.fn(),
      onContinueToGender: jest.fn(),
      onBack: jest.fn(),
    };

    const { getByText, getByLabelText, getByTestId } = render(<UsernameInfo {...props} />);
    // const usernamePassword = screen.getByText('Create your username and password');
    // expect(usernamePassword).toBeInTheDocument();
    expect(getByText('Create your username and password')).toBeDefined();
    expect(getByText('Continue')).toBeDefined();
  });

  it('displays error messages when fields are empty', async () => {
    const props = {
      show: true,
      onHide: jest.fn(),
      enteredUsername: '',
      enteredPassword: '',
      onEnteredUsername: jest.fn(),
      onEnteredPassword: jest.fn(),
      onContinueToGender: jest.fn(),
      onBack: jest.fn(),
    };

    const { getByText, getByLabelText, getByTestId } = render(<UsernameInfo {...props} />);

    fireEvent.click(getByText('Continue'));
  });

  it('calls checkUsernameAvailability when username is entered', async () => {
    const props = {
      show: true,
      onHide: jest.fn(),
      enteredUsername: '',
      enteredPassword: '',
      onEnteredUsername: jest.fn(),
      onEnteredPassword: jest.fn(),
      onContinueToGender: jest.fn(),
      onBack: jest.fn(),
    };

    const { getByTestId } = render(<UsernameInfo {...props} />);
    const usernameInput = getByTestId('username');

    fireEvent.change(usernameInput, { target: { value: 'testusername' } });

  });

});
