import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

const hostUrl = import.meta.env.VITE_SERVER_HOST;

async function signup({username, email, password}) {
    try {
        const response = await axios.post(`${hostUrl}/api/auth/signup`, {
            username: username,
            email: email,
            password: password
        });
        return response;
    } catch (error) {
        console.error('Error:', error);
    }
}

export default signup;
