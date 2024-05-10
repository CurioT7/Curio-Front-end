import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SubjectMessage from '../../Components/Private_Messages/subject_message/subject_message';
import '@testing-library/jest-dom';

describe('SubjectMessage component', () => {
  test('calls setSubject function with input value when input changes', () => {
    const setSubject = jest.fn();
    const { getByTestId } = render(<SubjectMessage setSubject={setSubject} />);
    const input = getByTestId('subject-message-input');

    fireEvent.change(input, { target: { value: 'testSubject' } });

    expect(setSubject).toHaveBeenCalledWith('testSubject');
  });

  test('renders input element', () => {
    const { getByTestId } = render(<SubjectMessage setSubject={() => {}} />);
    const input = getByTestId('subject-message-input');

    expect(input).toBeInTheDocument();
  });

  test('input value updates correctly', () => {
    const setSubject = jest.fn();
    const { getByTestId } = render(<SubjectMessage setSubject={setSubject} />);
    const input = getByTestId('subject-message-input');

    fireEvent.change(input, { target: { value: 'newSubject' } });

    expect(input.value).toBe('newSubject');
  });
});
