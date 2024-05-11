import React from "react";
import { render, screen, waitFor, fireEvent, act } from "@testing-library/react";
import '@testing-library/jest-dom';
import ModerationPosts from "../../Components/ModerationComponents/ModerationPosts.jsx";
import * as UnmoderatedEndpoints from "../../Components/ModerationComponents/UnmoderatedEndpoints.js";
import Unmoderated from "../../Components/ModerationComponents/Unmoderated.jsx";

jest.mock('../../Components/Post/PostEndPoints', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../../Components/ModerationComponents/UnmoderatedEndpoints', () => ({
  __esModule: true,
  default: jest.fn(),
}));


describe("RemovedPosts component", () => {
  test("renders component with correct content", () => {
    render(
      <ModerationPosts
        _id="post"
        authorName="user"
        createdAt={new Date()}
        upvotes={3}
        downvotes={2}
        comments={['comment1', 'comment2', 'comment3']}
        content='content123'
        myusername="myusername"
        isLocked={false}
        isNSFW={false}
      />
    );

    // Assert that the component renders with the correct content
    expect(screen.getByText("u/user")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("content123")).toBeInTheDocument();
    expect(screen.getByText("3 comments")).toBeInTheDocument();
  });

  describe("RemovedPosts component", () => {
    test("handles approve post correctly", async () => {
      // Mock the approveRemovedPosts function
      UnmoderatedEndpoints.approvePost = jest.fn().mockResolvedValue(true);  
      render(
        <ModerationPosts
          _id="post111"
          authorName="userr"
          createdAt={new Date()}
          upvotes={10}
          downvotes={5}
          comments={['comment1', 'comment2', 'comment3']}
          content='cont'
          myusername="myusername"
          isLocked={false}
          isNSFW={false}
        />
      );
  
      fireEvent.click(screen.getByText("Approve"));
  
      expect(UnmoderatedEndpoints.approvePost).toHaveBeenCalledWith("post111", "post", undefined);  
      await waitFor(() => {
        expect(screen.getByText("Approved")).toBeInTheDocument();
      });
    })});

    test("handles remove post correctly", async () => {
      // Mock the removePost function
      UnmoderatedEndpoints.removePost = jest.fn().mockResolvedValue(true); 
  
      render(
        <ModerationPosts
          _id="post123"
          authorName="user123"
          createdAt={new Date()}
          upvotes={10}
          downvotes={5}
          comments={['comment1', 'comment2']}
          content='content'
          myusername="myusername"
          isLocked={false}
          isNSFW={false}
        />
      );
  
      // Simulate clicking the "Add Removal Reason" button
      act(() => {
        fireEvent.click(screen.getByText("Remove"));
      });
  
  
      // Assert that the removePost function was called with the correct arguments
      expect(UnmoderatedEndpoints.removePost).toHaveBeenCalledWith("post123", "post", undefined);  
      // Assert that the post is now removed
      await waitFor(() => {
        expect(screen.getByText("Removed")).toBeInTheDocument();
      });
    });
  
  // Add more test cases as needed
});