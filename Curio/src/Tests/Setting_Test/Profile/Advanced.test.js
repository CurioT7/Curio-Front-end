import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Advanced from '../../../Components/profileSetting/Advanced/Advanced';
import { sendUserDataToBackend } from '../../../Components/UserSetting/UserSettingsEndPoints';

jest.mock('../../../Components/UserSetting/UserSettingsEndPoints', () => ({
  sendUserDataToBackend: jest.fn(),
}));

describe('<Advanced />', () => {
  test('renders without crashing', () => {
    render(<Advanced userData={{}} />);
  });

  test('displays correct titles and descriptions', () => {
    const { getByText } = render(<Advanced userData={{}} />);
    expect(getByText('Allow people to follow you')).toBeInTheDocument();
    expect(getByText('Followers will be notified about posts you make to your profile and see them in their home feed.')).toBeInTheDocument();
    expect(getByText('Content visibility')).toBeInTheDocument();
    expect(getByText('Active in communities visibility')).toBeInTheDocument();
    expect(getByText('Show which communities I am active in on my profile.')).toBeInTheDocument();
    expect(getByText('Delete your post views history.')).toBeInTheDocument();
  });  
  

  test('allows toggling "Allow people to follow you"', async () => {
    const { getByTestId } = render(<Advanced userData={{ allowFollow: true }} />);
    const followSwitch = getByTestId('follow-switch');
    
    fireEvent.click(followSwitch);
    expect(sendUserDataToBackend).toHaveBeenCalledWith({ allowFollow: false });
  });

  test('allows toggling "Content visibility"', async () => {
    const { getByTestId } = render(<Advanced userData={{ contentVisibility: true }} />);
    const contentVisibilitySwitch = getByTestId('content-visibility-switch');

    fireEvent.click(contentVisibilitySwitch);
    expect(sendUserDataToBackend).toHaveBeenCalledWith({ contentVisibility: false });
  });

  test('allows toggling "Active in communities visibility"', async () => {
    const { getByTestId } = render(<Advanced userData={{ activeInCommunityVisibility: true }} />);
    const communitiesVisibilitySwitch = getByTestId('communities-visibility-switch');

    fireEvent.click(communitiesVisibilitySwitch);
    expect(sendUserDataToBackend).toHaveBeenCalledWith({ activeInCommunityVisibility: false });
  });

  test('allows clicking "Clear history" button', async () => {
    const { getByTestId } = render(<Advanced userData={{ clearHistory: false }} />);
    const clearHistoryButton = getByTestId('Clear-history');

    fireEvent.click(clearHistoryButton);
    expect(sendUserDataToBackend).toHaveBeenCalledWith({ clearHistory: true });
  });
});