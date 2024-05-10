import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Link from '../../Components/Create_Post/Link_Section/Link';
import '@testing-library/jest-dom';

describe('Link Component', () => {
  test('renders with a placeholder and empty input', () => {
    const onLinkChangeMock = jest.fn();
    const { getByPlaceholderText, getByDisplayValue } = render(<Link onLinkChange={onLinkChangeMock} />);

    const input = getByPlaceholderText('Url');
    expect(input).toBeInTheDocument();
    expect(getByDisplayValue('')).toBeInTheDocument();
  });

  test('calls onLinkChange callback when input value changes', () => {
    const onLinkChangeMock = jest.fn();
    const { getByPlaceholderText } = render(<Link onLinkChange={onLinkChangeMock} />);

    const input = getByPlaceholderText('Url');
    fireEvent.change(input, { target: { value: 'https://example.com' } });

    expect(onLinkChangeMock).toHaveBeenCalledWith('https://example.com');
  });
});
