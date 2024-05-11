import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Banned from '../../Components/ModerationComponents/UserManagement/Banned';

describe('Banned', () => {
  test('renders Banned component', () => {
    render(<Banned communityName="community" />);
    const banUserBtn = screen.getByText('Ban user');
    expect(banUserBtn).toBeInTheDocument();
  });

  test('opens modal when "Ban user" button is clicked', () => {
    render(<Banned communityName="community" />);
    const banUserBtn = screen.getByText('Ban user');
    fireEvent.click(banUserBtn);
    const modalHeader = screen.getByText('Ban a user:');
    expect(modalHeader).toBeInTheDocument();
  });

  test('closes modal when "Cancel" button is clicked', () => {
    render(<Banned communityName="community" />);
    const banUserBtn = screen.getByText('Ban user');
    fireEvent.click(banUserBtn);
    const cancelBtn = screen.getByText('Cancel');
    fireEvent.click(cancelBtn);
    const modalHeader = screen.queryByText('Ban a user:');
    expect(modalHeader).not.toBeInTheDocument();
  });

  test('submits the form when "Ban" button is clicked', () => {
    render(<Banned communityName="community" />);
    const banUserBtn = screen.getByText('Ban user');
    fireEvent.click(banUserBtn);
    const banBtn = screen.getByText('Ban');
    fireEvent.click(banBtn);
  });

});