import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PostMethods from '../../Components/Create_Post/PostMethods';
import '@testing-library/jest-dom';

describe('PostMethods Component', () => {
  test('renders with initial selected tab', () => {
    const onMethodSelectMock = jest.fn();

    const { getByText } = render(<PostMethods onMethodSelect={onMethodSelectMock} />);

    // Assert that 'Post' tab is rendered and selected by default
    expect(getByText('Post')).toHaveStyle('borderBottomColor: "blue"');
  });

  test('calls onMethodSelect callback when a tab is clicked', () => {
    const onMethodSelectMock = jest.fn();
    const { getByText } = render(<PostMethods onMethodSelect={onMethodSelectMock} />);

    // Simulate clicking the 'Image & Video' tab
    fireEvent.click(getByText('Image & Video'));

    // Assert that onMethodSelect callback is called with the correct argument
    expect(onMethodSelectMock).toHaveBeenCalledWith('media');
  });

  test('calls onMethodSelect callback with the correct argument when a tab is clicked', () => {
    const onMethodSelectMock = jest.fn();
    const { getByText } = render(<PostMethods onMethodSelect={onMethodSelectMock} />);

    // Simulate clicking the 'Polls' tab
    fireEvent.click(getByText('Polls'));

    // Assert that onMethodSelect callback is called with the correct argument ('poll')
    expect(onMethodSelectMock).toHaveBeenCalledWith('poll');
  });

  test('calls onMethodSelect callback with the correct argument when a tab is clicked', () => {
    const onMethodSelectMock = jest.fn();
    const { getByText } = render(<PostMethods onMethodSelect={onMethodSelectMock} />);

    // Simulate clicking the 'Post' tab
    fireEvent.click(getByText('Post'));

    // Assert that onMethodSelect callback is called with the correct argument ('poll')
    expect(onMethodSelectMock).toHaveBeenCalledWith('post');
  });

  test('calls onMethodSelect callback with the correct argument when a tab is clicked', () => {
    const onMethodSelectMock = jest.fn();
    const { getByText } = render(<PostMethods onMethodSelect={onMethodSelectMock} />);

    // Simulate clicking the 'Link' tab
    fireEvent.click(getByText('Link'));

    // Assert that onMethodSelect callback is called with the correct argument ('link')
    expect(onMethodSelectMock).toHaveBeenCalledWith('link');
  });
  // Add more tests as needed
});
