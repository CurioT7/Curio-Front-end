import axios from "axios";


const hostUrl = import.meta.env.VITE_SERVER_HOST;


export async function showCommunityInformation(page) {
  try {
    const response = await axios.get(`${hostUrl}/api/best/communities?page=${page}`);
      
    return response;
  } catch (error) {
      console.error('Error:', error);
  }
}

