import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FromMessage from '../../Components/Private_Messages/from_message/from_message';

describe('FromMessage Component', () => {
    const userCommunities = ['community1', 'community2'];
    const setSubreddit = jest.fn();

    test('renders FromMessage component', () => {
        const { getByLabelText } = render(<FromMessage userCommunities={userCommunities} setSubreddit={setSubreddit} />);
        const selectElement = getByLabelText('from');
        expect(selectElement).toBeInTheDocument();
    });

    test('handles option change', () => {
        const { getByLabelText } = render(<FromMessage userCommunities={userCommunities} setSubreddit={setSubreddit} />);
        const selectElement = getByLabelText('from');

        fireEvent.change(selectElement, { target: { value: 'r/community1' } });

        expect(setSubreddit).toHaveBeenCalledTimes(1);
        expect(setSubreddit).toHaveBeenCalledWith('community1');
    });

    test('displays user communities in select options', () => {
        const { getByLabelText } = render(<FromMessage userCommunities={userCommunities} setSubreddit={setSubreddit} />);
        const selectElement = getByLabelText('from');

        userCommunities.forEach((community) => {
            expect(selectElement).toHaveTextContent(`r/${community}`);
        });
    });

    test('selects correct option when user selects a community', () => {
        const { getByLabelText } = render(<FromMessage userCommunities={userCommunities} setSubreddit={setSubreddit} />);
        const selectElement = getByLabelText('from');

        fireEvent.change(selectElement, { target: { value: 'r/community1' } });

        expect(selectElement.value).toBe('r/community1');
    });

});
