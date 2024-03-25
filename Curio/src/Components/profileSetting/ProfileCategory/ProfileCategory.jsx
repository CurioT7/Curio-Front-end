import { useState } from 'react'; 
import { Box, Text, useToast, Flex, Switch, Spacer } from '@chakra-ui/react';
import "./ProfileCategory.css"
import Titles from "../../feedSettings/childs/Titles";

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
    <Flex mb={5} alignItems='center'>
        <Titles title='NSFW'
        description="This content is NSFW (may contain nudity, pornography, profanity, or inappropriate content for those under 18)"/>
        <Spacer/>
        <Switch size='lg' isChecked={isChecked} onChange={handleSwitchChange}/>
    </Flex>
  );
}

export default ProfileCategory;
