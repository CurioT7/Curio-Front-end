import { render, screen, fireEvent } from '@testing-library/react';
import SocialLinksSection from '../../../Components/profileSetting/SocialLinksSection/SocialLinksSection';

describe("SocialLinksSection Component Tests", () => {
    beforeEach(() => {
        render(<SocialLinksSection />);
    });

    test('renders social links section correctly', () => {
        const heading = screen.getByText('Social links (5 max)');
        const description = screen.getByText('People who visit your profile will see your social links.');
        expect(heading).toBeInTheDocument();
        expect(description).toBeInTheDocument();
    });
    
    test('renders social modal button', () => {
        const socialModalButton = screen.getByRole('button', { name: 'Open Social Modal' });
        expect(socialModalButton).toBeInTheDocument();
    });
    
    test('renders social modal when button is clicked', () => {
        const socialModalButton = screen.getByRole('button', { name: 'Open Social Modal' });
        fireEvent.click(socialModalButton);
        const socialModal = screen.getByRole('dialog', { name: 'Social Modal' });
        expect(socialModal).toBeInTheDocument();
    });    
});
