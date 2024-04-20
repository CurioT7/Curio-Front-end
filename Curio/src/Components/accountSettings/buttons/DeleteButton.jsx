
import { Button, ButtonGroup, Box, Text, Textarea, Input, Checkbox } from '@chakra-ui/react'
import React from "react"
import { useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react"
import { FaTrashAlt } from "react-icons/fa";
import './formstyle.css'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import { useToast, } from '@chakra-ui/react';
function DeleteButton(){
    const serverHost = import.meta.env.VITE_SERVER_HOST;
    const toast = useToast()
    const navigate = useNavigate()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [ feedBack,setFeedBack] = React.useState("")
    const [isChecked,setIsChecked] =React.useState(false)
    const [userName,setUserName] = React.useState("")
    const [yourPass,setYourPass] = React.useState("")
    const [isChild,setIsChild] = React.useState(false)
    function ToastErr(){
        toast({
            title: "Error occured, please try again later",
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
    }
    function handleFeedBack (e){
        setFeedBack(e.target.value)
    }
    function handleIsChecked(){
        setIsChecked(!isChecked)
    }
    function handleUserName(e){
        setUserName(e.target.value)
    }
    function handleYourPass(e){
        setYourPass(e.target.value)
    }
    function handleIsChild(){
        setIsChild(!isChild)
    }
    function isValid(){
        return(
            userName.length&&
            yourPass.length&&
            isChecked
        )
    }


    function clearForm(){
        setIsChild(false)
        setUserName("")
        setYourPass("")
        setIsChecked(false)
        setFeedBack("")
        onClose
    }
    async function sendDataToBackend(){
        
        try {
            const response = await axios.delete(`${serverHost}/api/settings/delete_account`,{data: {
                username: userName,
                password: yourPass,
            }, 
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            navigate('/')
            localStorage.removeItem('token')
            localStorage.removeItem('username');
            window.dispatchEvent(new Event("loginOrSignup"));
            clearForm()
        }
        catch(error){
            console.error('Faild To delete', error.message);
            switch (error.response.status) {
                case 401:
                    
                    setIsChild(false)
                    setIsChecked(false)
                    ToastErr()
                    break;
                
                default:
                    break;
          }
        }
    }

    
    function handleSubmit(e){
        e.preventDefault();
        sendDataToBackend();
        
        
    }
    return(
        <Box>
                <Button color='red' onClick={onOpen} variant='unstyled' leftIcon={<FaTrashAlt />} > Delete Account</Button>
                <Modal size='lg' isCentered isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader className='border-bottom fs-6 '>Delete account</ModalHeader>
                        <ModalCloseButton />
                        <form onSubmit={handleSubmit}>
                            {!isChild &&
                            <ModalBody display='flex' flexDirection='column'>
                                <Text className='text-space' fontWeight='400'>We're sorry to see you go</Text>
                                <Text className='text-space' fontWeight='400'>Once you delete your account, your profile and username are permanently removed from Reddit and your posts, comments, and messages are disassociated (not deleted) from your account unless you delete them beforehand.</Text>
                                
                                <h3 className='heading-titles'>HELP IMPROVE REDDIT (OPTIONAL)</h3>
                                <Textarea mb={5} focusBorderColor='black' onChange={handleFeedBack} value={feedBack} placeholder="Let us Know why you're leaving"/>
                                <h3 className='heading-titles'>VERIFY YOUR IDENTITY</h3>
                                <Input placeholder='USERNAME' value={userName} onChange={handleUserName} mb={2} size='lg'></Input>
                                <Input placeholder='PASSWORD' value={yourPass} onChange={handleYourPass} type='password' mb={5} size='lg'></Input>
                                <Checkbox isChecked={isChecked}  onChange={handleIsChecked}  colorScheme="blackAlpha"> <small> I understand that deleted accounts aren't recoverable</small></Checkbox>
                            </ModalBody>
                            }
                            {isChild&&
                                 <ModalBody display='flex' flexDirection='column'>
                                    <Text className='text-space' fontWeight='400'>Be absolutely sure before deleting your account</Text>
                                <Text className='text-space' fontWeight='400'>Deleting your account removes it from Reddit and our administrators won’t be able to bring it back for you.</Text>
                                 </ModalBody>
                            
                            }

                            <ModalFooter>
                                
                                {!isChild&&
                                <Box>
                                    <Button style={{borderRadius:"30px"}} variant='outline' colorScheme='blue' mr={3} onClick={onClose}>
                                    CANCEL
                                    </Button>
                                    <Button onClick={handleIsChild} isDisabled={!isValid()}  style={{borderRadius:"30px"}} colorScheme='red'>DELETE</Button>
                                </Box>
                                }
                                {isChild&&
                                <Box>
                                    <Button style={{borderRadius:"30px"}} variant='outline' colorScheme='blue' mr={3} onClick={handleIsChild}>
                                    CANCEL
                                    </Button>
                                    <Button  onClick={onClose} type='submit' style={{borderRadius:"30px"}} colorScheme='red'>DELETE</Button>
                                </Box>
                                }
                                
                            </ModalFooter>
                        </form>
                    </ModalContent>
                </Modal>
        </Box>
    )
}

export default DeleteButton;