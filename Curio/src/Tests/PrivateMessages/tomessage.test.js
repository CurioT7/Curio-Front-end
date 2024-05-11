import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ToMessage from '../../Components/Private_Messages/to_message/to_message';


describe('ToMessage component', () => {
    test('calls setRecipient function with input value when input changes', () => {
      const setRecipient = jest.fn();
      const { getByTestId } = render(<ToMessage setRecipient={setRecipient} />);
      const input = getByTestId('to-message-input');
  
      fireEvent.change(input, { target: { value: 'testRecipient' } });
  
      expect(setRecipient).toHaveBeenCalledWith('testRecipient');
    });
    test('renders input element', () => {
        const { getByTestId } = render(<ToMessage setRecipient={() => {}} />);
        const input = getByTestId('to-message-input');
    
        expect(input).toBeInTheDocument();
      });
    
      test('input value updates correctly', () => {
        const setRecipient = jest.fn();
        const { getByTestId } = render(<ToMessage setRecipient={setRecipient} />);
        const input = getByTestId('to-message-input');
    
        fireEvent.change(input, { target: { value: 'newRecipient' } });
    
        expect(input.value).toBe('newRecipient');
      });
  });