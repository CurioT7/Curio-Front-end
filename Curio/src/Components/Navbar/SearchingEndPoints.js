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


export async function getSearchSubreddits(searchInput) {

    try{
        const response = await axios.get(`${serverHost}/api/searchCommunities/${searchInput}`);
        return response.data;
    }catch(error){
        console.error(error);
    }
}

export async function getSearchPeople(searchInput) {
    try{
        const response = await axios.get(`${serverHost}/api/${searchInput}/searchUsers`);
        return response.data;
    }catch(error){
        console.error(error);
    }
}