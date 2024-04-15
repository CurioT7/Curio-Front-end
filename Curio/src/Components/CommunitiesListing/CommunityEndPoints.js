import axios from 'axios';
// import Message from '../Toast/Toast';
import { useToast } from "@chakra-ui/react";


const serverHost = import.meta.env.VITE_SERVER_HOST;
  
export async function fetchDataFromBackend(subreddit) {
    try {
        console.log(subreddit);
        const request = await axios.get(`${serverHost}/api/r/${subreddit}/hot`,{
            Subreddit: subreddit
        });
        return request.data;
    } catch (error) {
        console.error('Error fetching data from backend:', error);
    }
}
export async function fetchTopFromBackend(subreddit) {
    try {
        console.log(subreddit);
        const request = await axios.get(`${serverHost}/api/r/${subreddit}/top`,{
            Subreddit: subreddit
        });
        return request.data;
    } catch (error) {
        console.error('Error fetching data from backend:', error);
    }
}
export async function fetchTopTimeFromBackend(subreddit,timeinterval) {
    try {
        console.log(subreddit);
        const request = await axios.get(`${serverHost}/api/r/${subreddit}/top/${timeinterval}`,{
            Subreddit: subreddit,
            timeinterval: timeinterval
        });
        return request.data;
    } catch (error) {
        console.error('Error fetching data from backend:', error);
       
    }
}
export async function fetchNewFromBackend(subreddit) {
    try {
        console.log(subreddit);
        const request = await axios.get(`${serverHost}/api/r/${subreddit}/new`,{
            Subreddit: subreddit
        });
        
        return request.data;
    } catch (error) {
        console.error('Error fetching data from backend:', error);
    }
}
export async function fetchRisingFromBackend(subreddit) {
    try {
        console.log(subreddit);
        const request = await axios.get(`${serverHost}/api/r/${subreddit}/random`,{
            Subreddit: subreddit
        });
        return request.data;
    } catch (error) {
        console.error('Error fetching data from backend:', error);
    }
}
