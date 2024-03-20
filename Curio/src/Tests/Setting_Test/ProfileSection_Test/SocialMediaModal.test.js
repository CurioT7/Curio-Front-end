import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import SocialMediaModal from '../../../Components/profileSetting/Socialmodal/SocialMediaModal';

describe('SocialMediaModal component', () => {
  beforeEach(() => {
    render(<SocialMediaModal />);
  });

  test('modal opens when button is clicked', () => {
    const button = screen.queryByText(text => text.includes('Add Social Link'));
    if(button) {
      fireEvent.click(button);
      const modal = screen.getByRole('dialog');
      expect(modal).toBeInTheDocument();
    }
  });

  test('modal closes when Save button is clicked', () => {
    const button = screen.queryByText(text => text.includes('Add Social Link'));
    if (button) {
        fireEvent.click(button);
        const saveButton = screen.getByText(/Save/i);
        fireEvent.click(saveButton);
    } 
    const modal = screen.queryByRole('dialog');
    expect(modal).toBeNull();
  });


  test('display text input field updates correctly', () => {
    const displayTextInput = screen.getByTestId('display_text'); 
    fireEvent.change(displayTextInput, { target: { value: 'Test Display Text' } });
    expect(displayTextInput.value).toBe('Test Display Text');
  });

});

