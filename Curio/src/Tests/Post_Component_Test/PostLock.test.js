// PostLock.test.jsx
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import PostLock from '../../Components/Post/PostLock.jsx';
import { FetchPostLockStatus, SendLockedPost, SendUnlockedPost } from '../../Components/Post/PostEndPoints.js';
import '@testing-library/jest-dom';

jest.mock('../../Components/Post/PostEndPoints.js',() => ({
    __esModule: true,
    default: jest.fn(),
    FetchPostLockStatus: jest.fn(),
    SendLockedPost: jest.fn(),
    SendUnlockedPost: jest.fn(),
  }));
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
  }));
describe('PostLock', () => {
  let mockHandleIsLocked;
  let mockOnChangeLock;

  beforeEach(() => {
    mockHandleIsLocked = jest.fn();
    mockOnChangeLock = jest.fn();
    FetchPostLockStatus.mockResolvedValue({ item: { isLocked: false } });
    SendLockedPost.mockResolvedValue({ success: true });
    SendUnlockedPost.mockResolvedValue({ success: true });
  });

  it('fetches post lock status on mount', async () => {
    render(<PostLock id="1" handleIsLocked={mockHandleIsLocked} onChangeLock={mockOnChangeLock} />);
    await waitFor(() => expect(FetchPostLockStatus).toHaveBeenCalledWith("1"));
    expect(mockHandleIsLocked).toHaveBeenCalledWith(false);
  });

  it('locks post when lock button is clicked', async () => {
    render(<PostLock id="1" handleIsLocked={mockHandleIsLocked} onChangeLock={mockOnChangeLock} />);
    fireEvent.click(screen.getByText('Lock comments'));
    await waitFor(() => expect(SendLockedPost).toHaveBeenCalledWith("1"));
    expect(mockOnChangeLock).toHaveBeenCalledWith(true);
  });

  it('unlocks post when unlock button is clicked', async () => {
    FetchPostLockStatus.mockResolvedValueOnce({ item: { isLocked: true } });
    render(<PostLock id="1" handleIsLocked={mockHandleIsLocked} onChangeLock={mockOnChangeLock} />);
    fireEvent.click(screen.getByText('Unlock Comments'));
    await waitFor(() => expect(SendUnlockedPost).toHaveBeenCalledWith("1"));
    expect(mockOnChangeLock).toHaveBeenCalledWith(false);
  });
});