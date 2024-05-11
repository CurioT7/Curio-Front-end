import React from 'react';
import { useState } from 'react';
import axios from 'axios';

const hostUrl = import.meta.env.VITE_SERVER_HOST;

const token = localStorage.getItem('token');



/**
 * Retrieves friend information for a given username.
 * @param {string} username - The username of the friend.
 * @module DisplayFriendInformation
 */
async function showFriendInformation(username) {
    try {
        const response = await axios.get(`${hostUrl}/api/user/${username}/about`);
        return response;
    } catch (error) {
        console.error('Error:', error);
    }
}

/**
 * Follows a user.
 * @param {string} friendUsername - The username of the friend to follow.
 * @FollowUser
 */
async function userFollow(friendUsername) {

    try {
        await axios.post(`${hostUrl}/api/me/friends`, {
            friendUsername
        },{
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            }
        });
        return 200;
    } catch (error) {
        if (error.response) {
            switch (error.response.status) {
              case 404:
                console.error('User is not found');
                return 404;
              case 500:
                console.error('An unexpected error occurred on the server. Please try again later.');
                return 500;
                case 401:
                    return 401;
              default:
                break;
            }
          }
        }   
    }   


    /**
     * Unfollows a user.
     * @param {string} friendUsername - The username of the friend to unfollow.
     * @module UnfollowUser
     */
    async function userUnfollow(friendUsername) {
    try {
        await axios.patch(`${hostUrl}/api/me/friends`, {
            friendUsername
        },{
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            }
        });
        return 200;
    } catch (error) {
        if (error.response) {
            switch (error.response.status) {
              case 404:
                return 404;
              case 500:
                return 500;; 
              case 401:
                return 401;
              default:
                break;
                }   
            }
        }
    };

/**
 * Retrieves follower information for a given username.
 * @param {string} username - The username of the follower to retrieve information for.
 * @module GetFollowersofUser
 */
async function getFollower(username) {
    try {
        if (!token) {
            console.error('Error:', error);
            return;
        }

        const response = await axios.get(`${hostUrl}/api/me/friends/${username}`, {
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            }
        });
        return true;
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}

/**
 * Blocks a user by sending a POST request to the server.
 * @param {string} usernameToBlock - The username of the user to block.
 * @module HandleBlockUser
 */
async function userBlock(usernameToBlock) {
    try {
        const response = await axios.post(`${hostUrl}/api/User/block`, {
            usernameToBlock
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return 200;
    } catch (error) {
        if (error.response) {
            switch (error.response.status) {
            case 403:
                console.error("You must wait 24 hours before blocking this user again.");
                return 403;
              case 404:
                console.error('User is not found');
                return 404;
              case 500:
                console.error('An unexpected error occurred on the server. Please try again later.');
                return 500;
                case 401:
                    return 401;
              default:
                break;
            }
          }
        }  
    }


/**
 * Unblock a user by sending a request to the server.
 * @param {string} usernameToUnblock - The username of the user to unblock.
 * @module HandleUnblockUser
 */
async function userUnblock(usernameToUnblock) {
    try {
        const response = await axios.post(`${hostUrl}/api/User/unblock`, {
            usernameToUnblock
        }, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        return true;
    } catch (error) {
        console.error('Error:', error);
    }
}

/**
 * Retrieves the blocked preferences for the current user.
 * @module GetBlockedUsers
 */
async function getBlocked() {
    try {
        const response = await axios.get(`${hostUrl}/api/settings/v1/me/prefs`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return response
    } catch (error) {
        console.error('Error:', error);
    }
}






export {userBlock, userUnblock, showFriendInformation, userFollow, userUnfollow, getFollower, getBlocked};