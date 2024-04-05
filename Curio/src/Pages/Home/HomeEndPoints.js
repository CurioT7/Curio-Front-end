import axios from 'axios';
const serverHost = import.meta.env.VITE_SERVER_HOST;
  
export async function fetchPostsFromBackend() {
    try {
        const request = await axios.get(`${serverHost}/api/best`);
        return request.data;
    } catch (error) {
        console.error('Error fetching data from backend:', error);
    }
}
export async function fetchHotFromBackend() {
    try {
        const request = await axios.get(`${serverHost}/api/best`);
        return request.data;
    } catch (error) {
        console.error('Error fetching data from backend:', error);
    }
}
export async function fetchNewFromBackend() {
    try {
        const request = await axios.get(`${serverHost}/api/best`);
        return request.data;
    } catch (error) {
        console.error('Error fetching data from backend:', error);
    }
}
export async function fetchTopFromBackend() {
    try {
        const request = await axios.get(`${serverHost}/api/best`);
        return request.data;
    } catch (error) {
        console.error('Error fetching data from backend:', error);
    }
}
export async function fetchRandomFromBackend() {
    try {
        const request = await axios.get(`${serverHost}/api/best`);
        return request.data;
    } catch (error) {
        console.error('Error fetching data from backend:', error);
    }
}

