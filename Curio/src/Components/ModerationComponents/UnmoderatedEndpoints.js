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


export async function approvePost(id, post, commName){
    try {
        const response = await axios.post(`${hostURL}/api/moderator/approve`, {
            itemID: id,
            itemType: post,
            subredditName: commName
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


export async function removePost(id, post, commName){
    try {
        const response = await axios.post(`${hostURL}/api/moderator/remove`, {
            itemID: id,
            itemType: post,
            subredditName: commName
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


export async function fetchRemovedPostsfromBackend(community) {
    try {
        const response = await axios.get(`${hostURL}/api/r/${community}/about/spam`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export async function fetchEditedPostsfromBackend(community, type, sort) {
    try {
        const response = await axios.get(`${hostURL}/api/editedQueues/${community}/${type}/${sort}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export async function approveRemovedPosts(itemID, itemType, subredditName){
    try {
        const response = await axios.post(`${hostURL}/api/moderator/approveRemoval`, {
            itemID: itemID,
            itemType: itemType,
            subredditName: subredditName
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