import React, { useState } from 'react';
import { Box, Text, Input, Textarea, useToast } from '@chakra-ui/react';
import axios from 'axios';

function ProfileInformation() {
  const serverHost = import.meta.env.VITE_SERVER_HOST;
  const toast = useToast();
  const [displayName, setDisplayName] = useState('');
  const [about, setAbout] = useState('');

  function Toast() {
    toast({
      description: "Changes Saved",
      status: 'info',
      duration: 3000,
      isClosable: true,
    })
  }

  const handleDisplayNameChange = (event) => {
    setDisplayName(event.target.value);
  };

  const handleAboutChange = (event) => {
    setAbout(event.target.value);
  };

  const handleEnterKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendDataToBackend();
      Toast();
    }
  };

  const remainingDisplayNameCharacters = 30 - (displayName ? displayName.length : 0); // Check if displayName is not undefined
  const remainingAboutCharacters = 200 - (about ? about.length : 0); // Check if about is not undefined

  const displayNameClass = remainingDisplayNameCharacters <= 0 ? 'text-danger' : '';
  const aboutClass = remainingAboutCharacters <= 0 ? 'text-danger' : '';

  async function sendDataToBackend() {
    try {
      const response = await axios.patch(
        `${serverHost}/api/settings/v1/me/prefs`,
        {
        displayName: displayName,
        about: about
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    );
      // Handle different response status codes
      switch (response.status) {
        case 200:
          console.log("User preferences updated successfully");
          break;
        case 404:
          console.log("User preferences not found");
          break;
        default:
          console.log("Unexpected response status:", response.status);
          break;
      }
      return response;
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        if (status === 500) {
          console.log("500 Internal Server Error: An unexpected error occurred on the server. Please try again later.");
        } else {
          console.error("Error sending data to backend:", error.response.data);
        }
      } else {
        console.error('Error sending data to backend:', error.message);
      }
    }
  }

  async function fetchDataFromBackend() {
    try {
      const response = await axios.get(`${serverHost}/api/settings/v1/me/prefs`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
        // Handle different response status codes
      switch (response.status) {
        case 404:
          console.log("User preferences not found");
          break;
        default:
          console.log("Unexpected response status:", response.status);
          break;
      }
      return response.data;
    } catch (error) {
      if (error.response) {
        // Handle error response here
        const status = error.response.status;
        if (status === 500) {
          console.log("500 Internal Server Error: An unexpected error occurred on the server. Please try again later.");
        } else {
          console.error("Error fetching data from backend:", error.response.data);
        }
      } else {
        console.error('Error fetching data from backend:', error.message);
      }
    }
  }

  React.useEffect(() => {
    async function fetchAndSetData() {
      const data = await fetchDataFromBackend();
      if (data) {
        setDisplayName(data.displayName);
        setAbout(data.about);
      }
    }
    fetchAndSetData();
  }, []);

  return (
    <Box className="profile-information">
      <Box className="display-name">
        <h3 className={`headings-settings d-flex fw-500 mb-1`}>Display name (optional)</h3>
        <Text className="headings-description fw-normal text-muted">Set a display name. This does not change your username.</Text>
      </Box>
      <Box className="display-name-input-container">
        <Input
          type="text"
          className="form-control mr-sm-2"
          placeholder="Display name (optional)"
          maxLength="30"
          name="display-name-input"
          id="display-name-input"
          value={displayName}
          onChange={handleDisplayNameChange}
          onKeyDown={handleEnterKeyPress}
        />
        <Box className={`word-remaining p-1 b-80 mb-4 ${displayNameClass}`}>{remainingDisplayNameCharacters} Characters remaining</Box>
      </Box>
      <Box className="about-section">
        <Box className="about">
          <h3 className={`headings-settings d-flex fw-500 mb-1`}>About (optional)</h3>
          <Text className="headings-description fw-normal text-muted">A brief description of yourself shown on your profile.</Text>
        </Box>
        <Box className="about-textarea-container">
          <Textarea
            name="about-textarea"
            className='form-control mr-sm-2'
            id="about-textarea"
            cols="30"
            rows="4"
            maxLength="200"
            placeholder="About (optional)"
            value={about}
            onChange={handleAboutChange}
            onKeyDown={handleEnterKeyPress}
          />
          <Box className={`word-remaining p-1 b-80 mb-4 ${aboutClass}`}>{remainingAboutCharacters} Characters remaining</Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ProfileInformation;
