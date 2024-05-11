import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ShowFriendInformation from '../../Components/FriendInformation/ShowFriendInformation';
import { BrowserRouter as Router } from 'react-router-dom';
import PostComments from '../../Components/Post/PostComments';
import { getHidden } from '../../Components/FriendInformation/ShowFriendInformationEndpoints';


jest.mock('../../Components/ModalPages/ModalPages', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../../Components/Post/Post', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../../Components/Post/PostComments', () => ({
  __esModule: true,
  default: jest.fn(),
}));


jest.mock('../../Components/FriendInformation/ShowFriendInformationEndpoints.js', () => ({
  __esModule: true,
  userFollow: jest.fn().mockResolvedValue(200),
  userUnfollow: jest.fn().mockResolvedValue(200),
  getFollower: jest.fn().mockResolvedValue(404),
  getBlocked: jest.fn().mockResolvedValue(401),
  getUserOverview: jest.fn().mockResolvedValue(200),
  getSaved: jest.fn().mockResolvedValue(200),
  getHidden: jest.fn().mockResolvedValue(200),
}));

// jest.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValue('your_mocked_token');
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
};
global.localStorage = localStorageMock;

// Mock the getItem method to return your mocked token
localStorageMock.getItem.mockReturnValue('your_mocked_token');

describe('ShowFriendInformation', () => {
  it('displays dropdown menu on ellipsis button click', () => {
    const { getByText, getByTestId } = render(
      <Router>
      <ShowFriendInformation
        username="testuser"
        friendInfo={{ displayName: 'Test User' }}
        isBlocked={false}
      />
        </Router>
    );

    // Find and click the ellipsis button
    const ellipsisButton = getByTestId('ellipsis-btn');
    fireEvent.click(ellipsisButton);

    // Check if the dropdown menu is displayed with the expected options
    expect(getByText('Share')).toBeInTheDocument();
    expect(getByText('Send a message')).toBeInTheDocument();
    expect(getByText('Block account')).toBeInTheDocument();
    expect(getByText('Report')).toBeInTheDocument();
  });


it('modal should appear when Report is clicked', () => {
  const { getByText, getByTestId, queryByTestId } = render(
    <Router>
    <ShowFriendInformation
      username="testuser"
      friendInfo={{ displayName: 'Test User' }}
      isBlocked={false}
    />
    </Router>
  );

  // Find and click the ellipsis button
  const ellipsisButton = getByTestId('ellipsis-btn');
  fireEvent.click(ellipsisButton);

  // Find and click the Report button
  const reportButton = getByText('Report');
  fireEvent.click(reportButton);

 waitFor(() => {
    expect(queryByTestId('report-modal')).toBeInTheDocument();
  });

});
});
