import React, { useState, useEffect } from 'react';
import { Box, Text, Input, Textarea, useToast } from '@chakra-ui/react';
import { sendUserDataToBackend } from '../../UserSetting/UserSettingsEndPoints';

function ProfileInformation({ profileData }) {
  const toast = useToast();
  const [displayName, setDisplayName] = useState('');
  const [about, setAbout] = useState('');

  useEffect(() => {
    setDisplayName(profileData.displayName);
    setAbout(profileData.about);
  }, [profileData]);

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

  const handleEnterKeyPress = async (event) => {
    if (event.key === 'Enter') {
      try {
        await sendUserDataToBackend({ displayName, about }); 
        Toast();
      } catch (error) {
        console.error('Error sending data to backend:', error);
      }
    }
  };

  const remainingDisplayNameCharacters = 30 - (displayName ? displayName.length : 0); 
  const remainingAboutCharacters = 200 - (about ? about.length : 0); 

  const displayNameClass = remainingDisplayNameCharacters <= 0 ? 'text-danger' : '';
  const aboutClass = remainingAboutCharacters <= 0 ? 'text-danger' : '';

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