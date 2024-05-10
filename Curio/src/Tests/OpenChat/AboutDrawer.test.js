import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AboutDrawer from '../../Components/OpenChat/HeaderChatRight_Side/AboutDrawer/AboutDrawer';
import '@testing-library/jest-dom';

// Mock props
const mockProps = {
  isOpen: true,
  onClose: jest.fn()
};

describe('AboutDrawer component', () => {
  it('renders properly', () => {
    const { getByText, getByPlaceholderText } = render(<AboutDrawer {...mockProps} />);
    
    // Ensure the drawer header is rendered
    expect(getByText('Chat information')).toBeInTheDocument();

    // Ensure the input field for group name is rendered
    const groupNameInput = getByPlaceholderText('Group Name');
    expect(groupNameInput).toBeInTheDocument();

    // Ensure the buttons for switching sections are rendered
    expect(getByText('2 Members')).toBeInTheDocument();
    expect(getByText('2 Invited')).toBeInTheDocument();
  });

  it('calls onClose when cancel button is clicked', () => {
    const { getByText } = render(<AboutDrawer {...mockProps} />);
    const cancelButton = getByText('Cancel');
    fireEvent.click(cancelButton);
    expect(mockProps.onClose).toHaveBeenCalled();
  });

  it('updates group name input value', () => {
    const { getByPlaceholderText } = render(<AboutDrawer {...mockProps} />);
    const groupNameInput = getByPlaceholderText('Group Name');
    fireEvent.change(groupNameInput, { target: { value: 'New Group Name' } });
    expect(groupNameInput.value).toBe('New Group Name');
  });

  it('enables save button when group name is not empty', () => {
    const { getByText, getByPlaceholderText } = render(<AboutDrawer {...mockProps} />);
    const groupNameInput = getByPlaceholderText('Group Name');
    fireEvent.change(groupNameInput, { target: { value: 'New Group Name' } });
    const saveButton = getByText('Save');
    expect(saveButton).toBeEnabled();
  });

  // Add more tests as needed
});
