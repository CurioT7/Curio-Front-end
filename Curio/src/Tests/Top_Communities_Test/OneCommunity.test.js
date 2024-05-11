import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Community from '../../Components/OneCommunity/OneCommunity';

jest.mock('../../Components/FriendInformation/ShowFriendInformationEndpoints.js', () => ({
  __esModule: true,
  default: jest.fn(),
}));



jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Community', () => {
  const mockCommunity = {
    index: 0,
    name: 'testCommunity',
    category: 'testCategory',
    members: 100,
    picture: 'testPicture.png',
  };

  test('displays the community name, category, and members count', () => {
    render(
      <Router>
        <Community {...mockCommunity} />
      </Router>
    );

    const nameElement = screen.getByText(`r/${mockCommunity.name}`);
    expect(nameElement).toBeInTheDocument();

    const categoryElement = screen.getByText(mockCommunity.category);
    expect(categoryElement).toBeInTheDocument();

    const membersElement = screen.getByText(`${mockCommunity.members} members`);
    expect(membersElement).toBeInTheDocument();
  });
});