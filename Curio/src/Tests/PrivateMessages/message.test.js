import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Message from '../../Components/Private_Messages/message/message';
import '@testing-library/jest-dom';

describe('Message component', () => {
  test('calls setMessage function with input value when input changes', () => {
    const setMessage = jest.fn();
    const { getByTestId } = render(<Message setMessage={setMessage} />);
    const textarea = getByTestId('message-textarea');

    fireEvent.change(textarea, { target: { value: 'testMessage' } });

    expect(setMessage).toHaveBeenCalledWith('testMessage');
  });

  test('renders textarea element', () => {
    const { getByTestId } = render(<Message setMessage={() => {}} />);
    const textarea = getByTestId('message-textarea');

    expect(textarea).toBeInTheDocument();
  });

  test('textarea value updates correctly', () => {
    const setMessage = jest.fn();
    const { getByTestId } = render(<Message setMessage={setMessage} />);
    const textarea = getByTestId('message-textarea');

    fireEvent.change(textarea, { target: { value: 'newMessage' } });

    expect(textarea.value).toBe('newMessage');
  });
});
