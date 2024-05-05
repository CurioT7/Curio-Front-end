import axios from 'axios';
const serverHost = import.meta.env.VITE_SERVER_HOST;
  
// export async function fetchPostsFromBackend() {
//     try {
//         const request = await axios.get(`${serverHost}/api/best`);
//         return request.data;
//     } catch (error) {
//         console.error('Error fetching data from backend:', error);
//     }
// }
export async function SortHomePosts(type, pageNumber,timeinterval) {
    if (localStorage.getItem('token') === null){
        try {
            if(timeinterval){
                const request = await axios.get(`${serverHost}/api/allpage/${type.toLowerCase()}/${timeinterval}?page=${pageNumber}`);
                return request.data;}
                else{
                    const request = await axios.get(`${serverHost}/api/allpage/${type.toLowerCase()}?page=${pageNumber}`);
                    return request.data;
                }
        } catch (error) {
            console.error('Error fetching data from backend:', error);
        }
    }
    else{
        try {
            if(timeinterval){
            const request = await axios.get(`${serverHost}/api/homepage/${type.toLowerCase()}/${timeinterval}?page=${pageNumber}`,{
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            return request.data;}
            else{
                const request = await axios.get(`${serverHost}/api/homepage/${type.toLowerCase()}?page=${pageNumber}`,{
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                return request.data;
            }
        } catch (error) {
            console.error('Error fetching data from backend:', error);
        }
    }
}

