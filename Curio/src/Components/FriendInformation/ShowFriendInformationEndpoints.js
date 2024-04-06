import React from 'react';
import { useState } from 'react';
import axios from 'axios';

const hostUrl = import.meta.env.VITE_SERVER_HOST;

const token = localStorage.getItem('token');

async function showFriendInformation({username}) {
    try {
        const response = await axios.get(`${hostUrl}/user/userTwo/about`);
        console.log(response);
        return response;
    } catch (error) {
        console.error('Error:', error);
    }
}

async function userBlock(usernameToBlock) {
    try {
        console.log(localStorage.getItem('token'));
        const response = await axios.post(`${hostUrl}/api/User/block`, {
            usernameToBlock
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        console.log(response);
        return response;
    } catch (error) {
        console.error('Error:', error);
    }
}


async function userUnblock(usernameToUnblock) {
    try {
        const response = await axios.post(`${hostUrl}/api/User/unblock`, {
            usernameToUnblock
        }, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        console.log(response);
        return response;
    } catch (error) {
        console.error('Error:', error);
    }
}



export {userBlock, userUnblock, showFriendInformation};