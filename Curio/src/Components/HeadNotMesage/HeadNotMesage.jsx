import React from 'react';
import "./HeadNotMesage.css";
import { Link } from 'react-router-dom';


function HeadNotMesage() {
    return (
        <div className='head-not-message-container'>
            <div className='notifications-section'>
                <div className='notifications-title-section'>
                    <span>Notifications</span>
                </div>
            </div>
            <Link to={'/message/messages'}>
                <div className='messages-section'>
                    <span>
                        Messages
                    </span>
                </div>
            </Link>
        </div>
    );
}

export default HeadNotMesage;