import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Createpostarea from '../../Components/Create_Post/Createpostarea';

describe('Createpostarea component', () => {
//   it('renders without crashing', () => {
//     render(<Createpostarea />);
//   });

//   it('updates inputTitle state when title input changes', () => {
//     const { getByPlaceholderText } = render(<Createpostarea />);
//     const titleInput = getByPlaceholderText('Title');
//     fireEvent.change(titleInput, { target: { value: 'Test Title' } });
//     expect(titleInput.value).toBe('Test Title');
//   });

//   it('renders Post component when selectedMethod is "post"', () => {
//     const { getByText } = render(<Createpostarea />);
//     fireEvent.click(getByText('Post'));
//     expect(getByText('Post')).toBeInTheDocument();
//   });

//   it('renders ImageVideo component when selectedMethod is "media"', () => {
//     const { getByText } = render(<Createpostarea />);
//     fireEvent.click(getByText('Media'));
//     expect(getByText('Image/Video Upload')).toBeInTheDocument();
//   });

//   it('renders Link component when selectedMethod is "link"', () => {
//     const { getByText } = render(<Createpostarea />);
//     fireEvent.click(getByText('Link'));
//     expect(getByText('Link URL')).toBeInTheDocument();
//   });

//   it('renders Polls component when selectedMethod is "poll"', () => {
//     const { getByText } = render(<Createpostarea />);
//     fireEvent.click(getByText('Poll'));
//     expect(getByText('Number of Days')).toBeInTheDocument();
//   });
});
