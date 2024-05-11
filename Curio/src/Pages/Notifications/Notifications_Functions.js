/**
 * @module NotificationsFunctions
 */
import {
    hideNotification,
    sendReadNotifications,
    disableNotification,
    enableNotification
} from '../Notifications/NotificationsEndPoints';

/**
 * Handles hiding a notification.
 * @param {string} notificationID - The ID of the notification to hide.
 * @param {Array} notifications - The array of notifications.
 * @param {function} setNotifications - Function to set the notifications state.
 */
export async function handleHideNotification(notificationID, notifications, setNotifications) {
    try {
        await hideNotification({ notificationID: notificationID });
        setNotifications(notifications.filter(notification => notification._id !== notificationID));
    } catch (error) {
        console.error('Error hiding notification:', error.message);
    }
}

/**
 * Handles enabling or disabling a notification.
 * @param {string} notificationID - The ID of the notification to enable or disable.
 * @param {Array} notifications - The array of notifications.
 * @param {function} setNotifications - Function to set the notifications state.
 */
export async function handleEnableNotification(notificationID, notifications, setNotifications) {
    try {
        const notificationIndex = notifications.findIndex(notification => notification._id === notificationID);
        const updatedNotifications = [...notifications];
        const notification = updatedNotifications[notificationIndex];
        if (notification.type === "subreddit") {
            if (notification.isDisabled === false) {
                await disableNotification({ subredditName: notification.subredditName });
            } else {
                await enableNotification({ subredditName: notification.subredditName });
            }
        } else if (notification.type === "post") {
            if (notification.isDisabled === false) {
                await disableNotification({ postId: notification.postId });
            } else {
                await enableNotification({ postId: notification.postId });
            }
        } else if (notification.type === "Comment") {
            if (notification.isDisabled === false) {
                await disableNotification({ commentId: notification.commentId });
            } else {
                await enableNotification({ commentId: notification.commentId });
            }
        }
        updatedNotifications[notificationIndex].isDisabled = !notification.isDisabled;
        setNotifications(updatedNotifications);
    } catch (error) {
        console.error('Error Disable notification:', error.message);
    }
}

/**
 * Handles clicking on a notification.
 * @param {string} notificationID - The ID of the notification clicked.
 * @param {Array} notifications - The array of notifications.
 * @param {Array} unreadNotifications - The array of unread notifications.
 * @param {function} setUnreadNotifications - Function to set the unread notifications state.
 * @param {function} navigate - Function for navigation.
 */
export async function handleNotificationClick(notificationID, notifications, unreadNotifications, setUnreadNotifications, navigate) {
    try {
        const notification = notifications.find(notification => notification._id === notificationID);
        const isUnread = unreadNotifications.some(un => un._id === notificationID);
        if (isUnread) {
            await sendReadNotifications(notificationID);
            setUnreadNotifications(prevNotifications => prevNotifications.filter(notification => notification._id !== notificationID));
        }
        if (notification.type === "subreddit") {
            navigate(`/r/${notification.subredditName}`);
        } else if (notification.type === "post") {
            navigate(`/post/post-details/${notification.postId}`);
        } else if (notification.type === "Comment") {
            navigate(`/post/post-details/${notification.postId}`);
        } else if (notification.type === "Friend Request") {
            navigate(`/profile/${username}`);
        }
    } catch (error) {
        console.error('Error marking notification as read:', error.message);
    }
}

/**
 * Marks all notifications as read.
 * @param {Array} notifications - The array of notifications.
 * @param {Array} unreadNotifications - The array of unread notifications.
 * @param {function} setUnreadNotifications - Function to set the unread notifications state.
 */
export async function markAllAsRead(notifications, unreadNotifications, setUnreadNotifications) {
    try {
        // Filter out only unread notifications
        const unreadNotificationIDs = notifications
            .filter(notification => unreadNotifications.some(un => un._id === notification._id))
            .map(notification => notification._id);

        // Mark each unread notification as read
        await Promise.all(unreadNotificationIDs.map(notificationID => sendReadNotifications(notificationID)));

        // Clear the unread notifications state
        setUnreadNotifications([]);
    } catch (error) {
        console.error('Error marking all notifications as read:', error.message);
    }
}