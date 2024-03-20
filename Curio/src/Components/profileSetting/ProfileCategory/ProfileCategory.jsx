import { useState } from 'react'; 
import { Box, Text } from '@chakra-ui/react';
import "./ProfileCategory.css"

function ProfileCategory() {
  const [isChecked, setIsChecked] = useState(false); 

  const handleSwitchChange = () => {
    setIsChecked(!isChecked); 
    handleNSFWChange();
  };

  const handleNSFWChange = () => {
    setIsNSFW(!isNSFW); 
    fetch('http://localhost:3000/api/settings/v1/me/prefs', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        NSFW: isNSFW,
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to update NSFW preference');
      }
      return response.json();
    })
    .then(data => {
      console.log('NSFW preference updated successfully:', data);
    })
    .catch(error => {
      console.error('Error updating NSFW preference:', error);
    });
  };

  return (
    <Box className="profile-category d-flex flex-wrap mb-3" data-testid="profile-category">
      <Box className="nsfw">
        <label htmlFor="nsfw-checkbox">
          <h3 className="headings-settings" fontWeight="500" mb="1">
            NSFW
          </h3>
        </label>
        <Text className="headings-description" fontWeight="normal" color="gray.500">
          This content is NSFW (may contain nudity, pornography, profanity, or inappropriate content for those under 18)
        </Text>
      </Box>
      <Box className="nsfw-checkbox">
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id="flexSwitchCheckDefault"
            checked={isChecked} 
            onChange={handleSwitchChange} 
          />
        </div>
      </Box>
    </Box>
  );
}

export default ProfileCategory;
