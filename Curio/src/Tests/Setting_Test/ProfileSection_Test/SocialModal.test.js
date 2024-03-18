import React from "react";
import { render, fireEvent, screen } from '@testing-library/react';
import Socialmodal from "../../../Components/profileSetting/Socialmodal/Socialmodal"

describe("Socialmodal Component Tests", () => {
  beforeEach(() => {
    render(<Socialmodal />);
  });

  test("renders add social link button", () => {
    const addButton = screen.getByText("Add social link");
    expect(addButton).toBeInTheDocument(); 
  });

  test("opens modal when add social link button is clicked", () => {
    const addButton = screen.getByText("Add social link");
    fireEvent.click(addButton);
    const modalHeader = screen.getByText("Add Social Link");
    expect(modalHeader).toBeInTheDocument(); 
  });

  test("adds a social link when clicked", () => {
    fireEvent.click(screen.getByText("Add social link"));
    fireEvent.click(screen.getByText("Custom URL")); 
    const addedLink = screen.getByText("Custom URL");
    expect(addedLink).toBeInTheDocument(); 
  });

  test("removes a social link when remove icon is clicked", () => {
    fireEvent.click(screen.getByText("Add social link"));
    fireEvent.click(screen.getByText("Custom URL")); 
    fireEvent.click(screen.getByTestId("remove-link")); 
    const removedLink = screen.queryByText("Custom URL");
    expect(removedLink).not.toBeInTheDocument(); 
  });
});
