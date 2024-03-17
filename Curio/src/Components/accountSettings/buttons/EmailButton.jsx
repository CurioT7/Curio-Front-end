import { Button, ButtonGroup, Box,Input, Text } from '@chakra-ui/react'
import React from "react"
import { useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react"
import { MdMarkEmailUnread } from "react-icons/md";
import PasswordErrorMessage from './PasswordErrorMessage';
import validateEmail from '../checker/EmailChecker';
const EmailButton = (props) =>{
    const pass ="12345678"
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [yourPass,setYourPass] = React.useState("")
    const [newEmail,setNewEmail] = React.useState({
        email:"",
        isTouched:false,
    })
    function handleYourPass(e){
        setYourPass(e.target.value)
    }
    function handleNewEmail(e){
        setNewEmail({...newEmail,email:e.target.value})
    }
    function handleNewEmailBlur(e){
        setNewEmail({...newEmail,isTouched:true})
    }
    function isValid(){
        return(
            yourPass===pass&&
            validateEmail(newEmail.email)
        )
    }
    function clearForm(){
        setYourPass("")
        setNewEmail({
            email:"",
            isTouched:false,
        })
    }
    function handleSubmit(e){
        e.preventDefault();
        clearForm();

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
                                    <Input placeholder='CURRENT PASSWORD' type='password' value={yourPass} onChange={handleYourPass} size='lg' mb={5}></Input>

                                    <Input placeholder='NEW EMAIL' type='email' onBlur={handleNewEmailBlur} value={newEmail.email} onChange={handleNewEmail} size='lg'></Input>
                                    {newEmail.isTouched&&!validateEmail(newEmail.email) ? (<PasswordErrorMessage text="Please enter a valid email"/>):null}
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