import { render, fireEvent, screen } from '@testing-library/react';
import Activity from '../../../Components/NotificationsSetting/Activity/Activity'; 
import '@testing-library/jest-dom';


// Test for rendering Activity component
test('renders Activity component', () => {
  render(<Activity />);
  const ativityElement = screen.getByTestId('activity');
  expect(ativityElement).toBeInTheDocument();
});
  
// Test for Mentions of u/username label
test('renders Mentions of u/username label', () => {
  render(<Activity />);
  const mentionLabels = screen.getAllByText("Mentions of u/username"); 
  mentionLabels.forEach((mentionLabel) => {
    expect(mentionLabel).toBeInTheDocument();
  });
});

// Test for Comments on your posts label
test('renders Comments on your posts label', () => {
  render(<Activity />);
  const commentsLabels = screen.getAllByText("Comments on your posts"); 
  commentsLabels.forEach((commentsLabel) => {
    expect(commentsLabel).toBeInTheDocument();
});

});// Test for Upvotes on your posts label
test('renders Upvotes on your posts label', () => {
  render(<Activity />);
  const upvotespostsLabels = screen.getAllByText("Upvotes on your posts"); 
  upvotespostsLabels.forEach((upvotespostsLabel) => {
    expect(upvotespostsLabel).toBeInTheDocument();
});
  
});// Test for Upvotes on your comments label
test('renders Upvotes on your comments label', () => {
  render(<Activity />);
  const upvotescommentsLabels = screen.getAllByText("Upvotes on your comments"); 
  upvotescommentsLabels.forEach((upvotescommentsLabel) => {
    expect(upvotescommentsLabel).toBeInTheDocument();
  });
});

// Test for Replies to your comments label
test('renders Replies to your comments label', () => {
  render(<Activity />);
  const replycommentsLabels = screen.getAllByText("Replies to your comments"); 
  replycommentsLabels.forEach((replycommentsLabel) => {
    expect(replycommentsLabel).toBeInTheDocument();
});

});// Test for New followers label
test('renders New followers label', () => {
  render(<Activity />);
  const newfollowerLabels = screen.getAllByText("New followers"); 
  newfollowerLabels.forEach((newfollowerLabel) => {
    expect(newfollowerLabel).toBeInTheDocument();
});

});// Test for Posts you follow label
test('renders Posts you follow label', () => {
  render(<Activity />);
  const postsfollowLabels = screen.getAllByText("Posts you follow"); 
  postsfollowLabels.forEach((postsfollowLabel) => {
    expect(postsfollowLabel).toBeInTheDocument();
  });
});

// Test for checkbox default state
test('checkbox is unchecked by default', () => {
  render(<Activity />);
  const checkboxes = screen.queryAllByRole('checkbox');
  checkboxes.forEach((checkbox) => {
    expect(checkbox).toBeChecked();
  });
});

// Test for checkbox state after clicking
test('checkbox state toggles after clicking', () => {
  render(<Activity />);
  const checkboxes = screen.queryAllByRole('checkbox');
  checkboxes.forEach((checkbox) => {
    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });
});

// Test for checkbox state after clicking twice
test('checkbox state toggles back after clicking twice', () => {
  render(<Activity />);
  const checkboxes = screen.queryAllByRole('checkbox');
  checkboxes.forEach((checkbox) => {
    fireEvent.click(checkbox);
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });
});