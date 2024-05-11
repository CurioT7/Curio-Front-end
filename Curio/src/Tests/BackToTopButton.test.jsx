import React from "react";
import { render, fireEvent } from "@testing-library/react";
import BackToTopButton from "../Pages/Home/BackToTopButton";

describe("BackToTopButton", () => {
  it("should not render the button when isVisible is false", () => {
    const { queryByText } = render(<BackToTopButton isVisible={false} />);
    const button = queryByText("Back to Top");
    expect(button).toBeNull();
  });


});