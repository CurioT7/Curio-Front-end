import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

const hostUrl = import.meta.env.VITE_SERVER_HOST;

async function createCommunity({data}) {
    try {
        const response = await axios.post(`${hostUrl}/api/createSubreddit`, {
            name: data.name,
            description: data.description,
            over18: data.over18,
            privacyMode: data.privacyMode,
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response;
    } catch (error) {
        console.error('Error:', error);
        return error;
    }
}



export default createCommunity;