import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AccountSettings from '../../../Components/accountSettings/AccountSettings';
import { FindUserInformation } from '../../../Components/UserSetting/UserSettingsEndPoints';

jest.mock('../../../Components/UserSetting/UserSettingsEndPoints', () => ({
    __esModule: true,
    default: jest.fn(),
    FindUserInformation: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
  }));

describe('AccountSettings', () => {
    beforeEach(() => {
        FindUserInformation.mockResolvedValue({
            email: 'crossfiretofa@gmail.com',
            username: 'pantheon',
            createdPassword: true,
            connectedToGoogle: true,
        });
    });

    afterEach(() => {      
        jest.clearAllMocks();
    });
    it('renders without crashing', () => {
        render(<AccountSettings />);
      });
    
      it('fetches user data on mount', async () => {
        render(<AccountSettings />);
        await waitFor(() => expect(FindUserInformation).toHaveBeenCalledTimes(1));
      });
});