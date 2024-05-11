import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import UsernameInfo from '../../Components/Signup/UsernameInfo.jsx';
import Preferences from '../../Components/Signup/Preferences.jsx';
import { BrowserRouter } from 'react-router-dom';


jest.mock('../../Components/Signup/SignupEndpoints', () => ({
  __esModule: true,
  default: jest.fn(),
}));



jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

test('should render a modal component with username and password', () => {
      // Initialize the props
      const props = {
        enteredUsername: '',
        enteredPassword: ''
      };

      // Render the component
      const wrapper = render(<UsernameInfo show onHide={() => {}} {...props} />);

      // Assert that the modal component is rendered
      const username = wrapper.getByTestId("username");
      expect(username).toBeInTheDocument();
      const password = wrapper.getByTestId("password");
      expect(password).toBeInTheDocument();
});

test('should disable Continue button when username input is invalid', () => {
      // Arrange
      const props = {
        enteredUsername: '',
        enteredPassword: '',
        onHide: jest.fn(),
        onEnteredUsername: jest.fn(),
        onEnteredPassword: jest.fn(),
        onBack: jest.fn()
      };

      // Act
      render(<UsernameInfo show onHide={() => {}} {...props} />);
      const input = screen.getByTestId("username");
      fireEvent.change(input, { target: { value: "a" } });
      fireEvent.blur(input);
      const button = screen.getByText("Continue");
      // Assert
      expect(button).toBeDisabled();
});

test("should disable Continue button when password input is invalid", () => {
      // Arrange
      const props = {
        enteredUsername: '',
        enteredPassword: '',
        onHide: jest.fn(),
        onEnteredUsername: jest.fn(),
        onEnteredPassword: jest.fn(),
        onBack: jest.fn()
      };

      // Act
      render(<UsernameInfo show onHide={() => {}} {...props} />);
      const input = screen.getByTestId("password");
      fireEvent.change(input, { target: { value: "a" } });
      fireEvent.blur(input);
      const button = screen.getByText("Continue");
      // Assert
      expect(button).toBeDisabled();
});

test('should enable continue button when username and password inputs are valid', () => {
        // Arrange
        const props = {
            enteredUsername: '',
            enteredPassword: '',
            onHide: jest.fn(),
            onEnteredUsername: jest.fn(),
            onEnteredPassword: jest.fn(),
            onBack: jest.fn()
        };
    
        // Act
        render(<UsernameInfo show onHide={() => {}} {...props} />);
        const usernameInput = screen.getByTestId("username");
        fireEvent.change(usernameInput, { target: { value: "validUsername" } });
        const passwordInput = screen.getByTestId("password");
        fireEvent.change(passwordInput, { target: { value: "validPassword" } });
        const button = screen.getByText("Continue");
        // Assert
        expect(button).toBeEnabled();
});

test('should click at least one preference to continue', () => {
        // Arrange
        const props = {
            enteredUsername: '',
            enteredPassword: '',
            onHide: jest.fn(),
            onEnteredUsername: jest.fn(),
            onEnteredPassword: jest.fn(),
            onBack: jest.fn()
        };
    
        // Act
        render(<Preferences show onHide={() => {}} {...props} />);
        const button = screen.getByText("Select at least 1 to continue");
        // Assert
        expect(button).toBeDefined();
});