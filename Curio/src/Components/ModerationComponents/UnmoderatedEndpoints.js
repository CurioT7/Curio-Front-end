import axios from "axios";


export async function fetchUnmoderatedPostsFromBackend() {
    try {
        const response = await axios.get("http://localhost:5000/api/moderation/unmoderated");
        return response.data;
    } catch (error) {
        console.error(error);
    }
}