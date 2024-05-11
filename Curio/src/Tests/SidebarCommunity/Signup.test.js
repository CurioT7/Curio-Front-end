import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Preferences from '../../Components/Signup/Preferences';

describe('Preferences component', () => {

  it('handles button click', () => {
    const onSignup = jest.fn();
    const { getByText } = render(
      <Preferences
        show={true}
        onHide={() => {}}
        onBackToGender={() => {}}
        onSignup={onSignup}
      />
    );

    fireEvent.click(getByText('NBA'));
    fireEvent.click(getByText('Continue'));
    expect(onSignup).toHaveBeenCalled();
  });

  // Add more test cases for different scenarios
});
