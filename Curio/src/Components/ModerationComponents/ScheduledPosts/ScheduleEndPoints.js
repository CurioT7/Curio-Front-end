import axios from "axios";

const serverHost = import.meta.env.VITE_SERVER_HOST;


async function CreateScheduledPosts(subreddit) {
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