import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SearchBy from '../../Components/Navbar/SearchBy';
import '@testing-library/jest-dom';

describe('SearchBy', () => {
    it('renders user details', () => {
      const { getByText } = render(<SearchBy type="user" name="testuser" description="1000" avatar="avatar.jpg" />);
      
      expect(getByText('u/testuser')).toBeInTheDocument();
      expect(getByText('1000 karma')).toBeInTheDocument();
    });
  
    it('renders community details', () => {
      const { getByText } = render(<SearchBy type="comm" name="testcomm" description="2000" avatar="avatar.jpg" />);
      
      expect(getByText('r/testcomm')).toBeInTheDocument();
      expect(getByText('2000 members')).toBeInTheDocument();
    });
    it('renders user details and avatar', () => {
        const { getByText, getByTestId } = render(<SearchBy type="user" name="testuser" description="1000" avatar="avatar.jpg" />);
        
        expect(getByText('u/testuser')).toBeInTheDocument();
        expect(getByText('1000 karma')).toBeInTheDocument();
        expect(getByTestId('avatar')).toBeInTheDocument();
      });
    
      it('renders community details and avatar', () => {
        const { getByText, getByTestId } = render(<SearchBy type="comm" name="testcomm" description="2000" avatar="avatar.jpg" />);
        
        expect(getByText('r/testcomm')).toBeInTheDocument();
        expect(getByText('2000 members')).toBeInTheDocument();
        expect(getByTestId('avatar')).toBeInTheDocument();
      });
  });