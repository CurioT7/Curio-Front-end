import React from 'react';
import { Box, Text, Input, Textarea, useToast } from '@chakra-ui/react';

function ProfileInformation(props) {
  const toast = useToast();

  const handleEnterKeyPress = (event) => {
    if (event.key === 'Enter') {
      props.sendDataToBackend();
      Toast();
    }
  };

  const Toast = () => {
    toast({
      description: "Changes Saved",
      status: 'info',
      duration: 3000,
      isClosable: true,
    })
  }

  const remainingDisplayNameCharacters = 30 - (props.displayName ? props.displayName.length : 0);
  const remainingAboutCharacters = 200 - (props.about ? props.about.length : 0);

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
          value={props.displayName}
          onChange={(event) => props.setDisplayName(event.target.value)}
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
            value={props.about}
            onChange={(event) => props.setAbout(event.target.value)}
            onKeyDown={handleEnterKeyPress}
          />
          <Box className={`word-remaining p-1 b-80 mb-4 ${aboutClass}`}>{remainingAboutCharacters} Characters remaining</Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ProfileInformation;
