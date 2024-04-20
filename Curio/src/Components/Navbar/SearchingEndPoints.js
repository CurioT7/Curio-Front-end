import axios from "axios";

const serverHost = import.meta.env.VITE_SERVER_HOST;

export async function getTrending() {
    try{
        const response = await axios.get(`${serverHost}/api/trendingSearches`);
        return response.data;
    }catch(error){
        console.error(error);
    }
}