import axios from "axios";

const serverHost = import.meta.env.VITE_SERVER_HOST;

export async function CreateScheduledPosts(subreddit) {
    try {
        const request = await axios.post(`${serverHost}/api/scheduledPosts`,{
            subreddit:subreddit,
        }, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return request.data;
    } catch (error) {
        console.error('Error fetching data from backend:', error);
    }
}

export async function GetScheduledPosts(subreddit) {
    try {
        const request = await axios.get(`${serverHost}/api/getScheduledPost/${subreddit}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return request.data;
    } catch (error) {
        console.error('Error fetching data from backend:', error);
    }
}