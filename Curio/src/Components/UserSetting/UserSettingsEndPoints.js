import axios from "axios";


export async function fetchUserDataFromBackend() {
    try {
        const response = await axios.get(`${serverHost}/api/settings/v1/me/prefs`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Server Error:', error.response.data);
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error', error.message);
        }
        console.error('Error config:', error.config);
    }
}

export async function sendDataToBackend(data) {
    try {
        const response = await axios.patch(`${serverHost}/api/settings/v1/me/prefs`, data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response;
    } catch (error) {
        if (error.response) {
            console.error('Server Error:', error.response.data);
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error', error.message);
        }
        console.error('Error config:', error.config);
    }
}