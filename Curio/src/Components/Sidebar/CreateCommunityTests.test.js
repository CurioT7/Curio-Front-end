import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import CreateCommunity from './CreateCommunity';
import '@testing-library/jest-dom';



test('validates community name length with 3 characters', () => {
  const { getByPlaceholderText } = render(<CreateCommunity show onHide={() => {}} />);
  const inputField = screen.getByPlaceholderText('');
  fireEvent.change(inputField, { target: { value: 'abc' } });
  fireEvent.blur(inputField);
  expect(inputField.style.border).toBe('');
});

test('validates community name length with 3 characters', () => {
  const { getByPlaceholderText } = render(<CreateCommunity show onHide={() => {}} />);
  const inputField = screen.getByPlaceholderText('');
  fireEvent.change(inputField, { target: { value: 'ab' } });
  fireEvent.blur(inputField);
  expect(inputField.style.border).toBe('3px solid #a50016');
});

test('validates community name length with 3 characters', () => {
  const { getByPlaceholderText } = render(<CreateCommunity show onHide={() => {}} />);
  const inputField = screen.getByPlaceholderText('');
  fireEvent.change(inputField, { target: { value: '' } });
  fireEvent.blur(inputField);
  expect(inputField.style.border).toBe('3px solid #a50016');
});


test('validates that button is inactive when input is empty', () => {
  const { getByPlaceholderText } = render(<CreateCommunity show onHide={() => {}} />);
  const inputField = screen.getByPlaceholderText('');
  expect(screen.getByText('Create your community')).toBeDisabled();
});

test('validates that button contains community name', () => {
  const { getByPlaceholderText } = render(<CreateCommunity show onHide={() => {}} />);
  const inputField = screen.getByPlaceholderText('');
  const button = screen.getByText('Create your community');
  fireEvent.change(inputField, { target: { value: 'abc' } });
  const button2 = screen.getByText(`Create r/abc`);
  expect(button2).toBeDefined();
});
