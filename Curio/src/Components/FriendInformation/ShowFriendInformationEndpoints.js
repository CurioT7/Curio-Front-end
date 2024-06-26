import React from 'react';
import { useState } from 'react';
import axios from 'axios';

const hostUrl = import.meta.env.VITE_SERVER_HOST;

const token = localStorage.getItem('token');



async function showFriendInformation(username) {
    try {
        const response = await axios.get(`${hostUrl}/api/user/${username}/about`);
        return response;
    } catch (error) {
        console.error('Error:', error);
    }
}

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