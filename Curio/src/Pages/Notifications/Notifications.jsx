import React from 'react';
import "./Notifications.css";
import NotificationsPage from '../../Components/NotificationsPage/NotificationsPage';
import HeadNotMesage from '../../Components/HeadNotMesage/HeadNotMesage';

function Notifications() {
  return (
    <div className='Notifications-page-conatainer'>
        <h1 className='notifications-page-title'>
            Notifications
        </h1>
        <div className='notifications-content'>
            <HeadNotMesage />
            <NotificationsPage />
        </div>
    </div>
  );
}

export default Notifications;