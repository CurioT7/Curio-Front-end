import { Button, Box,Input, Text } from '@chakra-ui/react'
import React from "react"
import { useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react"
import PasswordErrorMessage from './PasswordErrorMessage'
import { MdMarkEmailUnread } from "react-icons/md";
import axios from 'axios';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
function Disconnect(props){
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [yourPass,setYourPass] = React.useState("")
    const [wrongPass,setWrongPass]=React.useState(false)
    const serverHost = import.meta.env.VITE_SERVER_HOST;
    const toast = useToast()
    const navigate = useNavigate();
    function Toast(){
        toast({
            title: "account disconnected successfully",
            status: 'info',
            duration: 3000,
            isClosable: true,
          })
    }
    async function sendDataToBackend(){
        try{
            const request = await axios.post(`${serverHost}/api/google/disconnect`,{
                password:yourPass
            }, {
                headers: {
                  authorization: `Bearer ${localStorage.getItem('token')}` // replace with your token retrieval method
                }
              })
              setWrongPass(false)
              onClose()
              Toast()
              window.location.reload();
            
        } catch(error){
           
            switch(error.response.status){
                case 400:
                    setWrongPass(true)
                    break;
                default:
                    break;
            }
        }
}


    function handleYourPass(e){
        setYourPass(e.target.value)
    }
    function isValid(){
        return(
            yourPass
        )
    }
    function handleSubmit(e){
        e.preventDefault();
        sendDataToBackend();
        
        
    }
    const buttonStyle ={
        borderRadius: "30px", height:"35px",
    }
    return(
        <>
        <Button className='fs-6 text-decoration-underline' variant='ghost'  onClick={onOpen} style={buttonStyle} colorScheme='blue' color='red'  size='sm'>(Disconnect)</Button>

        <Modal isCentered size='md' isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader mt={5}> <Box display='flex'> <MdMarkEmailUnread className='fs-1 me-3' /><h4> Disconnect your Google Account</h4> </Box></ModalHeader>
                <ModalCloseButton />
                <form onSubmit={handleSubmit}>
                <ModalBody>
                   
                        <Box display='flex'  flexDirection='column' >
                            <Text  fontWeight='400'>To continue, confirm your password.</Text>
                            <Input placeholder='PASSWORD' type='password' value={yourPass} onChange={handleYourPass} size='lg' mb={5}></Input>
                            {wrongPass?(<PasswordErrorMessage text="Incorrect Password"/>):null}
                            
                            
                        </Box>
                    
                </ModalBody>

                <ModalFooter>
                  
                <Button style={buttonStyle} variant='outline' colorScheme='blue' mr={3} onClick={onClose}>
                CANCEL
                </Button>
                <Button isDisabled={!isValid()} type='submit' style={buttonStyle} colorScheme='blue'>CONTINUE</Button>
                </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
        </>
    )
}

export default Disconnect;