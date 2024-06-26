import React, { useState, useEffect } from 'react';
import "./Notifications.css";
import NotificationsPage from '../../Components/NotificationsPage/NotificationsPage';
import HeadNotMesage from '../../Components/HeadNotMesage/HeadNotMesage';
import {
  fetchNotificationsFromBackend,
} from '../Notifications/NotificationsEndPoints';
import {
  handleHideNotification,
  handleEnableNotification,
  handleNotificationClick,
  markAllAsRead
} from "./Notifications_Functions"
function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState([]);


  useEffect(() => {
    fetchAndSetData();
  }, []);

  async function fetchAndSetData() {
    const data = await fetchNotificationsFromBackend();
    if (data) {
      setNotifications(data.notifications || []);
      setUnreadNotifications(data.unreadNotifications || []);
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
          onEnableNotification={handleEnableNotification}
          setNotifications={setNotifications}
          setUnreadNotifications={setUnreadNotifications}
          markAllAsRead={markAllAsRead}
        />
      </div>
    </div>
  );
}

export default Notifications;