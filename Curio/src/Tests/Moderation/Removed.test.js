import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import RemovedPosts from "../../Components/ModerationComponents/RemovedPosts";
import * as UnmoderatedEndpoints from "../../Components/ModerationComponents/UnmoderatedEndpoints.js";

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
      <RemovedPosts
        _id="post123"
        authorName="user123"
        createdAt={new Date()}
        upvotes={10}
        downvotes={5}
        comments={['comment1', 'comment2', 'comment3']}
        content='content'
        myusername="myusername"
        isLocked={false}
        isNSFW={false}
      />
    );

    // Assert that the component renders with the correct content
    expect(screen.getByText("u/user123")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("content")).toBeInTheDocument();
    expect(screen.getByText("3 comments")).toBeInTheDocument();
  });

  describe("RemovedPosts component", () => {
    test("handles approve post correctly", async () => {
      // Mock the approveRemovedPosts function
      UnmoderatedEndpoints.approveRemovedPosts = jest.fn().mockResolvedValue(true);  
      render(
        <RemovedPosts
          _id="post123"
          authorName="user123"
          createdAt={new Date()}
          upvotes={10}
          downvotes={5}
          comments={['comment1', 'comment2', 'comment3']}
          content='content'
          myusername="myusername"
          isLocked={false}
          isNSFW={false}
        />
      );
  
      // Simulate clicking the approve button
      fireEvent.click(screen.getByText("Approve"));
  
      // Assert that the approveRemovedPosts function was called with the correct arguments
      expect(UnmoderatedEndpoints.approveRemovedPosts).toHaveBeenCalledWith("post123", "post", undefined);  
      // Assert that the post is now approved
      await waitFor(() => {
        expect(screen.getByText("Approved")).toBeInTheDocument();
      });
    })});
  
  // Add more test cases as needed
});