import { useToast, Flex, Switch, Spacer, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Button } from '@chakra-ui/react';
import "./ProfileCategory.css"
import Titles from "../../feedSettings/childs/Titles";

function ProfileCategory({ NSFW, handleSwitchChange, isModalOpen, setIsModalOpen, confirmChange }) {
  
  const toast = useToast();

  function Toast(){ 
    toast({   
        description: "Changes Saved",
        status: 'info',
        duration: 3000,
        isClosable: true,
      })
  }

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
          <ModalCloseButton onClick={() => setIsModalOpen(false)} />
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
