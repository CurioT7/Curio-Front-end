import { render, screen } from '@testing-library/react';
import Post from '../../Components/Post/Post';
import React from 'react';
import '@testing-library/jest-dom';


describe('Post component', () => {
  test('renders moderator tools when isMod is true', () => {
    render(<Post isMod={true} />);
    const modTools = screen.getByRole('button', { name: /BsShield/i });
    expect(modTools).toBeInTheDocument();
  });

  test('renders PiLockSimpleFill icon when isLocked is true', () => {
    render(<Post isMod={true} isLocked={true} />);
    const lockIcon = screen.getByRole('img', { name: /PiLockSimpleFill/i });
    expect(lockIcon).toBeInTheDocument();
  });

  test('renders PiLockSimple icon when isLocked is false', () => {
    render(<Post isMod={true} isLocked={false} />);
    const unlockIcon = screen.getByRole('img', { name: /PiLockSimple/i });
    expect(unlockIcon).toBeInTheDocument();
  });
});