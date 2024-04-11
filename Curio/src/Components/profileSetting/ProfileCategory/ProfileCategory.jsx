import { useState, useEffect } from 'react'; 
import { useToast, Flex, Switch, Spacer, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Button } from '@chakra-ui/react';
import "./ProfileCategory.css"
import Titles from "../../feedSettings/childs/Titles";
import axios from 'axios';

function ProfileCategory() {
  
  const serverHost = import.meta.env.VITE_SERVER_HOST;
  const toast = useToast();
  const [NSFW, setIsChecked] = useState(false); 
  const [isModalOpen, setIsModalOpen] = useState(false);
//   const [pendingChange, setPendingChange] = useState(false);

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
    sendDataToBackend({NSFW: !NSFW});
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

  async function sendDataToBackend(data) {
    // Validate data
    if (!data || typeof data !== 'object') {
        console.error('Invalid data:', data);
        return;
    }
    try {
        
        const response = await axios.patch(`${serverHost}/api/settings/v1/me/prefs`, data, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        console.log(response)
        return response;
    } catch (error) {
        console.error('Error sending data to backend:', error);
    }
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
          return response.data;
      } catch (error) {
          console.error('Error fetching data from backend:', error);
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
