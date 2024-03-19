import React from 'react';
import { render, fireEvent, getByTestId } from '@testing-library/react';
import Safety from '../../../Components/SafetyPrivacy/Safety/Safety'; 
import '@testing-library/jest-dom';

describe('Safety component', () => {
    test('Adds blocked user correctly', () => {
        const { getByPlaceholderText, getByText, getByTestId } = render(<Safety />);
        const input = getByPlaceholderText('Block new user');
        const addButton = getByTestId('add-block-user'); 
    
        fireEvent.change(input, { target: { value: 'BlockedUser1' } });
        fireEvent.click(addButton);
    
        expect(input.value).toBe('');
        expect(getByText('BlockedUser1')).toBeInTheDocument();
      });

  test('Adds muted community correctly', () => {
    const { getByPlaceholderText, getByText, getByTestId } = render(<Safety />);
    const input = getByPlaceholderText('Mute new community');
    const addButton = getByTestId('add-mute-community');

    fireEvent.change(input, { target: { value: 'MutedCommunity1' } });
    fireEvent.click(addButton);

    expect(input.value).toBe('');
    expect(getByText('MutedCommunity1')).toBeInTheDocument();
  });

});
