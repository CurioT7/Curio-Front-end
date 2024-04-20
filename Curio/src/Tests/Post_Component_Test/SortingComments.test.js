// SortingComments.test.jsx
import { render, fireEvent, screen } from '@testing-library/react';
import SortingComments from '../../Components/Post/SortingComments';

describe('SortingComments', () => {
  let mockOnChangeSort;

  beforeEach(() => {
    mockOnChangeSort = jest.fn();
  });

  it('renders with initial sort value', () => {
    render(<SortingComments onChangeSort={mockOnChangeSort} />);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('changes sort value when sort item is clicked', () => {
    render(<SortingComments onChangeSort={mockOnChangeSort} />);
    fireEvent.click(screen.getByText('Best'));
    expect(mockOnChangeSort).toHaveBeenCalledWith('best');
    expect(screen.getByText('Best')).toBeInTheDocument();
  });

  it('toggles sort options when sort button is clicked', () => {
    render(<SortingComments onChangeSort={mockOnChangeSort} />);
    const sortButton = screen.getByRole('button');
    fireEvent.click(sortButton);
    expect(screen.getByText('Sort By')).toBeInTheDocument();
    fireEvent.click(sortButton);
    expect(screen.queryByText('Sort By')).not.toBeInTheDocument();
  });
});