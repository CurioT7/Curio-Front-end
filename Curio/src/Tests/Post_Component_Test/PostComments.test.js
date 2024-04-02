import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import PostComments from '../../Components/Post/PostComments';
import CommentInputForm from '../../Components/Post/CommentInputForm';
import '@testing-library/jest-dom';

test('renders share button', () => {
    const commentProps = {
        username: 'User123',
        comment: 'This is a test comment.',
        commentUpvotes: 10,
    };
    render(<PostComments {...commentProps} />);

    expect(screen.getByText('Share')).toBeInTheDocument();
});

describe('CommentInputForm component', () => {
  test('renders input field by default', () => {
    render(<CommentInputForm />);

    expect(screen.getByPlaceholderText('Add a comment')).toBeInTheDocument();
  });

  test('switches to rich format when switch button is clicked', () => {
    render(<CommentInputForm />);


    fireEvent.focus(screen.getByPlaceholderText('Add a comment'));
    expect(screen.getByTestId("textarea-input")).toBeInTheDocument();

  });

  test('switches to rich format when switch button is clicked', () => {
    render(<CommentInputForm />);


    fireEvent.focus(screen.getByPlaceholderText('Add a comment'));
    fireEvent.click(screen.getByTestId("cancel-textarea-comment"));
    expect(screen.getByPlaceholderText('Add a comment')).toBeInTheDocument();

  });

   test('comment button renders correctly', () => {
        render(<CommentInputForm />);
        fireEvent.focus(screen.getByPlaceholderText('Add a comment'));
        expect(screen.getByTestId("comment-confirm")).toBeInTheDocument();
    });
});