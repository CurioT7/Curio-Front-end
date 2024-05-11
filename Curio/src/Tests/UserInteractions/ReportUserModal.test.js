import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import MultiPageFormModal from '../../Components/ModalPages/ModalPages';
import '@testing-library/jest-dom';


jest.mock('../../Components/FriendInformation/ShowFriendInformationEndpoints.js', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../../Components/ModalPages/ModalPagesEndpoints', () => ({
  __esModule: true,
  default: jest.fn(),
}));



describe('MultiPageFormModal', () => {
  it('renders step 1 correctly', () => {
    const { getByText, getByLabelText } = render(<MultiPageFormModal />);
    waitFor(() => {
    expect(getByText('Submit a report')).toBeInTheDocument();
    expect(getByLabelText('What do you want to report?')).toBeInTheDocument();
    });
  });
});