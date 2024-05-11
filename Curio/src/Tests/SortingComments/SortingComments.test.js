import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SortingComments from '../../Components/Post/SortingComments';
import '@testing-library/jest-dom';

describe('SortingComments', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<SortingComments onChangeSort={() => {}} />);
    expect(getByText('Sort By:')).toBeInTheDocument();
  });

  it('changes sort value when a sort item is clicked', () => {
    const mockOnChangeSort = jest.fn();
    const { getByText } = render(<SortingComments onChangeSort={mockOnChangeSort} />);

    fireEvent.click(getByText('Best'));
    expect(mockOnChangeSort).toHaveBeenCalledWith('best');

    fireEvent.click(getByText('Top'));
    expect(mockOnChangeSort).toHaveBeenCalledWith('top');

    fireEvent.click(getByText('New'));
    expect(mockOnChangeSort).toHaveBeenCalledWith('new');
  });
});