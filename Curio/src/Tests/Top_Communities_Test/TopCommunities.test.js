import React from 'react';
import { render } from '@testing-library/react';
import TopCommunities from '../../Components/TopCommunities/TopCommunities';

jest.mock('../../Components/TopCommunities/TopCommunities', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

test('renders title "Best of Curio"', () => {
  const { getByText } = render(<TopCommunities />);
  const titleElement = getByText("Best of Curio");
  expect(titleElement).toBeInTheDocument();
});
