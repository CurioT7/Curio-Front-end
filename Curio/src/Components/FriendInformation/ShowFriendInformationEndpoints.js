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
    
    } catch (error) {
        console.error('Error:', error);
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


    } catch (error) {
        console.error('Error:', error);
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
        return { success: true, response };
    } catch (error) {
        console.error('Error:', error);
        return { success: false, error };
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
        return { success: true, response };
    } catch (error) {
        if (error.response && error.response.status === 403) {
            console.error('Error:', error.response.data);
        }
        console.error('Error:', error);
        return { success: false, error };
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
        return response;
    } catch (error) {
        console.error('Error:', error);
    }
}

const patchBlockUser = (name) => {
    const response = axios.patch(`${hostUrl}/api/settings/v1/me/prefs`, {
      viewBlockedPeople: [...blockedUsers, { username: name}]
    },{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    if(response.status === 200){
        const newUser = { username: name};
        setBlockedUsers(prevBlockedUsers => [...prevBlockedUsers, newUser]);
    }
  };

  const handleUserBlock = async (username) => {
    if (!token) {
        navigate('/login');
    } else {
        const result = await userBlock(username);
        if(result.success){
            patchBlockUser(username);
            ToastSuccess();
        }
        if (!result.success) {
            ToastError();
        }
    }
}

const handleUserUnblock = async (username) => {
    try {
        const index = blockedUsers.findIndex((user) => user.username === username);
        if (index === -1) {
            console.error('User not found');
            return;
        }

        const updatedBlockedUsers = [...blockedUsers];
        updatedBlockedUsers.splice(index, 1);


        const response = await axios.patch(`${hostUrl}/api/settings/v1/me/prefs`, {
            viewBlockedPeople: updatedBlockedUsers
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status === 200) {
            setBlockedUsers(updatedBlockedUsers);
            userUnblock(username);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};





export {userBlock, userUnblock, showFriendInformation, userFollow, userUnfollow, getFollower, handleUserBlock, handleUserUnblock};