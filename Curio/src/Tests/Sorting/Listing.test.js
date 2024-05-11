import { render, fireEvent } from '@testing-library/react';
import Listing from '../../Components/CommunitiesListing/Listing';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';

describe('Listing', () => {
  it('renders without crashing', () => {
    render(
      <Router>
        <Listing isHome={true} />
      </Router>
    );
  });

  it('toggles dropdown on click', () => {
    const { getByTestId } = render(
      <Router>
        <Listing isHome={true} />
      </Router>
    );
    const button = getByTestId('list-button');
    fireEvent.click(button);
    expect(getByTestId('dropdown-content').classList.contains('show')).toBe(true);
  });

  it('changes list value on dropdown item click', () => {
    const mockOnChangeSort = jest.fn();
    const { getByTestId } = render(
      <Router>
        <Listing isHome={true} onChangeSort={mockOnChangeSort} />
      </Router>
    );
    const button = getByTestId('list-button');
    fireEvent.click(button);
    const dropdownItem = getByTestId('link-sort-New');
    fireEvent.click(dropdownItem);
    expect(localStorage.getItem('listValue')).toBe('New');
  });

  it('changes list value to "Hot" when "Hot" is clicked', () => {
    const mockOnChangeSort = jest.fn();
    const { getByTestId } = render(
      <Router>
        <Listing isHome={true} onChangeSort={mockOnChangeSort} />
      </Router>
    );
    const button = getByTestId('list-button');
    fireEvent.click(button);
    const dropdownItem = getByTestId('link-sort-Hot');
    fireEvent.click(dropdownItem);
    expect(localStorage.getItem('listValue')).toBe('Hot');
  });

  it('changes list value to "Top" when "Top" is clicked', () => {
    const mockOnChangeSort = jest.fn();
    const { getByTestId } = render(
      <Router>
        <Listing isHome={true} onChangeSort={mockOnChangeSort} />
      </Router>
    );
    const button = getByTestId('list-button');
    fireEvent.click(button);
    const dropdownItem = getByTestId('link-sort-Top');
    fireEvent.click(dropdownItem);
    expect(localStorage.getItem('listValue')).toBe('Top');
  });
  it('changes list value to "Top" when "Top" is clicked', () => {
    const mockOnChangeSort = jest.fn();
    const { getByTestId } = render(
      <Router>
        <Listing isHome={true} onChangeSort={mockOnChangeSort} />
      </Router>
    );
    const button = getByTestId('list-button');
    fireEvent.click(button);
    const dropdownItem = getByTestId('link-sort-Top');
    fireEvent.click(dropdownItem);
    expect(mockOnChangeSort).toHaveBeenCalledWith('Top', 'day');
  });

  it('changes time interval to "week" when "Top" is selected and "week" is clicked', () => {
    const mockOnChangeSort = jest.fn();
    const { getByTestId } = render(
      <Router>
        <Listing isHome={true} onChangeSort={mockOnChangeSort} />
      </Router>
    );
    const button = getByTestId('list-button');
    fireEvent.click(button);
    const dropdownItem = getByTestId('link-sort-Top');
    fireEvent.click(dropdownItem);
    const timeIntervalButton = getByTestId('time-interval-button');
    fireEvent.click(timeIntervalButton);
    const timeIntervalItem = getByTestId('link-time-interval-This Week');
    fireEvent.click(timeIntervalItem);
    expect(mockOnChangeSort).toHaveBeenCalledWith('Top', 'week');
  });


  // Add more tests here to cover other functionalities
});