import React from 'react';
import "./HeadNotMesage.css"

function HeadNotMesage() {
  return (
    <div className='head-not-message-container'>
        <div className='notifications-section'>
            <div className='notifications-title-section'>
                <span>Notifications</span>
            </div>
        </div>
        <a href='#'>
            <div className='messages-section'>
                <div>
                    <span>
                    Messages
                    </span>
                </div>
            </div>
        </a>
    </div>
  );
}

export default HeadNotMesage;