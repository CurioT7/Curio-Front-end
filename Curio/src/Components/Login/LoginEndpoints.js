import React from "react";
import "./Loginpage.jsx";
import axios from "axios";
const VITE_SERVER_HOST = import.meta.env.VITE_SERVER_HOST;
const url = VITE_SERVER_HOST;

const loginUser = async (username, password) => {
const url = `${VITE_SERVER_HOST}/api/auth/login`;
const data = {
  username,
  password,
};

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const responseData = await response.json();
  return responseData;
};

const verifyUsername = async (email) => {
  const url = `${VITE_SERVER_HOST}/api/auth/username`;
  const data = {
    email: email,
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const responseData = await response.json();
  return responseData;
};

const checkCredentials = async (username, email) => {
  const url = `${VITE_SERVER_HOST}/api/auth/password`;
  const data = {
    username: username,
    email: email,
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const responseData = await response.json();
  return responseData;
};

const forgotPassword = async (username, email) => {
  const url = `${VITE_SERVER_HOST}/api/auth/password`;
  const data = {
    username: username,
    email: email,
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const responseData = await response.json();
  return responseData;
};

const resetPassword = async (newPassword) => {
  const token = localStorage.getItem('resetToken');
  const url = `${VITE_SERVER_HOST}/api/auth/reset_password/${token}`;
  const data = {
    password: newPassword,
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const responseData = await response.json();
  return responseData;
};


const changePassword = async (oldPassword, newPassword) => {
  const url = `${VITE_SERVER_HOST}/api/auth/change_password`;
  const data = {
    oldPassword: oldPassword,
    password: newPassword,
  };

  const token = localStorage.getItem('token');
  console.log(token);
  console.log(oldPassword);
  console.log(newPassword);


  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const responseData = await response.json();
  return responseData;
};

async function getGoogleToken() {
  try {
    const response = await axios.get(`${VITE_SERVER_HOST}/api/auth/google`);
    return response;
  } catch (error) {
    console.error("Error:", error);
  }
}

export {
  loginUser,
  resetPassword,
  forgotPassword,
  getGoogleToken,
  verifyUsername,
  checkCredentials,
  changePassword,
};
