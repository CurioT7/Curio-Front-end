import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CommunityHeader from '../../Components/CommunitiesListing/CommunityHeader';
import { useParams } from 'react-router-dom';
import { getJoinedCommunities, joinSubCurio, unJoinSubCurio  } from '../../Components/CommunitiesListing/CommunityEndPoints';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

jest.mock('../../Components/CommunitiesListing/CommunityEndPoints', () => ({
    __esModule: true,
    default: jest.fn(),
    getSubredditInfo: jest.fn(),
    getJoinedCommunities: jest.fn(),
    joinSubCurio: jest.fn(),
    unJoinSubCurio: jest.fn(),
  }));

  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn(),
  }));

describe('CommunityHeader', () => {
    beforeEach(() => {
        getJoinedCommunities.mockResolvedValue({ communities: [] });
        joinSubCurio.mockResolvedValue(true);
        unJoinSubCurio.mockResolvedValue(true);
    });
    
    it('renders without crashing', () => {
        useParams.mockReturnValue({ Community: 'Community' });
        render(
            <Router>
                <CommunityHeader setSubreddit={() => {}} />
            </Router>
        );
    });

    it('joins a community when "Join" button is clicked', async () => {
        useParams.mockReturnValue({ Community: 'Community' });
        const { getByText } = render(
            <Router>
                <CommunityHeader setSubreddit={() => {}} />
            </Router>
        );
        const joinButton = getByText('Join');
        fireEvent.click(joinButton);
        expect(joinSubCurio).toHaveBeenCalled();
    });

    it('unjoins a community when "Joined" button is clicked', async () => {
        useParams.mockReturnValue({ Community: 'Community' });
        getJoinedCommunities.mockResolvedValueOnce({ communities: [{ name: 'Community', banner: '', icon: '' }] });
        const { findByText } = render(
          <Router>
            <CommunityHeader setSubreddit={() => {}} />
          </Router>
        );
        const joinedButton = await findByText('Joined');
        fireEvent.click(joinedButton);
        expect(unJoinSubCurio).toHaveBeenCalled();
      });
      it('renders the banner when provided', async () => {
        useParams.mockReturnValue({ Community: 'TestCommunity' });
        getJoinedCommunities.mockResolvedValueOnce({ communities: [{ name: 'TestCommunity', banner: 'test-banner.jpg', icon: '' }] });
        const { findByTestId } = render(
          <Router>
            <CommunityHeader setSubreddit={() => {}} />
          </Router>
        );
        const banner = await findByTestId('comm-banner');
        expect(banner).toBeInTheDocument();
      });
      
      it('renders the community name', () => {
        useParams.mockReturnValue({ Community: 'TestCommunity' });
        const { getByText } = render(
          <Router>
            <CommunityHeader setSubreddit={() => {}} />
          </Router>
        );
        const communityName = getByText('r/TestCommunity');
        expect(communityName).toBeInTheDocument();
      });
      
     
      // ...existing code...

it('renders "Create a Post" button', () => {
    useParams.mockReturnValue({ Community: 'Community' });
    const { getByText } = render(
        <Router>
            <CommunityHeader setSubreddit={() => {}} isModerator={false} />
        </Router>
    );

    const createPostButton = getByText('Create a Post');
    expect(createPostButton).toBeInTheDocument();
});

it('renders "Mod Tools" button when isModerator is true', () => {
    useParams.mockReturnValue({ Community: 'Community' });
    const { getByText } = render(
        <Router>
            <CommunityHeader setSubreddit={() => {}} isModerator={true} />
        </Router>
    );

    const modToolsButton = getByText('Mod tools');
    expect(modToolsButton).toBeInTheDocument();
});

it('does not render "Mod Tools" button when isModerator is false', () => {
    useParams.mockReturnValue({ Community: 'Community' });
    const { queryByText } = render(
        <Router>
            <CommunityHeader setSubreddit={() => {}} isModerator={false} />
        </Router>
    );

    const modToolsButton = queryByText('Mod tools');
    expect(modToolsButton).not.toBeInTheDocument();
});


});

