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

  it('displays "Blocked" when the user is blocked', async () => {
    const { getByText } = render(
      <Router>
        <ShowFriendInformation username="testuser" friendInfo={mockData} isBlocked={true} />
      </Router>
    );

    const blockedText = getByText('Blocked');
    expect(blockedText).toBeInTheDocument();
  });

  
  it('renders moderator communities correctly', async () => {
    const { findByText } = render(
      <Router>
        <ShowFriendInformation username="testuser" friendInfo={mockData} isBlocked={false} />
      </Router>
    );

    const communityName = await findByText('Example Subreddit');
    expect(communityName).toBeInTheDocument();
  });

  it('renders user stats correctly', async () => {
    const { getByText } = render(
      <Router>
        <ShowFriendInformation username="testuser" friendInfo={mockData} isBlocked={false} />
      </Router>
    );

    const postKarma = getByText('1234');
    const commentKarma = getByText('5678');
    expect(postKarma).toBeInTheDocument();
    expect(commentKarma).toBeInTheDocument();
  });

  it('shows follow button for non-self profiles', async () => {
    const { getByText } = render(
      <Router>
        <ShowFriendInformation username="testuser" friendInfo={mockData} isBlocked={false} />
      </Router>
    );

    const followButton = getByText('Follow');
    expect(followButton).toBeInTheDocument();
  });

  it('renders correct karma values', async () => {
    const { getByText } = render(
      <Router>
        <ShowFriendInformation username="testuser" friendInfo={mockData} isBlocked={false} />
      </Router>
    );

    const postKarma = getByText('1234');
    const commentKarma = getByText('5678');
    expect(postKarma).toBeInTheDocument();
    expect(commentKarma).toBeInTheDocument();
  });
  
});

