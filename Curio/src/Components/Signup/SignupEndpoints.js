import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';


const hostUrl = import.meta.env.VITE_SERVER_HOST;
async function signup({username, email, password}){
    try{
        const response = await fetch(`${hostUrl}/api/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        });
        if(response.ok){
            const data = await response.json();
            console.log(data);
            return response;
        }
        else{
            console.log('error');
        }
    }
    catch(err){
        console.log(err);
    }
}
export default signup;