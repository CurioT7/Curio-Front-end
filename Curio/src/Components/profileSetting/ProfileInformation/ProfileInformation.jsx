import { useState } from 'react';
import { Box, Heading, Text, Input, Textarea } from '@chakra-ui/react';

function ProfileInformation() {
  const [displayName, setDisplayName] = useState('');
  const [about, setAbout] = useState('');

  const handleDisplayNameChange = (event) => {
    setDisplayName(event.target.value);
    updateUserPreferences();
  };

  const handleAboutChange = (event) => {
    setAbout(event.target.value);
    updateUserPreferences();
  };

  const remainingDisplayNameCharacters = 30 - displayName.length;
  const remainingAboutCharacters = 200 - about.length;

  const displayNameClass = remainingDisplayNameCharacters <= 0 ? 'text-danger' : '';
  const aboutClass = remainingAboutCharacters <= 0 ? 'text-danger' : '';

  const updateUserPreferences = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/settings/v1/me/prefs', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          displayName: displayName,
          about: about,
        }),
      });
      const data = await response.json();
      console.log('Updated user preferences:', data);
    } catch (error) {
      console.error('Error updating user preferences:', error);
    }
  };

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
          />
          <Box className={`word-remaining p-1 b-80 mb-4 ${aboutClass}`}>{remainingAboutCharacters} Characters remaining</Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ProfileInformation;
