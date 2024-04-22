import { useState, useEffect } from 'react'; 
import { useToast, Flex, Switch, Spacer, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Button } from '@chakra-ui/react';
import "./ProfileCategory.css"
import Titles from "../../feedSettings/childs/Titles";
import axios from 'axios';
import { sendUserDataToBackend } from '../../UserSetting/UserSettingsEndPoints';

function ProfileCategory() {
  
  const serverHost = import.meta.env.VITE_SERVER_HOST;
  const toast = useToast();
  const [NSFW, setIsChecked] = useState(false); 
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSwitchChange = () => {
    // setPendingChange(!isChecked);
    if (NSFW) { // Only open the modal if isChecked is true
      setIsModalOpen(true);
    } else {
      confirmChange();
    }
  };

  const confirmChange = () => {
    setIsChecked(!NSFW);
    sendUserDataToBackend({NSFW: !NSFW});
    setIsModalOpen(false);
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

  async function fetchDataFromBackend() {
    const token = localStorage.getItem('token');
        // console.log(token)
        if (!token) {
        console.error('No token found');
        return;
        }
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
  useEffect(() => {
      async function fetchAndSetData() {
          const data = await fetchDataFromBackend();
          if (data) {
            setIsChecked(data.NSFW);
          }
      }
      fetchAndSetData();
  }, []);

  return (
    <>
      <Flex mb={5} alignItems='center'>
          <Titles title='NSFW'
          description="This content is NSFW (may contain nudity, pornography, profanity, or inappropriate content for those under 18)"/>
          <Spacer/>
          <Switch size='lg' isChecked={NSFW} onChange={handleSwitchChange}/>
      </Flex>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>SWITCH ACCOUNT TO SFW</ModalHeader>
          <ModalCloseButton onClick={() => setIsChecked(true)} />
          <ModalBody>
            If your account contains <a href="#">NSFW content</a> (contains nudity, pornography, profanity or inappropriate content for those under 18) 
            and it’s not set to NSFW, this will result in actions up to and including suspension of your account.
          </ModalBody>
          <Flex justifyContent="flex-end" p="3">
            <Button variant='outline' colorScheme='blue' mr={3} onClick={() => setIsModalOpen(false)}>CANCEL</Button>
            <Button colorScheme="blue" onClick={confirmChange}>I UNDERSTAND</Button>
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ProfileCategory;