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
    try {
        const request = await axios.get(`${serverHost}/api/allpage/${type}?page=${pageNumber}`,{
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return request.data;
    } catch (error) {
        console.error('Error fetching data from backend:', error);
    }
}

