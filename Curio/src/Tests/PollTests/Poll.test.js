import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ShowPoll from "../../Components/Poll/ShowPoll";
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';


jest.mock('../../Components/Poll/ShowPollEndpoints', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("ShowPoll", () => {
  const mockProps = {
    _id: "123",
    pollTitle: "Test Poll",
    pollText: "This is a test poll",
    votes: [10, 20, 30],
    optionNames: ["Option 1", "Option 2", "Option 3"],
    pollEnded: false,
    createdAt: new Date(),
    voteLength: 7,
    handleNavigation: jest.fn(),
    didVote: false,
    optionSelected: "",
    votes: [0, 0, 0], // Set the votes state to a specific value
  };

  test("renders poll title and text", () => {
    render(
      <Router>
        <ShowPoll {...mockProps} />
      </Router>
    );
    expect(screen.getByText("Test Poll")).toBeInTheDocument();
    expect(screen.getByText("This is a test poll")).toBeInTheDocument();
  });

  test("renders vote options when user has not voted", () => {
    render(
      <Router>
        <ShowPoll {...mockProps} />
      </Router>
    );
    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
    expect(screen.getByText("Option 3")).toBeInTheDocument();
  });
});