import axios from "axios";

const hostURL = import.meta.env.VITE_SERVER_HOST;

/**
 * Fetches unmoderated posts from the backend for a specific community.
 * @param {string} community - The name of the community.
 * @module FetchUnmoderatedPosts
 */


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

/**
 * Marks a post as NSFW (Not Safe for Work).
 * @param {string} postID - The ID of the post to mark as NSFW.
 * @module MarkAsNSFW
 */


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

/**
 * Marks a post as not safe for work (NSFW).
 * @param {string} postID - The ID of the post to mark as NSFW.
 * @module UnmarkAsNSFW
 */

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

/**
 * Approves a post by sending a request to the backend API.
 * @param {string} id - The ID of the post to be approved.
 * @param {string} post - The type of the post to be approved.
 * @param {string} commName - The name of the subreddit/community.
 * @module ModerationApprovePost
 */



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

/**
 * Removes a post from the backend server.
 * @param {string} id - The ID of the post to be removed.
 * @param {string} post - The type of the post to be removed.
 * @param {string} commName - The name of the subreddit/community.
 * @module ModerationRemovePost
 */


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

/**
 * Fetches removed posts from the backend for a specific community.
 * @param {string} community - The name of the community.
 * @module ModerationFetchRemovedPosts
 */


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

/**
 * Fetches edited posts from the backend.
 * @param {string} community - The community name.
 * @param {string} type - The type of posts to fetch.
 * @param {string} sort - The sorting criteria.
 * @module ModerationFetchEditedPosts
 */

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

/**
 * Approves removed posts in the backend.
 * 
 * @param {string} itemID - The ID of the item to be approved.
 * @param {string} itemType - The type of the item to be approved.
 * @param {string} subredditName - The name of the subreddit.
 * @module ApproveRemovedPosts
 */


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