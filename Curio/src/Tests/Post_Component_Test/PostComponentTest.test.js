import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Post from '../../Components/Post/Post';
import '@testing-library/jest-dom';


jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));
test('renders post details correctly', () => {

  const post = {
    id: 1,
    user: 'John Doe',
    title: 'Sample Post',
    content: 'This is a sample post content',
    upvotes: 10,
    downvotes: 5,
    comments: []
  };


  render(<Post {...post} />);


  expect(screen.getByText(post.user)).toBeInTheDocument();
  expect(screen.getByText(post.title)).toBeInTheDocument();
  expect(screen.getByText(post.content)).toBeInTheDocument();
  expect(screen.getByText(post.upvotes - post.downvotes)).toBeInTheDocument();
});

test('handles navigation to details page', () => {
  const post = {
    id: 1,
    user: 'John Doe',
    title: 'Sample Post',
    content: 'This is a sample post content',
    upvotes: 10,
    downvotes: 5,
    comments: []
  };


  const mockNavigate = jest.fn();


  const { useNavigate } = require('react-router-dom');
  useNavigate.mockReturnValue(mockNavigate);


  render(<Post {...post} />);


  fireEvent.click(screen.getByText(post.user));


  expect(mockNavigate).toHaveBeenCalledWith(`/post/post-details/${post.id}`);
});

describe('Post component', () => {
  const postProps = {
    id: 1,
    user: 'User123',
    title: 'Test Post',
    image: 'https://example.com/image.jpg',
    upvotes: 10,
    downvotes: 5,
    comments: [{ id: 1, text: 'Test comment 1' }, { id: 2, text: 'Test comment 2' }],
  };

  test('renders post title and content', () => {
    render(<Post {...postProps} />);
    expect(screen.getByText('Test Post')).toBeInTheDocument();
  });

  test('renders post user', () => {
    render(<Post {...postProps} />);
    expect(screen.getByText('User123')).toBeInTheDocument();
  });

  test('renders post image if provided', () => {
    render(<Post {...postProps} />);
    expect(screen.getByAltText('Chakra UI')).toBeInTheDocument();
  });

  test('renders correct number of upvotes and downvotes', () => {
    render(<Post {...postProps} />);
    expect(screen.getByText('5')).toBeInTheDocument(); 
  });

  test('renders correct number of comments', () => {
    render(<Post {...postProps} />);
    expect(screen.getByText('2')).toBeInTheDocument(); 
  });


   test('toggles upvotes and downvotes', () => {
    render(<Post {...postProps} />);

    expect(screen.getByTestId('upvotes')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('downvotes'));

    expect(screen.getByTestId('downvotes')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('upvotes'));

    expect(screen.getByTestId('upvotes')).toBeInTheDocument();
   });

});

describe('Post component Share and Reply', () => {
  const postProps = {
    id: 1,
    user: 'User123',
    title: 'Test Post',
    content: 'This is a test post.',
    image: 'https://example.com/image.jpg',
    upvotes: 10,
    downvotes: 5,
    comments: [{ id: 1, text: 'Test comment 1' }, { id: 2, text: 'Test comment 2' }],
  };

  test('renders reply and share buttons', () => {
    render(<Post {...postProps} />);
    expect(screen.getByTestId("share")).toBeInTheDocument();
  });
});