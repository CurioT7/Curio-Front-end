import axios from "axios";
const serverHost = import.meta.env.VITE_SERVER_HOST;

export async function fetchUserDataFromBackend() {
    try {
        const response = await axios.get(`${serverHost}/api/settings/v1/me/prefs`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
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

export async function sendUserDataToBackend(data) {
    try {
        const response = await axios.patch(`${serverHost}/api/settings/v1/me/prefs`, data, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        switch (response.status) {
            case 200:
              console.log("User preferences updated successfully");
              break;
            case 404:
              console.log("User preferences not found");
              break;
            default:
              console.log("Unexpected response status:", response.status);
              break;
          }
        return response;
    } catch (error) {
        if (error.response) {
            const status = error.response.status;
        if (status === 500) {
            console.log("500 Internal Server Error: An unexpected error occurred on the server. Please try again later.");
        } else {
            console.error("Error sending data to backend:", error.response.data);
        }
        } else {
            console.error('Error sending data to backend:', error.message);
        }
    }
}