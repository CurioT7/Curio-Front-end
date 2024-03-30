import axios from 'axios';
const serverHost = import.meta.env.VITE_SERVER_HOST;
  
export async function fetchDataFromBackend(subreddit) {
    try {
        console.log(subreddit);
        const request = await axios.get(`${serverHost}/api/r/id sunt/hot`,{
            Subreddit: subreddit
        });
        return request.data;
    } catch (error) {
        console.error('Error fetching data from backend:', error);
    }
}