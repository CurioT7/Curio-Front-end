import React from 'react';
import { render, fireEvent, getByText, queryByTestId } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProfileCategory from "../../../Components/profileSetting/ProfileCategory/ProfileCategory"

// Mocking the useToast and sendUserDataToBackend functions
jest.mock('@chakra-ui/react', () => ({
  ...jest.requireActual('@chakra-ui/react'),
  useToast: jest.fn(),
}));

jest.mock('../../../Components/UserSetting/UserSettingsEndPoints', () => ({
  sendUserDataToBackend: jest.fn(),
}));

describe('<ProfileCategory />', () => {
  test('renders without crashing', () => {
    render(<ProfileCategory userCategory={{}} />);
  });

  test('displays NSFW switch and description', () => {
    const { getByText } = render(<ProfileCategory userCategory={{}} />);
    expect(getByText('NSFW')).toBeInTheDocument();
    expect(getByText('This content is NSFW (may contain nudity, pornography, profanity, or inappropriate content for those under 18)')).toBeInTheDocument();
  });

  // test('handles switch change properly', () => {
  //   const { getByTestId } = render(<ProfileCategory userCategory={{ NSFW: false }} />);
  //   const switchElement = getByTestId('nsfw-switch');

  //   fireEvent.click(switchElement);

  //   // Should open the modal
  //   expect(getByTestId('modal')).toBeInTheDocument();
  // });

  // test('confirms change properly', () => {
  //   const { getByTestId, getByText, queryByTestId, debug } = render(<ProfileCategory userCategory={{ NSFW: true }} />);
  //   const switchElement = getByTestId('nsfw-switch');
  
  //   fireEvent.click(switchElement);
  
  //   // Should open the modal
  //   expect(getByTestId('modal')).toBeInTheDocument();
  
  //   // Find the button directly by its text content
  //   const understandButton = getByText('I UNDERSTAND');
  
  //   fireEvent.click(understandButton);
  
  //   // Log the current HTML structure for debugging
  //   debug();
  
  //   // Should close the modal
  //   expect(queryByTestId('modal')).toBeNull();
  
  //   // Should call sendUserDataToBackend with the correct parameter
  //   expect(sendUserDataToBackend).toHaveBeenCalledWith({ NSFW: false });
  // });  
});
