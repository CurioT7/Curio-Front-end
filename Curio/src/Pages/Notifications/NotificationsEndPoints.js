import axios from "axios";
const serverHost = import.meta.env.VITE_SERVER_HOST;

export async function fetchNotificationsFromBackend() {
    try {
        const responseAllNotification = await axios.get(`${serverHost}/api/notifications/history`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        const responseUnreadNotification = await axios.get(`${serverHost}/api/notifications/unread`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });        
        return {
            notifications: responseAllNotification.data.notifications,
            unreadNotifications: responseUnreadNotification.data.unreadNotifications
        };
    } catch (error) {
        if (error.response && error.response.status === 401) {
            console.error('Unauthorized');
        } else if (error.request && error.request.status === 500) {
            console.error('Internal Server error');
        } else {
            console.error('Error', error.message);
        }
    }
}


export async function hideNotification(notificationID) {
    try {
        const response = await axios.post(`${serverHost}/api/notifications/hide`, notificationID, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error hiding notification:', error.message);
        throw error;
    }
}

export async function disableNotification(notificationID) {
    try {
        const response = await axios.post(`${serverHost}/api/notifications/hide`, notificationID, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error hiding notification:', error.message);
        throw error;
    }
}