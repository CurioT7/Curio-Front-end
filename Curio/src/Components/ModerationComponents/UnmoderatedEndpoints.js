import axios from "axios";

const hostURL = import.meta.env.VITE_SERVER_HOST;

export async function fetchUnmoderatedPostsFromBackend(community) {
    try {
        const response = await axios.get(`${hostURL}/api/about/unmoderated/${community}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            },
            params: {
                Subreddit: community
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}


export async function markasNSFW(postID) {
    try {
        const response = await axios.post(`${hostURL}/api/marknsfw`, {
            postId: postID
        }, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching data from backend:', error);
        return false;
    }
}

export async function unmarkasNSFW(postID) {
    try {
        const response = await axios.post(`${hostURL}/api/unmarknsfw`, {
            postId: postID
        }, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching data from backend:', error);
        return false;
    }
}