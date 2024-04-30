import React, { useState, useEffect } from 'react';
import "./Notifications.css";
import NotificationsPage from '../../Components/NotificationsPage/NotificationsPage';
import HeadNotMesage from '../../Components/HeadNotMesage/HeadNotMesage';
import { fetchNotificationsFromBackend, hideNotification, sendReadNotifications } from '../Notifications/NotificationsEndPoints';

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState([]);


  useEffect(() => {
    fetchAndSetData();
  }, []);

  async function fetchAndSetData() {
    const data = await fetchNotificationsFromBackend();
    if (data) {
      setNotifications(data.notifications.reverse() || []);
      setUnreadNotifications(data.unreadNotifications || []);
    }
  }

  async function handleHideNotification(notificationID) {
    try {
      await hideNotification({ notificationID: notificationID });
      setNotifications(notifications.filter(notification => notification._id !== notificationID));
    } catch (error) {
      console.error('Error hiding notification:', error.message);
    }
  }

  async function handleNotificationClick(notificationID) {
    try {
      await sendReadNotifications(notificationID);
    } catch (error) {
      console.error('Error marking notification as read:', error.message);
    }
  }


  return (
    <div className='Notifications-page-conatainer' style={{ marginTop: '3rem' }}>
      <h1 className='notifications-page-title'>
        Notifications
      </h1>
      <div className='notifications-content'>
        <HeadNotMesage />
        <NotificationsPage
          notifications={notifications}
          unreadNotifications={unreadNotifications}
          onHideNotification={handleHideNotification}
          onNotificationClick={handleNotificationClick}
        />
      </div>
    </div>
  );
}

export default Notifications;