import { useState } from 'react'; 
import { Box, Heading, Text } from '@chakra-ui/react';

function ProfileCategory() {
  const [isChecked, setIsChecked] = useState(false); 

  const handleSwitchChange = () => {
    setIsChecked(!isChecked); 
  };

  return (
    <Box className="profile-category d-flex flex-wrap mb-3">
      <Box className="nsfw">
        <label htmlFor="nsfw-checkbox">
          <Heading as="h3" className="headings-settings" fontWeight="500" mb="1">
            NSFW
          </Heading>
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
