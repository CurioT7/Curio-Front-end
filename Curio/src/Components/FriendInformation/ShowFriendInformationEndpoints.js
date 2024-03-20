import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

const hostUrl = import.meta.env.VITE_SERVER_HOST;

async function showFriendInformation({username}) {
    try {
        const response = await axios.get(`${hostUrl}/user/${username}/about`);
        console.log(response);
        return response;
    } catch (error) {
        console.error('Error:', error);
    }
}

export default showFriendInformation;