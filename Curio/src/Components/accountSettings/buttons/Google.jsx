import { Button, Box,Input, Text } from '@chakra-ui/react'
import React from "react"
import { useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react"
import { FcGoogle } from "react-icons/fc";
import PasswordErrorMessage from './PasswordErrorMessage';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import { MdMarkEmailUnread } from "react-icons/md";
const Google = (props) =>{
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [yourPass,setYourPass] = React.useState("")
    const [isClicked,setIsClicked]=React.useState(false)
    const pass ="12345678"
    const serverHost = import.meta.env.VITE_SERVER_HOST;
    function handleYourPass(e){
        setYourPass(e.target.value)
    }
    function handleIsClicked(){
        setIsClicked(true)
    }
    function clearForm(){
        setYourPass("")
        setIsClicked(false)
        
    }
    const handleGoogleSignupResponse = async (response) => {
        console.log(response);
        // const hostUrl = import.meta.env.VITE_SERVER_HOST;
        const serverResponse = await axios.post(`${serverHost}/api/google/connect`,{
          token: response.access_token
        },{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
      }
    
      const login = useGoogleLogin({
        onSuccess: codeResponse => handleGoogleSignupResponse(codeResponse),
      });
    async function sendDataToBackend(){
        console.log(`Bearer ${localStorage.getItem('token')}`)
        try {
            const response = await axios.post(`${serverHost}/api/google/connect`, {
                token:`Bearer ${localStorage.getItem('token')}`,
                password: yourPass
            });
            clearForm()
        }
        catch(error){
            console.error( error.message);
            switch (error.response.status) {
                case 401:
                    
                    break;
                
                default:
                    break;
          }
        }
    }
    function handleSubmit(e){
        e.preventDefault();
        sendDataToBackend()
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
                                    {yourPass!==pass && isClicked?(<PasswordErrorMessage text="enter valid password"/>):null}
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