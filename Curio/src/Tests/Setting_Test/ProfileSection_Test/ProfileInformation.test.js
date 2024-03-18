import { render, fireEvent, screen } from '@testing-library/react';
import ProfileInformation from "../../../Components/profileSetting/ProfileInformation/ProfileInformation";

describe("ProfileInformation Component Tests", () =>{
  beforeEach(() => {
    render(<ProfileInformation />);
  });

  test('Display name input updates state correctly', () => {
    const displayNameInput = screen.getByPlaceholderText('Display name (optional)');
    fireEvent.change(displayNameInput, { target: { value: 'Display name' } });
    expect(displayNameInput.value).toBe('Display name');
  });
  
  test('About textarea updates state correctly', () => {
    const aboutTextarea = screen.getByPlaceholderText('About (optional)');
    fireEvent.change(aboutTextarea, { target: { value: 'A brief description.' } });
    expect(aboutTextarea.value).toBe('A brief description.');
  });
  
  test('Display remaining characters for display name input', () => {
    const displayNameInput = screen.getByPlaceholderText('Display name (optional)'); 
    fireEvent.change(displayNameInput, { target: { value: 'Display name' } });
    expect(screen.getByText('18 Characters remaining')).toBeTruthy(); 
  });
  
  test('Display remaining characters for about textarea', () => {
    const aboutTextarea = screen.getByPlaceholderText('About (optional)');
    fireEvent.change(aboutTextarea, { target: { value: 'A brief description.' } });
    expect(screen.getByText('180 Characters remaining')).toBeTruthy();
  });
  
  test('Change class when remaining characters are exceeded for display name input', () => {
    const displayNameInput = screen.getByPlaceholderText('Display name (optional)');
    fireEvent.change(displayNameInput, { target: { value: 'John DoeJohn DoeJohn DoeJohn DoeJohn DoeJohn Doe' } });
    expect(displayNameInput.parentNode.querySelector('.word-remaining').classList.contains('text-danger')).toBe(true); 
  });
  
  test('Change class when remaining characters are exceeded for about textarea', () => {
    const aboutTextarea = screen.getByPlaceholderText('About (optional)');
    fireEvent.change(aboutTextarea, { target: { value: 'A brief description.A brief description.A brief description.A brief description.A brief description.A brief description.A brief description.A brief description.A brief description.A brief description.A brief description.A brief description.A brief description.A brief description.A brief description.A brief description.' } });
    expect(aboutTextarea.parentNode.querySelector('.word-remaining').classList.contains('text-danger')).toBe(true);
  });
})

