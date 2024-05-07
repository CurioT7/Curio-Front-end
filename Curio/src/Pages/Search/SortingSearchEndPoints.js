import axios from "axios";

const serverHost = import.meta.env.VITE_SERVER_HOST;

export async function SortSearchContent(contentType, sortType,searchTerm, timeinterval,subreddit) {
    
    try{
        if(timeinterval){
        const request = await axios.get(`${serverHost}/api/searchCommentsOrPosts/${searchTerm}/${contentType}/${sortType}/${timeinterval}`);
        return request.data;
        }
        else{
            const request = await axios.get(`${serverHost}/api/searchCommentsOrPosts/${searchTerm}/${contentType}/${sortType}`);
            return request.data;
        }
    }catch(error){
        console.error('Error fetching data from backend:', error);
    }

}

export async function SortSearchContentByHashtag(searchTerm) {
    try{
        const request = await axios.get(`${serverHost}/api/searchHashtags/%23${searchTerm}`);
        
        return request.data;
    }catch(error){
        console.error('Error fetching data from backend:', error);
    }
}