import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Advanced from '../../../Components/profileSetting/Advanced/Advanced';
import '@testing-library/jest-dom';

// Add the necessary matchers
const { toBeInTheDocument, toHaveAttribute } = require('@testing-library/jest-dom/matchers');
expect.extend({ toBeInTheDocument, toHaveAttribute });

// Mocking the sendUserDataToBackend function
jest.mock('../../../Components/UserSetting/UserSettingsEndPoints.js', () => ({
  sendUserDataToBackend: jest.fn(),
}));

describe('Advanced component', () => {
  it('renders correctly', () => {
    // Mock userData prop
    const userData = {
      allowFollow: true,
      contentVisibility: true,
      activeInCommunityVisibility: true,
      clearHistory: false,
    };

    const { getByText, getByTestId } = render(<Advanced userData={userData} />);

    // Check if important elements are rendered
    expect(getByText('Allow people to follow you')).toBeInTheDocument();
    expect(getByTestId('follow-switch')).toBeInTheDocument();
    expect(getByText('Content visibility')).toBeInTheDocument();
    expect(getByTestId('content-visibility-switch')).toBeInTheDocument();
    expect(getByText('Active in communities visibility')).toBeInTheDocument();
    expect(getByTestId('communities-visibility-switch')).toBeInTheDocument();
    expect(getByText(/Clear history/i)).toBeInTheDocument();
    expect(getByTestId('Clear-history')).toBeInTheDocument();
  });

  it('toggles follow switch correctly', () => {
    const userData = {
      allowFollow: true,
      contentVisibility: true,
      activeInCommunityVisibility: true,
      clearHistory: false,
    };

    const { getByTestId } = render(<Advanced userData={userData} />);

    // Simulate a click on the follow switch
    fireEvent.click(getByTestId('follow-switch'));

    // Check if the follow switch state is toggled
    expect(getByTestId('follow-switch')).toHaveAttribute('aria-checked', 'false');

    // Check if sendUserDataToBackend is called with the correct argument
    expect(sendUserDataToBackend).toHaveBeenCalledWith({ allowFollow: false });
  });

  // Write similar tests for toggling content visibility, communities visibility, and clearing history
});
