import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import SocialMediaModal from '../../../Components/profileSetting/Socialmodal/SocialMediaModal';

describe('SocialMediaModal component', () => {
  beforeEach(() => {
    render(<SocialMediaModal />);
  });

  test('modal opens when button is clicked', () => {
    const button = screen.getByText(/Add Social Link/i);
    fireEvent.click(button);
    const modal = screen.getByRole('dialog');
    expect(modal).toBeInTheDocument();
  });

  test('modal closes when Save button is clicked', () => {
    const button = screen.getByText(/Add Social Link/i);
    fireEvent.click(button);
    const saveButton = screen.getByText(/Save/i);
    fireEvent.click(saveButton);
    const modal = screen.queryByRole('dialog');
    expect(modal).not.toBeInTheDocument();
  });

  test('display text input field updates correctly', () => {
    const displayTextInput = screen.getByPlaceholderText('Display text');
    fireEvent.change(displayTextInput, { target: { value: 'Test Display Text' } });
    expect(displayTextInput.value).toBe('Test Display Text');
  });

  test('URL input field updates correctly', () => {
    const urlInput = screen.getByPlaceholderText('https://www.webite.com/');
    fireEvent.change(urlInput, { target: { value: 'https://www.example.com' } });
    expect(urlInput.value).toBe('https://www.example.com');
  });

  test('displays "Invalid URL" error message if invalid URL is entered', () => {
    const urlInput = screen.getByPlaceholderText('https://www.webite.com/');
    fireEvent.change(urlInput, { target: { value: 'invalidurl' } });
    expect(screen.getByText('Invalid URL')).toBeInTheDocument();
  });

  test('displays "Domain is not allowed" error message if URL domain is not allowed', () => {
    const urlInput = screen.getByPlaceholderText('https://www.webite.com/');
    fireEvent.change(urlInput, { target: { value: 'https://www.anotherdomain.com' } });
    expect(screen.getByText('Domain is not allowed')).toBeInTheDocument();
  });
});

