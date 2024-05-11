import { Button, Box,Input, Text } from '@chakra-ui/react'
import React from "react"
import { useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react"
import { FcGoogle } from "react-icons/fc";
import PasswordErrorMessage from './PasswordErrorMessage';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import { MdMarkEmailUnread } from "react-icons/md";
import { useToast } from '@chakra-ui/react';
/**
 * Renders a button component that allows users to connect their Google account.
 *
 * @component
 * @param {Object} props - The style object for the button.
 * @returns {JSX.Element} - The rendered Google component.
 */
const Google = (props) =>{
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [yourPass,setYourPass] = React.useState("")
    const [wrongPass,setWrongPass]=React.useState(false)
    const serverHost = import.meta.env.VITE_SERVER_HOST;
    function Toast(){
        toast({
            title: "account connected successfully",
            status: 'info',
            duration: 3000,
            isClosable: true,
          })
    }
    function handleYourPass(e){
        setYourPass(e.target.value)
    }
    const handleGoogleSignupResponse = async (response) => {
        
        // const hostUrl = import.meta.env.VITE_SERVER_HOST;
        try{const serverResponse = await axios.post(`${serverHost}/api/google/connect`,{
            token: response.access_token,
            password: yourPass
          },{
              headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
              }
          })
          setWrongPass(false)
          Toast()
          onClose()
          setTimeout(() => {
            window.location.reload();window.location.reload();
          },500)
          
            
        }catch(error){
            console.error( error.message);
            switch (error.response.status) {
                case 400:
                    if(error.response.data.message === "Invalid password"){
                    setWrongPass(true)}
                    
                    break;
                
                default:
                    break;
          }
          } 
        
      }
    
      const login = useGoogleLogin({
        onSuccess: codeResponse => handleGoogleSignupResponse(codeResponse),
      });
   
    function handleSubmit(e){
        e.preventDefault();
        // sendDataToBackend()
    }
    return(
        <>
                <Button className='fs-6'  onClick={onOpen} style={props.buttonStyle} colorScheme='blue' leftIcon={<FcGoogle />} size='sm'>Connect to Google</Button>

                <Modal isCentered size='md' isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader mt={5}> <Box display='flex'> <MdMarkEmailUnread className='fs-1 me-3' /><h4> Connect your Google Account</h4> </Box></ModalHeader>
                        <ModalCloseButton />
                        <form onSubmit={handleSubmit}>
                        <ModalBody>
                           
                                <Box display='flex'  flexDirection='column' >
                                    <Text  fontWeight='400'>To continue, confirm your password and sign in with Google.</Text>
                                    <Input placeholder='PASSWORD' type='password' value={yourPass} onChange={handleYourPass} size='lg' mb={5}></Input>
                                    {wrongPass?(<PasswordErrorMessage text="enter valid password"/>):null}
                                    <Button onClick={login}  leftIcon={<FcGoogle className='fs-4'/>} alignSelf='center' className='fs-6 py-6 fw-bold' variant='outline' size='md' type='submit' style={{borderRadius: "30px", padding: "10px 20px",width:"250px", height:"40px", position:'relative', top:'2vh'}} >Continue with Google</Button>
                                    
                                </Box>
                            
                        </ModalBody>

                        <ModalFooter>
                          
                            
                        </ModalFooter>
                        </form>
                    </ModalContent>
                </Modal>
                </>
    )
}

export default Google;