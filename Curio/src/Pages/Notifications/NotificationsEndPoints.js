import axios from "axios";
const serverHost = import.meta.env.VITE_SERVER_HOST;

export async function fetchNotificationsFromBackend() {
    try {
        const response = await axios.get(`${serverHost}/api/notifications/history`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    } catch (error) {
        if (error.response.status === 401) {
            console.error('Unauthorized');
        } else if (error.request.status === 500) {
            console.error('Internal Server error');
        } else {
            console.error('Error', error.message);
        }
    }
}