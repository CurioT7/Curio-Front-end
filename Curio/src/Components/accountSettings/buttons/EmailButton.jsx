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
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [password,setYourPass] = React.useState("")
    const [email,setNewEmail] = React.useState({
        value:"",
        isTouched:false,
    })
    const [errorMessage, setErrorMessage] = React.useState({
        value: "",
        isCorrectEmail: false,
        isCorrectPassword: false,
      });
    const toast = useToast()


    function Toast(){
        toast({
            title: "Changes Saved",
            status: 'info',
            duration: 3000,
            isClosable: true,
          })
    }
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
        sendDataToBackend();
        

    }
    // send data to backend fetch data from backend--------------------------------
    async function sendDataToBackend(data) {
        try {
            const response = await axios.patch(`${serverHost}/api/auth/change_email`, {
              email: email.value, // assuming 'username' state holds the new email
              password: password
            }, {
              headers: {
                authorization: `Bearer ${localStorage.getItem('token')}` // replace with your token retrieval method
              }
            });
            setErrorMessage({value: "Email changed successfully", isCorrectPassword: true,isCorrectEmail: true});
            clearForm();
            Toast();
          } catch (error) {
            console.error('Failed to change email:', error);
            switch (error.response.status) {
                case 400:
                    setErrorMessage({value: "You entered an incorrect password. Please try again.", isCorrectPassword: false, isCorrectEmail: true});
                    break;
                case 409:
                    setErrorMessage({value: "You entered the current email address. Please enter a different one to proceed.", isCorrectEmail: false, isCorrectPassword: true});
                    break;
                default:
                    break;
          }
        }
    }
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
                                    <Input isInvalid={!errorMessage.isCorrectPassword} placeholder='CURRENT PASSWORD' type='password' value={password} onChange={handleYourPass} size='lg' mb={5}></Input>
                                    {errorMessage.isCorrectPassword === false ? (<PasswordErrorMessage text={errorMessage.value}/>):null}

                                    <Input isInvalid={!errorMessage.isCorrectEmail} placeholder='NEW EMAIL' type='email' onBlur={handleNewEmailBlur} value={email.value} onChange={handleNewEmail} size='lg'></Input>
                                    {email.isTouched&&!validateEmail(email.value)&&errorMessage.isCorrectEmail===true ? (<PasswordErrorMessage text="Please enter a valid email"/>):null}
                                    {errorMessage.isCorrectEmail === false ? (<PasswordErrorMessage text={errorMessage.value}/>):null}
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