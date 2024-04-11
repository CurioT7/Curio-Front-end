import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import Listing from '../../Components/CommunitiesListing/Listing';

test('renders initial state', async () => {
    render(<Listing />);
    const dropdownElement = await waitFor(() => screen.getByRole('button', { name: /Hot/i }));
    expect(dropdownElement).toBeInTheDocument();
});