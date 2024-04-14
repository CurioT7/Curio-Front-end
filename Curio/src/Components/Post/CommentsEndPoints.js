import axios from "axios";
const serverHost = import.meta.env.VITE_SERVER_HOST;

export async function fetchCommentsFromBackend(postId) {
    try {
        const request = await axios.get(`${serverHost}/api/comments/${postId}`);
        return request.data;
    } catch (error) {
        console.error('Error fetching data from backend:', error);
        switch (error.response.status) {
            case 404:
                console.error('Post not found');
                break;
            default:
                console.error('Unknown error');
                break;
        }
    }
}