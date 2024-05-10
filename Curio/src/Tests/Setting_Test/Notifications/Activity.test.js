import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Activity from '../../../Components/NotificationsSetting/Activity/Activity';
import { sendUserDataToBackend } from '../../../Components/UserSetting/UserSettingsEndPoints';

jest.mock('../../../Components/UserSetting/UserSettingsEndPoints', () => ({
  sendUserDataToBackend: jest.fn(),
}));

describe('<Activity />', () => {
  test('renders without crashing', () => {
    render(<Activity userActivity={{}} />);
  });

  test('displays correct titles and descriptions', () => {
    const { getByText } = render(<Activity userActivity={{}} />);
    expect(getByText('Mentions of u/username')).toBeInTheDocument();
    expect(getByText('Comments on your posts')).toBeInTheDocument();
    expect(getByText('Upvotes on your posts')).toBeInTheDocument();
    expect(getByText('Upvotes on your comments')).toBeInTheDocument();
    expect(getByText('Replies to your comments')).toBeInTheDocument();
    expect(getByText('New followers')).toBeInTheDocument();
    expect(getByText('Posts you follow')).toBeInTheDocument();
  });  
  

  test('Mentions of u/username"', async () => {
    const { getByTestId } = render(<Activity userActivity={{ mentions: true }} />);
    const mentionsswitch = getByTestId('mentions-switch');
    
    fireEvent.click(mentionsswitch);
    expect(sendUserDataToBackend).toHaveBeenCalledWith({ mentions: false });
  });

  test('Comments on your posts"', async () => {
    const { getByTestId } = render(<Activity userActivity={{ comments: true }} />);
    const commentsSwitch = getByTestId('comments-switch');

    fireEvent.click(commentsSwitch);
    expect(sendUserDataToBackend).toHaveBeenCalledWith({ comments: false });
  });

  test('Upvotes on your posts"', async () => {
    const { getByTestId } = render(<Activity userActivity={{ upvotesPosts: true }} />);
    const upvotesPostsSwitch = getByTestId('upvotesPosts-switch');

    fireEvent.click(upvotesPostsSwitch);
    expect(sendUserDataToBackend).toHaveBeenCalledWith({ upvotesPosts: false });
  });

  test('Upvotes on your comments', async () => {
    const { getByTestId } = render(<Activity userActivity={{ upvotesComments: false }} />);
    const upvotesCommentsSwitch = getByTestId('upvotesComments-switch');

    fireEvent.click(upvotesCommentsSwitch);
    expect(sendUserDataToBackend).toHaveBeenCalledWith({ upvotesComments: true });
  });

  test('Replies to your comments', async () => {
    const { getByTestId } = render(<Activity userActivity={{ replies: false }} />);
    const repliesSwitch = getByTestId('replies-switch');

    fireEvent.click(repliesSwitch);
    expect(sendUserDataToBackend).toHaveBeenCalledWith({ replies: true });
  });

  test('New followers', async () => {
    const { getByTestId } = render(<Activity userActivity={{ newFollowers: false }} />);
    const newFollowersSwitch = getByTestId('newFollowers-switch');

    fireEvent.click(newFollowersSwitch);
    expect(sendUserDataToBackend).toHaveBeenCalledWith({ newFollowers: true });
  });

  test('Posts you follow', async () => {
    const { getByTestId } = render(<Activity userActivity={{ postsYouFollow: false }} />);
    const postsYouFollowSwitch = getByTestId('postsYouFollow-switch');

    fireEvent.click(postsYouFollowSwitch);
    expect(sendUserDataToBackend).toHaveBeenCalledWith({ postsYouFollow: true });
  });
});