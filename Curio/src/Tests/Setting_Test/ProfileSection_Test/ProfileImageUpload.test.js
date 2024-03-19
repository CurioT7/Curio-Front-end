import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProfileImageUpload from "../../../Components/profileSetting/ProfileImageUpload/ProfileImageUpload"; // Update import path to match your file structure

test('renders ProfileImageUpload component', () => {
    render(<ProfileImageUpload />);
    const profileBannerImagesElement = screen.getByTestId('profile-banner-images');
    expect(profileBannerImagesElement).toBeInTheDocument();
});

test('allows users to upload profile image', () => {
    render(<ProfileImageUpload />);
    const file = new File(['profile-image'], 'profile.png', { type: 'image/png' });
    const input = screen.getByLabelText('Drag and Drop or Upload Profile Image');
    fireEvent.change(input, { target: { files: [file] } });
    expect(input.files[0]).toBe(file);
});

test('allows users to upload banner image', () => {
    render(<ProfileImageUpload />);
    const file = new File(['banner-image'], 'banner.jpg', { type: 'image/jpeg' });
    const input = screen.getByLabelText('Drag and Drop or Upload Banner Image');
    fireEvent.change(input, { target: { files: [file] } });
    expect(input.files[0]).toBe(file);
});



  