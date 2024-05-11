import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Trending from '../../Components/Navbar/Trending';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import '@testing-library/jest-dom';

describe('Trending', () => {
  it('renders trending post details and avatar', () => {
    const { getByText, getByTestId } = render(<Trending title="testtitle" description="testdescription" />);
    
    expect(getByText('testtitle')).toBeInTheDocument();
    expect(getByText('testdescription')).toBeInTheDocument();
    expect(getByTestId('avatar')).toBeInTheDocument();
  });

  
});