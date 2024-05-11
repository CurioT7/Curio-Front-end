import { render, screen } from '@testing-library/react';
import ModSettings from './ModSettings.jsx'; // Adjust this import path to your actual file structure

const mockSettings = {
  communityName: 'Test Community',
  communityDescription: 'This is a test community.',
  welcomeMessage: 'Yes',
  communityType: 'Public',
  ageCheck: true,
};

describe("ModSettings", () => {
  test("renders ModSettings component", () => {
    render(<ModSettings settings={mockSettings} />);

    const buttonElement = screen.getByText(/Save/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test("renders community name input", () => {
    render(<ModSettings />);

    const communityNameInput = screen.getByLabelText(/Community name/i);
    expect(communityNameInput).toBeInTheDocument();
  });

  test("renders community description input", () => {
    render(<ModSettings />);

    const communityDescriptionInput = screen.getByLabelText(/Community description/i);
    expect(communityDescriptionInput).toBeInTheDocument();
  });

  test("renders welcome message radio buttons", () => {
    render(<ModSettings />);

    const yesRadioButton = screen.getByLabelText(/Yes/i);
    const noRadioButton = screen.getByLabelText(/No/i);

    expect(yesRadioButton).toBeInTheDocument();
    expect(noRadioButton).toBeInTheDocument();
  });

  test("renders community type radio buttons", () => {
    render(<ModSettings />);

    const publicRadioButton = screen.getByLabelText(/Public/i);
    const restrictedRadioButton = screen.getByLabelText(/Restricted/i);
    const privateRadioButton = screen.getByLabelText(/Private/i);

    expect(publicRadioButton).toBeInTheDocument();
    expect(restrictedRadioButton).toBeInTheDocument();
    expect(privateRadioButton).toBeInTheDocument();
  });

  test("renders age check checkbox", () => {
    render(
      <Router>
        <ModSettings />
      </Router>
    );
  
    const ageCheckCheckbox = screen.getByLabelText(/18\+ year old community/i);
    expect(ageCheckCheckbox).toBeInTheDocument();
  });
});