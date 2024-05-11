import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Rules from './Rules';

describe('Rules', () => {
  test('renders Rules component', () => {
    render(<Rules subredditName="example" />);
    const rulesElement = screen.getByText(/Rules and Removal Reasons/i);
    expect(rulesElement).toBeInTheDocument();
  });

  test('opens and closes the modal', () => {
    render(<Rules subredditName="example" />);
    const addRuleButton = screen.getByText(/Add Rule/i);
    fireEvent.click(addRuleButton);
    const modalElement = screen.getByText(/Add Rule/i);
    expect(modalElement).toBeInTheDocument();
    const closeButton = screen.getByRole('button', { name: /Close/i });
    fireEvent.click(closeButton);
    expect(modalElement).not.toBeInTheDocument();
  });

  // Add more tests for other functionality of the Rules component
});