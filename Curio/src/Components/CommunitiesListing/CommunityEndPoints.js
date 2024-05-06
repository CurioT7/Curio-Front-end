import axios from 'axios';
// import Message from '../Toast/Toast';
import { useToast } from "@chakra-ui/react";


const serverHost = import.meta.env.VITE_SERVER_HOST;
  
export async function fetchDataFromBackend(subreddit) {
    try {
        
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
        
        const request = await axios.get(`${serverHost}/api/r/${subreddit}/random`,{
            Subreddit: subreddit
        });
        return request.data;
    } catch (error) {
        console.error('Error fetching data from backend:', error);
    }
}

export async function fetchSubCurioInfo(subreddit) {
    try {
        
        const request = await axios.get(`${serverHost}/api/r/${subreddit}`,{
            Subreddit: subreddit
        });
        return request.data;
    } catch (error) {
        console.error('Error fetching data from backend:', error);
    }
}

export async function fetchUserName() {
    try {
        
        const request = await axios.get(`${serverHost}/api/settings/v1/me`,{
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return request.data;
    } catch (error) {
        console.error('Error fetching data from backend:', error);
    }
}

export async function getSubredditInfo(subreddit){
    try{
        const request = await axios.get(`${serverHost}/api/subredditOverview/${subreddit}`,{
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        return request.data;
    }catch(error){
        console.error('Error fetching data from backend:', error);
    }
}

export async function getJoinedCommunities(userName){
    try{
        const request=await axios.get(`${serverHost}/api/user/${userName}/communities`)
        return request.data;
        
    }catch(error){
        console.error('Error fetching data from backend:', error);
    }
}

export async function joinSubCurio(subreddit){
    try{
        const request = await axios.post(`${serverHost}/api/friend`,{
            subreddit: subreddit
        }
        ,{
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        return request.data;
    }catch(error){
        console.error('Error fetching data from backend:', error);
    }
}

export async function unJoinSubCurio(subreddit){
    try{
        const request = await axios.post(`${serverHost}/api/unfriend`,{
            subreddit: subreddit
        }
        ,{
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        return request.data;
    }catch(error){
        console.error('Error fetching data from backend:', error);
    }
}

export async function getModerators( Community ){
    try{
        const response = await axios.get(`${serverHost}/api/getModerators/${Community}`,{
            headers: {
                'content-type': 'application/json',
                'authorization' : `Bearer ${localStorage.getItem('token')}`
            }
        })
        return response.data;
    }catch(error){
        console.error('Error fetching data from backend:', error);
    }
}