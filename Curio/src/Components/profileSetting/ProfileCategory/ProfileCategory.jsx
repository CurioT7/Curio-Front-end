import { useState, useEffect } from 'react'; 
import { useToast, Flex, Switch, Spacer } from '@chakra-ui/react';
import "./ProfileCategory.css"
import Titles from "../../feedSettings/childs/Titles";
import axios from 'axios';

function ProfileCategory() {
  
  const serverHost = import.meta.env.VITE_SERVER_HOST;
  const toast = useToast()
  const [isChecked, setIsChecked] = useState(false); 

  const handleSwitchChange = () => {
    setIsChecked(!isChecked); 
    sendDataToBackend({NSFW: !isChecked})
    Toast();
  };

  function Toast(){
    toast({   
        description: "Changes Saved",
        status: 'info',
        duration: 3000,
        isClosable: true,
      })
  }

  async function sendDataToBackend(data) {
    // Validate data
    if (!data || typeof data !== 'object') {
        console.error('Invalid data:', data);
        return;
    }
    try {
        
        const response = await axios.patch(`${serverHost}/api/settings/v1/me/prefs`, data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        console.log(response)
        // Handle response if needed
        return response;
    } catch (error) {
        console.error('Error sending data to backend:', error);
        // Handle error if needed
    }
  }

  async function fetchDataFromBackend() {
      try {
          
          const response = await axios.get(`${serverHost}/api/settings/v1/me/prefs`, {
              headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
              }
          });
          return response.data;
      } catch (error) {
          console.error('Error fetching data from backend:', error);
      }
  }
  useEffect(() => {
      async function fetchAndSetData() {
          const data = await fetchDataFromBackend();
          if (data) {
            setIsChecked(data.isChecked);
          }
      }
      fetchAndSetData();
  }, []);

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
