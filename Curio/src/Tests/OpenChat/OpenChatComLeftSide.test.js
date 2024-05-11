import React from 'react';
import { render } from '@testing-library/react';
import OpenChatComLeftSide from '../../Components/OpenChat/OpenChatComLeft_Side/OpenChatComLeft_Side';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';

  
  test('renders chat items', () => {
    const chatsData = {
      chats: [
        { _id: 'chat1', profilePicture: 'profile1.jpg', participants: 'User1', messages: [{ timestamp: '2024-05-10T12:00:00Z', message: 'Hello' }] },
        { _id: 'chat2', profilePicture: 'profile2.jpg', participants: 'User2', messages: [{ timestamp: '2024-05-10T12:30:00Z', message: 'Hi' }] },
      ]
    };
  
    const { getByTestId } = render(
      <Router> {/* Wrap the component with BrowserRouter */}
        <OpenChatComLeftSide chatsData={chatsData} />
      </Router>
    );
    const chatItem1 = getByTestId('chat-item-chat1');
    const chatItem2 = getByTestId('chat-item-chat2');
    expect(chatItem1).toBeInTheDocument();
    expect(chatItem2).toBeInTheDocument();
  });


  test('handles empty chatsData', () => {
    const { queryByTestId } = render(
      <Router>
        <OpenChatComLeftSide chatsData={{ chats: [] }} />
      </Router>
    );
  
    const chatItems = queryByTestId(/^chat-item-/);
    expect(chatItems).toBeNull();
  });
  
  test('handles null chatsData', () => {
    const { queryByTestId } = render(
      <Router>
        <OpenChatComLeftSide chatsData={null} />
      </Router>
    );
  
    const chatItems = queryByTestId(/^chat-item-/);
    expect(chatItems).toBeNull();
  });
  
  test('handles undefined chatsData', () => {
    const { queryByTestId } = render(
      <Router>
        <OpenChatComLeftSide />
      </Router>
    );
  
    const chatItems = queryByTestId(/^chat-item-/);
    expect(chatItems).toBeNull();
  });
  

  test('handles missing profile picture', () => {
    const chatsData = {
      chats: [
        { _id: 'chat1', participants: 'User1', messages: [{ timestamp: '2024-05-10T12:00:00Z', message: 'Hello' }] },
      ]
    };
  
    const { getByTestId } = render(
      <Router>
        <OpenChatComLeftSide chatsData={chatsData} />
      </Router>
    );
  
    const chatItem1 = getByTestId('chat-item-chat1');
  
    expect(chatItem1).toBeInTheDocument();
    expect(chatItem1).not.toHaveAttribute('src'); // Check if profile picture is not present
  });
  