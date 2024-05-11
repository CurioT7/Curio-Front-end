import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import SentMessages from '../../Components/Sent_Messages_Table/Sent_Messages_Table';


describe('SentMessages component', () => {
    test('renders component with correct props', () => {
        const props = {
            cakeDay: '2024-01-01',
            displayName: 'John Doe',
            postkarma: 100,
            commentkarma: 200,
            about: 'Lorem ipsum dolor sit amet',
            subject: 'Test Subject',
            recipient: 'recipient_user',
            sender: 'sender_user',
            timestamp: new Date().getTime(),
            isRecipientNull: false,
            setMessage: jest.fn() // Provide any mock function needed for testing
        };

        const { getByTestId } = render(
            <Router>
                <SentMessages {...props} />
            </Router>
        );
        const subjectElement = getByTestId('subject');
        const recipientElement = getByTestId('recipient');
        const senderElement = getByTestId('sender');

        expect(subjectElement).toHaveTextContent('Test Subject');
        expect(recipientElement).toHaveTextContent('recipient_user');
        expect(senderElement).toHaveTextContent('sender_user');
    });
});

test('renders message content correctly', () => {
    const props = {
        cakeDay: '2024-01-01',
        displayName: 'John Doe',
        postkarma: 100,
        commentkarma: 200,
        about: 'Lorem ipsum dolor sit amet',
        subject: 'Test Subject',
        recipient: 'recipient_user',
        sender: 'sender_user',
        timestamp: new Date().getTime(),
        message: 'This is a test message',
        isRecipientNull: false,
        setMessage: jest.fn() // Provide any mock function needed for testing
    };

    const { getByText } = render(
        <Router>
            <SentMessages {...props} />
        </Router>
    );

    const messageContentElement = getByText('This is a test message');

    expect(messageContentElement).toBeInTheDocument();
});


test('renders recipient type correctly', () => {
    const propsUser = {
        cakeDay: '2024-01-01',
        displayName: 'John Doe',
        postkarma: 100,
        commentkarma: 200,
        about: 'Lorem ipsum dolor sit amet',
        subject: 'Test Subject',
        recipient: 'recipient_user',
        sender: 'sender_user',
        timestamp: new Date().getTime(),
        isRecipientNull: false,
        setMessage: jest.fn() // Provide any mock function needed for testing
    };

    const propsSubreddit = {
        cakeDay: '2024-01-01',
        displayName: 'John Doe',
        postkarma: 100,
        commentkarma: 200,
        about: 'Lorem ipsum dolor sit amet',
        subject: 'Test Subject',
        recipient: 'recipient_subreddit',
        sender: 'sender_user',
        timestamp: new Date().getTime(),
        isRecipientNull: true,
        setMessage: jest.fn() // Provide any mock function needed for testing
    };

    const { getByText: getByTextUser } = render(
        <Router>
            <SentMessages {...propsUser} />
        </Router>
    );

    const { getByText: getByTextSubreddit } = render(
        <Router>
            <SentMessages {...propsSubreddit} />
        </Router>
    );

    const recipientUserElement = getByTextUser('/u/recipient_user');
    const recipientSubredditElement = getByTextSubreddit('/r/recipient_subreddit');

    expect(recipientUserElement).toBeInTheDocument();
    expect(recipientSubredditElement).toBeInTheDocument();
});

test('renders sender subreddit link correctly', () => {
    const props = {
        cakeDay: '2024-01-01',
        displayName: 'John Doe',
        postkarma: 100,
        commentkarma: 200,
        about: 'Lorem ipsum dolor sit amet',
        subject: 'Test Subject',
        recipient: 'recipient_user',
        sender: 'sender_user',
        timestamp: new Date().getTime(),
        isRecipientNull: false,
        setMessage: jest.fn() // Provide any mock function needed for testing
    };

    const { getByText } = render(
        <Router>
            <SentMessages {...props} />
        </Router>
    );

    const subredditLinkElement = getByText('/r/sender_user');

    expect(subredditLinkElement).toBeInTheDocument();
});

test('renders "via" and "M" indicators correctly', () => {
    const props = {
        cakeDay: '2024-01-01',
        displayName: 'John Doe',
        postkarma: 100,
        commentkarma: 200,
        about: 'Lorem ipsum dolor sit amet',
        subject: 'Test Subject',
        recipient: 'recipient_user',
        sender: 'sender_user',
        timestamp: new Date().getTime(),
        isRecipientNull: false,
        setMessage: jest.fn() // Provide any mock function needed for testing
    };

    const { getByText } = render(
        <Router>
            <SentMessages {...props} />
        </Router>
    );

    const viaElement = getByText('via');
    const mIndicatorElement = getByText('M');

    expect(viaElement).toBeInTheDocument();
    expect(mIndicatorElement).toBeInTheDocument();
});
