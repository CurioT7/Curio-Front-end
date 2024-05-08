import axios from "axios";
const serverHost = import.meta.env.VITE_SERVER_HOST;


export async function fetchSubredditData(community) {
    try {
        const response = await axios.get(`${serverHost}/api/subredditOverview/${community}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return (response.data);
    } catch (error) {
        console.error("Error fetching subreddit data:", error);
    }
};