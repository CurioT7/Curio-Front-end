import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Messages from '../../../Components/NotificationsSetting/Messages/Messages';
import { sendUserDataToBackend } from '../../../Components/UserSetting/UserSettingsEndPoints';

jest.mock('../../../Components/UserSetting/UserSettingsEndPoints', () => ({
  sendUserDataToBackend: jest.fn(),
}));

describe('<Messages />', () => {
  test('renders without crashing', () => {
    render(<Messages userActivity={{}} />);
  });

  test('displays correct titles and descriptions', () => {
    const { getByText } = render(<Messages userActivity={{}} />);
    expect(getByText('Private messages')).toBeInTheDocument();
    expect(getByText('Chat messages')).toBeInTheDocument();
    expect(getByText('Chat requests')).toBeInTheDocument();
  });  
  

  test('Private messages"', async () => {
    const { getByTestId } = render(<Messages userActivity={{ allowPrivateMessages: true }} />);
    const allowPrivateMessagesSwitch = getByTestId('allowPrivateMessages-switch');
    
    fireEvent.click(allowPrivateMessagesSwitch);
    expect(sendUserDataToBackend).toHaveBeenCalledWith({ allowPrivateMessages: false });
  });

  test('Chat messages', async () => {
    const { getByTestId } = render(<Messages userActivity={{ allowChatNotifications: false }} />);
    const allowChatNotificationsSwitch = getByTestId('allowChatNotifications-switch');

    fireEvent.click(allowChatNotificationsSwitch);
    expect(sendUserDataToBackend).toHaveBeenCalledWith({ allowChatNotifications: true });
  });

  test('Chat requests', async () => {
    const { getByTestId } = render(<Messages userActivity={{ allowChatRequests: false }} />);
    const allowChatRequestsSwitch = getByTestId('allowChatRequests-switch');

    fireEvent.click(allowChatRequestsSwitch);
    expect(sendUserDataToBackend).toHaveBeenCalledWith({ allowChatRequests: true });
  });
});