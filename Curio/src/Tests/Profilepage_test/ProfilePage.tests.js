import { render, screen } from '@testing-library/react';
import ProfilePage from '../../Components/ProfilePage/ProfilePage';

test('renders ProfilePage component', () => {
  render(<ProfilePage />);
  
  // Test that the profile name is rendered correctly
  const profileName = screen.getByText(/John Doe/i);
  expect(profileName).toBeInTheDocument();

  // Test that the username is rendered correctly
  const username = screen.getByText(/u\/johndoe/i);
  expect(username).toBeInTheDocument();

  // Test that the "Create a post" button is rendered
  const createPostButton = screen.getByText('+ Create a post');
  expect(createPostButton).toBeInTheDocument();
});
  
test('displays user posts', () => {
  render(<ProfilePage />);
  
  // Test that user posts are rendered
  const userPosts = screen.getAllByTestId('post-card');
  expect(userPosts.length).toBeGreaterThan(0);
});

test('displays user comments', () => {
  render(<ProfilePage />);
  
  // Test that user comments are rendered
  const userComments = screen.getAllByTestId('comment-card');
  expect(userComments.length).toBeGreaterThan(0);
});

test('navigates to edit profile page when "Edit Profile" button is clicked', () => {
  render(<ProfilePage />);
  
  // Test that clicking the "Edit Profile" button navigates to the correct page
  const editProfileButton = screen.getByText('Edit Profile');
  editProfileButton.click();
  expect(window.location.href).toBe('http://localhost:5173/settings/profile');
});