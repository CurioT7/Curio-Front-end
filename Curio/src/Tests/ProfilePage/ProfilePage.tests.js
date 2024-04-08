import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProfilePage from '../../Components/ProfilePage/ProfilePage';
describe('ProfilePage component', () => {
  beforeEach(() => {
    render(<ProfilePage />);
  });

  test('renders user information correctly', () => {
    expect(screen.getByAltText('profile picture')).toBeInTheDocument();
    expect(screen.getByText('User')).toBeInTheDocument();
    expect(screen.getByText('u/sad_p0tat0o')).toBeInTheDocument();
  });

  test('scroll buttons work correctly', () => {
    window.HTMLElement.prototype.scrollLeft = jest.fn();
    window.HTMLElement.prototype.scrollRight = jest.fn();

    const scrollRightButton = screen.getByRole('button', { name: /scroll right/i });
    const scrollLeftButton = screen.getByRole('button', { name: /scroll left/i });
    fireEvent.click(scrollRightButton);
    fireEvent.click(scrollLeftButton);

    expect(window.HTMLElement.prototype.scrollRight).toHaveBeenCalled();
    expect(window.HTMLElement.prototype.scrollLeft).toHaveBeenCalled();
  });

});
