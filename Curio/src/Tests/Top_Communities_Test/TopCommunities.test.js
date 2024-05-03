import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ShowFriendInformation from '../../Components/FriendInformation/ShowFriendInformation';
import React from 'react';
import '@testing-library/jest-dom';

const mockData = {
    displayName: "Test User",
    postKarma: 1234,
    commentKarma: 5678,
    cakeDay: "2022-01-01",
    moderatedSubreddits: [
        {
            privacyMode: "public",
            icon: "https://example.com/icon.png",
            name: "Example Subreddit",
            members: [1, 2, 3, 4, 5] // Dummy array for members
        }
    ]
};

jest.mock('../../Components/FriendInformation/ShowFriendInformationEndpoints.js', () => ({
  getFriendInfo: jest.fn().mockResolvedValue(mockData),
}));

jest.mock('../../Components/ModalPages/ModalPagesEndpoints.js', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../../Components/Post/Post', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('ShowFriendInformation', () => {
  it('changes follow button text to "Unfollow" when clicked', async () => {
    const { getByText } = render(
      <Router>
        <ShowFriendInformation username="testuser" />
      </Router>
    );

    await waitFor(() => {
      expect(getByText('Test User')).toBeInTheDocument();
    });

    const followButton = getByText('Follow');
    fireEvent.click(followButton);

    await waitFor(() => {
      expect(getByText('Unfollow')).toBeInTheDocument();
    });
  });
});