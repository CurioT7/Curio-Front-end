import { Button, ButtonGroup, Box,Input, Text } from '@chakra-ui/react'
import React from "react"
import { useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react"
import { MdMarkEmailUnread } from "react-icons/md";
import PasswordErrorMessage from './PasswordErrorMessage';
import validateEmail from '../checker/EmailChecker';
import { useToast, } from '@chakra-ui/react';
import axios from 'axios';
const EmailButton = (props) =>{
    const serverHost = import.meta.env.VITE_SERVER_HOST;
    const pass ="12345678"
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [password,setYourPass] = React.useState("")
    const [email,setNewEmail] = React.useState({
        value:"",
        isTouched:false,
    })
    function handleYourPass(e){
        setYourPass(e.target.value)
    }
    function handleNewEmail(e){
        setNewEmail({...email,value:e.target.value})
    }
    function handleNewEmailBlur(e){
        setNewEmail({...email,isTouched:true})
    }

   
    function isValid(){
        return(
            password&&
            validateEmail(email.value)
        )
    }
    function clearForm(){
        setYourPass("")
        setNewEmail({
            value:"",
            isTouched:false,
        })
    }
    function handleSubmit(e){
        e.preventDefault();

        clearForm();

    }
    // send data to backend fetch data from backend--------------------------------
    async function sendDataToBackend(data) {
        try {
            const response = await axios.patch(`${serverHost}/api/auth/change_email`, {
              email: email.value, // assuming 'username' state holds the new email
              password: password
            }, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}` // replace with your token retrieval method
              }
            });
        
            if (response.status === 200) {
              console.log('Email changed successfully');
            } else {
              console.log('Failed to change email');
            }
          } catch (error) {
            console.error('Failed to change email:', error);
          }
    }

    async function fetchDataFromBackend() {
        try {
            const response = await axios.get(`${serverHost}/api/auth/change_email`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            if (error.response) {
                console.error('Server Error:', error.response.data);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Error', error.message);
            }
            console.error('Error config:', error.config);
        }
    }

    React.useEffect(() => {
        async function fetchAndSetData() {
            const data = await fetchDataFromBackend();
            if (data) {
                setYourPass(data.password);
                setEmail({ ...email, value: data.email.value });
            }
        }

        fetchAndSetData();
    }, []);
    return(
        <Box>
                <Button onClick={onOpen} style={props.buttonStyle} variant='outline'>Change</Button>

                <Modal isCentered size='md' isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader mt={5}> <Box display='flex'> <MdMarkEmailUnread className='fs-1 me-3' /><h4> Update your email</h4> </Box></ModalHeader>
                        <ModalCloseButton />
                        <form onSubmit={handleSubmit}>
                        <ModalBody>
                           
                                <Box display='flex'  flexDirection='column'>
                                    <Text className='fs-6' fontWeight='600'>Update your email below. There will be a new verification email sent that you will need to use to verify this new email.</Text>
                                    <Input placeholder='CURRENT PASSWORD' type='password' value={password} onChange={handleYourPass} size='lg' mb={5}></Input>

                                    <Input placeholder='NEW EMAIL' type='email' onBlur={handleNewEmailBlur} value={email.value} onChange={handleNewEmail} size='lg'></Input>
                                    {email.isTouched&&!validateEmail(email.value) ? (<PasswordErrorMessage text="Please enter a valid email"/>):null}
                                </Box>
                            
                        </ModalBody>

                        <ModalFooter>
                          
                            <Button isDisabled={!isValid()} className='fs-6 fw-bold' size='sm' type='submit' style={props.buttonStyle} colorScheme='blue'>Save email</Button>
                        </ModalFooter>
                        </form>
                    </ModalContent>
                </Modal>
            </Box>
    )
}

export default EmailButton;