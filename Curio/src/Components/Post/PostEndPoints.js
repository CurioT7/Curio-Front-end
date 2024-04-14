import axios from "axios";
const serverHost = import.meta.env.VITE_SERVER_HOST;
export async function SendLockedPost(postID) {
    try{
        const response = await axios.post(`${serverHost}/api/lock`, {
            itemID: postID
        },{
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    }catch(error){
        console.error('Error fetching data from backend:', error);
        return false;
    }
}

export async function SendUnlockedPost(postID) {
    try{
        const response = await axios.post(`${serverHost}/api/unlock`, {
            itemID: postID
        },{
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        
        });
        return response.data;
    }catch(error){
        console.error('Error fetching data from backend:', error);
        return false;
    }
}