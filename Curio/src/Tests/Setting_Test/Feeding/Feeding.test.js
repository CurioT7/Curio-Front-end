import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Feeding from '../../../Components/feedSettings/Feeding';
import { sendUserDataToBackend, fetchUserDataFromBackend } from '../../../Components/UserSetting/UserSettingsEndPoints';

jest.mock('../../../Components/UserSetting/UserSettingsEndPoints', ()=> ({
    __esModule: true,
    default: jest.fn(),
    sendUserDataToBackend: jest.fn(),
    fetchUserDataFromBackend: jest.fn(),
  
}));

describe('Feeding', () => {
  beforeEach(() => {
    fetchUserDataFromBackend.mockResolvedValue({
      adultContent: false,
      autoplayMedia: false,
      communityThemes: false,
      communityContentSort: 'Hot',
      rememberPerCommunity: {
        rememberContentSort: false,
        rememberContentView: false
      },
      globalContentView: 'card',
      openPostsInNewTab: false
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<Feeding />);
  });

  it('fetches user data on mount', async () => {
    render(<Feeding />);
    await waitFor(() => expect(fetchUserDataFromBackend).toHaveBeenCalledTimes(1));
  });

  it('updates adult content state and sends data to backend when switch is clicked', async () => {
    const { getByTestId } = render(<Feeding />);
    fireEvent.click(getByTestId('adult-content-switch'));
    
    await waitFor(() => expect(sendUserDataToBackend).toHaveBeenCalledWith({ adultContent: true }));
  });

  it('updates autoPlay media state and sends data to backend when switch is clicked', async () => {
    const { getByTestId } = render(<Feeding />);
    fireEvent.click(getByTestId('auto-play-media'));
    
    await waitFor(() => expect(sendUserDataToBackend).toHaveBeenCalledWith({ autoplayMedia: true }));
  });

  it('updates community themes state and sends data to backend when switch is clicked', async () => {
    const { getByTestId } = render(<Feeding />);
    fireEvent.click(getByTestId('community-themes'));
    
    await waitFor(() => expect(sendUserDataToBackend).toHaveBeenCalledWith({ communityThemes: true }));
  });

  it('updates open post in new tab state and sends data to backend when switch is clicked', async () => {
    const { getByTestId } = render(<Feeding />);
    fireEvent.click(getByTestId('post-new-tab'));
    
    await waitFor(() => expect(sendUserDataToBackend).toHaveBeenCalledWith({ openPostsInNewTab: true }));
  });

  it('updates community content sort state and sends data to backend when dropdown is changed', async () => {
    const { getByTestId } = render(<Feeding />);
    fireEvent.change(getByTestId('community-content-sort'), { target: { value: 'New' } });
    await waitFor(() => expect(sendUserDataToBackend).toHaveBeenCalledWith({ communityContentSort: 'New' }));
  });

  it('updates global content view state and sends data to backend when dropdown is changed', async () => {
    const { getByTestId } = render(<Feeding />);
    fireEvent.change(getByTestId('global-content-view'), { target: { value: 'list' } });
    await waitFor(() => expect(sendUserDataToBackend).toHaveBeenCalledWith({ globalContentView: 'list' }));
  });


  // Add similar tests for other switches and dropdowns
});