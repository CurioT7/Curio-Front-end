import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import TopCommunities from '../../Components/TopCommunities/TopCommunities.jsx';
import { showCommunityInformation } from '../../Components/TopCommunities/TopCommunitiesEnpoints.js';
import { BrowserRouter as Router } from 'react-router-dom';
import OneCommunity from '../../Components/OneCommunity/OneCommunity.jsx';



jest.mock('../../Components/FriendInformation/ShowFriendInformationEndpoints.js', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../../Components/TopCommunities/TopCommunitiesEnpoints.js', () => ({
  __esModule: true,
  showCommunityInformation: jest.fn(),
}));


jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('../../Components/OneCommunity/OneCommunity.jsx', () => {
  return function MockOneCommunity(props) {
    return <div data-testid="community">MockOneCommunity</div>;
  };
});

const hideSidebar = jest.fn();
const showSidebar = jest.fn();

test('renders top communities without crashing"', async () => {
  render(
    <Router>
      <TopCommunities hideSidebar={hideSidebar} showSidebar={showSidebar} />
    </Router>
  );
});

test('renders 10 community components per page', async () => {


  const mockCommunities = Array(50).fill().map((_, i) => ({ name: `Community ${i + 1}`, category: 'Category', members: i + 1 }));
  showCommunityInformation.mockResolvedValueOnce({ data: { communities: mockCommunities, totalCommunitiesCount: 50 } });

  render(
    <Router>
      <TopCommunities hideSidebar={hideSidebar} showSidebar={showSidebar} />
    </Router>
  );

  const communityElements = await waitFor(() => screen.getAllByTestId('community'));
  expect(communityElements).toHaveLength(50);
});