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
