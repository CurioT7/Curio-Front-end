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
export async function SortHomePosts(type, pageNumber) {
    if (localStorage.getItem('token') === null){
        try {
            const request = await axios.get(`${serverHost}/api/allpage/${type}?page=${pageNumber}`);
            return request.data;
        } catch (error) {
            console.error('Error fetching data from backend:', error);
        }
    }
    else{
        try {
            const request = await axios.get(`${serverHost}/api/allpage/${type}?page=${pageNumber}`,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            return request.data;
        } catch (error) {
            console.error('Error fetching data from backend:', error);
        }
    }
}

