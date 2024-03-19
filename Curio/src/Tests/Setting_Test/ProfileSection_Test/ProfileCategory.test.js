import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProfileCategory from '../../../Components/profileSetting/ProfileCategory/ProfileCategory'; 

// Test for rendering ProfileCategory component
test('renders ProfileCategory component', () => {
  render(<ProfileCategory />);
  const categoryElement = screen.getByTestId('profile-category');
  expect(categoryElement).toBeInTheDocument();
});

// Test for NSFW label
test('renders NSFW label', () => {
    render(<ProfileCategory />);
    const nsfwLabels = screen.getAllByText(/NSFW/i); 
    nsfwLabels.forEach((nsfwLabel) => {
      expect(nsfwLabel).toBeInTheDocument();
    });
  });

// Test for NSFW description
test('renders NSFW description', () => {
  render(<ProfileCategory />);
  const nsfwDescription = screen.getByText(/This content is NSFW/i);
  expect(nsfwDescription).toBeInTheDocument();
});

// Test for checkbox default state
test('checkbox is unchecked by default', () => {
  render(<ProfileCategory />);
  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).not.toBeChecked();
});

// Test for checkbox state after clicking
test('checkbox state toggles after clicking', () => {
  render(<ProfileCategory />);
  const checkbox = screen.getByRole('checkbox');
  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();
});

// Test for checkbox state after clicking twice
test('checkbox state toggles back after clicking twice', () => {
  render(<ProfileCategory />);
  const checkbox = screen.getByRole('checkbox');
  fireEvent.click(checkbox);
  fireEvent.click(checkbox);
  expect(checkbox).not.toBeChecked();
});

// Test for checkbox state after clicking multiple times
test('checkbox state toggles properly after clicking multiple times', () => {
  render(<ProfileCategory />);
  const checkbox = screen.getByRole('checkbox');
  fireEvent.click(checkbox);
  fireEvent.click(checkbox);
  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();
});

