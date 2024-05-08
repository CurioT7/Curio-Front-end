// import React from 'react';
// import { render, fireEvent, waitFor, screen } from '@testing-library/react';
// import Private_Messages from '../../Pages/Private_Messages/Private_Messages.jsx';
// import axios from 'axios'; 

// jest.mock('axios');

// describe('Private_Messages component', () => {
//   test('renders without crashing', () => {
//     render(<Private_Messages />);
//   });

//   test('sends private message when send button is clicked', async () => {
//     render(<Private_Messages />);

//     // Mock necessary dependencies
//     localStorage.setItem('token', 'dummyToken');
//     localStorage.setItem('username', 'testUser');

//     // Mock Axios response for user data fetch
//     axios.get.mockResolvedValueOnce({
//       data: {
//         moderatedSubreddits: [{ name: 'testSubreddit' }],
//       },
//     });

//     // Mock Axios response for message sending
//     axios.post.mockResolvedValueOnce({
//       status: 200,
//     });

//     fireEvent.change(screen.getByLabelText(/Subreddit/i), { target: { value: 'testSubreddit' } });
//     fireEvent.change(screen.getByLabelText(/Recipient/i), { target: { value: 'testRecipient' } });
//     fireEvent.change(screen.getByLabelText(/Subject/i), { target: { value: 'testSubject' } });
//     fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'testMessage' } });

//     fireEvent.click(screen.getByText(/Send/i));

//     await waitFor(() => {
//       expect(axios.post).toHaveBeenCalledTimes(1);
//       expect(axios.post).toHaveBeenCalledWith(
//         expect.stringContaining('/message/compose'),
//         {
//           subreddit: 'testSubreddit',
//           subject: 'testSubject',
//           message: 'testMessage',
//           recipient: 'testRecipient',
//           sendToSubreddit: false,
//         },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             authorization: 'Bearer dummyToken',
//           },
//         }
//       );
//     });
//   });
// });
