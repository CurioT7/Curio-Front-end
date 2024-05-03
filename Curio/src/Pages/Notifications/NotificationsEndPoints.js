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
        console.log(responseAllNotification);

        return {
            notifications: responseAllNotification.data.notifications,
            unreadNotifications: responseUnreadNotification.data.unreadNotifications,
            unreadNumber: responseUnreadNotification.data.unreadCount,
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

export async function disableNotification(data) {
    try {
        const response = await axios.post(`${serverHost}/api/notifications/settings/disable`, data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error disabling notification:', error.message);
        throw error;
    }
}

export async function enableNotification(data) {
    try {
        const response = await axios.post(`${serverHost}/api/notifications/settings/enable`, data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error enabling notification:', error.message);
        throw error;
    }
}

export async function sendReadNotifications(notificationID) {
    try {
        const response = await axios.post(
            `${serverHost}/api/notifications/read-notification`,
            { notificationID: notificationID },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }
        );
        return response;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            console.error('Unauthorized');
        } else if (error.request && error.request.status === 400) {
            console.error('Notification is already read');
        } else if (error.request && error.request.status === 404) {
            console.error('Notification not found');
        } else if (error.request && error.request.status === 500) {
            console.error('Internal Server error');
        }else {
            console.error('Error', error.message);
        }
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

export async function markasViewed() {
    try{
        const response = await axios.patch(`${serverHost}/api/notifications/mark-all-viewed`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response;
        } catch (error) {
            console.error('Error marking notification as viewed:', error.message);
            throw error;
        }
    }   
