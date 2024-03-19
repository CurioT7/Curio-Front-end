import React from 'react';
import { render, fireEvent, getByRole  } from '@testing-library/react';
import '@testing-library/jest-dom';
import Advanced from '../../../Components/profileSetting/Advanced/Advanced';

test('renders advanced settings properly', () => {
  const { getByText } = render(<Advanced />);
  
  // Test if headings and descriptions are rendered correctly
  expect(getByText('Allow people to follow you')).toBeInTheDocument();
  expect(getByText('Followers will be notified about posts you make to your profile and see them in their home feed.')).toBeInTheDocument();
  expect(getByText('Content visibility')).toBeInTheDocument();
//   expect(getByTestId('heading-descrip')).toBeInTheDocument();
  expect(getByText('Active in communities visibility')).toBeInTheDocument();
  expect(getByText('Show which communities I am active in on my profile.')).toBeInTheDocument();
//   expect(getByText('Clear history')).toBeInTheDocument();
//   expect(getByRole('button', { name: 'Clear history' })).toBeInTheDocument();
});

test('follow checkbox toggles properly', () => {
  const { getByTestId } = render(<Advanced />);
  const followCheckbox = getByTestId('follow-checkbox');
  
  // Test if initial state is true
  expect(followCheckbox.checked).toBe(true);
  
  // Click checkbox and test if state changes to false
  fireEvent.click(followCheckbox);
  expect(followCheckbox.checked).toBe(false);
});

test('content visibility checkbox toggles properly', () => {
  const { getByTestId } = render(<Advanced />);
  const contentVisibilityCheckbox = getByTestId('content-visibility-checkbox');
  
  // Test if initial state is true
  expect(contentVisibilityCheckbox.checked).toBe(true);
  
  // Click checkbox and test if state changes to false
  fireEvent.click(contentVisibilityCheckbox);
  expect(contentVisibilityCheckbox.checked).toBe(false);
});

test('communities visibility checkbox toggles properly', () => {
  const { getByTestId } = render(<Advanced />);
  const communitiesVisibilityCheckbox = getByTestId('communities-visibility-checkbox');
  
  // Test if initial state is true
  expect(communitiesVisibilityCheckbox.checked).toBe(true);
  
  // Click checkbox and test if state changes to false
  fireEvent.click(communitiesVisibilityCheckbox);
  expect(communitiesVisibilityCheckbox.checked).toBe(false);
});
