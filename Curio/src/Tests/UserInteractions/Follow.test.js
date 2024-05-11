import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ShowFriendInformation from '../../Components/FriendInformation/ShowFriendInformation';
import React from 'react';
import '@testing-library/jest-dom';
import Post from '../../Components/Post/Post';
import { getBlocked, getFollower, getUserOverview, userFollow, userUnfollow } from '../../Components/FriendInformation/ShowFriendInformationEndpoints';

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
          members: [1, 2, 3, 4, 5]
      }
  ]
};

jest.mock('../../Components/Post/PostComments.jsx', () => ({
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

jest.mock('../../Components/FriendInformation/ShowFriendInformationEndpoints.js', () => ({
  __esModule: true,
  userFollow: jest.fn().mockResolvedValue(200),
  userUnfollow: jest.fn().mockResolvedValue(200),
  getFollower: jest.fn().mockResolvedValue(404),
  getBlocked: jest.fn().mockResolvedValue(401),
  getUserOverview: jest.fn().mockResolvedValue(200),
}));

describe('ShowFriendInformation', () => {
  it('changes follow button text to "Unfollow" when clicked', async () => {
    // userFollow.mockResolvedValue(200);
    // getBlocked.mockResolvedValue(200);

    const { getByText, findByText } = render(
      <Router>
        <ShowFriendInformation username="testuser" friendInfo={mockData} isBlocked={false} />
      </Router>
    );

    const followButton = getByText('Follow');
    fireEvent.click(followButton);

    const unfollowButton = await findByText('Unfollow');
    expect(unfollowButton).toBeInTheDocument();
  });

  
});

