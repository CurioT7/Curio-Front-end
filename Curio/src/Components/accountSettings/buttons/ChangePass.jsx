import { Button,Switch, Box, Container, Flex, Text } from '@chakra-ui/react'
import React from "react"
import { useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react"
import { Input, FormControl, FormLabel, Image,Avatar } from "@chakra-ui/react";
import Titles from '../../feedSettings/childs/Titles';
import './formstyle.css'
import PasswordErrorMessage from './PasswordErrorMessage';
import { useToast, } from '@chakra-ui/react';
import axios from 'axios';
function ChangePass(props){
    const { isOpen, onOpen, onClose } = useDisclosure();
    const currentPass="12345678"
    const toast = useToast()
    function Toast(){
        toast({
            
            description: "Changes Saved",
            status: 'info',
            duration: 3000,
            isClosable: true,
          })
    }
    const serverHost = import.meta.env.VITE_SERVER_HOST;
    //   use states

    const [oldPassword,setOldPass]=React.useState({
        value: "",
        isTouched: false,
      })
    const [password,setNewPass]=React.useState({
        value: "",
        isTouched: false,
      })
    const [confirmPass,setConfirmPass]=React.useState({
        value: "",
        isTouched: false,
      })
    const [logOut,setLogOut]=React.useState(false)

    const [oldPasswordFromBackend, setOldPasswordFromBackend] = React.useState("");

    function handleOldPass(e){
        setOldPass({...oldPassword,value: e.target.value})
    }
    function handleNewPass(e){
        setNewPass({...password,value: e.target.value})
    }
    function handleConfirmPass(e){
        setConfirmPass({...confirmPass,value: e.target.value})
    }
    function handleOldPassBlur(){
        setOldPass({...oldPassword,isTouched:true})
    }
    function handleNewPassBlur(){
        setNewPass({...password,isTouched:true})
    }
    function handleConfirmPassBlur(){
        setConfirmPass({...confirmPass,isTouched: true})
    }
    function handleLogOut(){
        setLogOut(!logOut)
    }
    //API call--------------------------------//
    React.useEffect(() => {
        async function fetchOldPassword() {
            try {
                
                const response = await axios.get(`${serverHost}/api/auth/change_password`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setOldPasswordFromBackend(response.data.password);
            } catch (error) {
                console.error('Error fetching old password from backend:', error);
            }
        }

        fetchOldPassword();
    }, []);

    async function sendNewPasswordToBackend() {
        try {
            
            await axios.post(`${serverHost}/api/auth/change_password`, {
                oldPassword: oldPassword.value,
                newPassword: password.value
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
        } catch (error) {
            console.error('Error sending new password to backend:', error);
        }
    }
    
    //API call--------------------------------//
    function handleSubmit(e){
        e.preventDefault();
        if(password.value !== confirmPass.value || password.value.length<8 ||oldPassword.value != oldPasswordFromBackend || !password){
            alert('please enter again')
            return
        }
        sendNewPasswordToBackend();
        clearForm();
        Toast()
        console.log('oleaas work')
    }

    function clearForm(){
        setOldPass({
            value:"",
            isTouched: false,
        })
        setNewPass({
            value:"",
            isTouched: false,
        })
        setConfirmPass({
            value:"",
            isTouched: false,
        })
        setLogOut(false)
    }
    console.log(`${oldPassword.value} ${password.value} ${confirmPass.value}`)
    return(
        <Box>
                <Button onClick={onOpen} style={props.buttonStyle} variant='outline'>Change</Button>

                <Modal  size='3xl' isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                        <ModalContent>
                            
                            <ModalCloseButton />
                            <ModalHeader></ModalHeader>
                            <ModalBody mt={10} className='col-7'>
                                <Container ms={10}>
                                    <form onSubmit={handleSubmit}>
                                        <Box display='flex' flexDirection='column'>
                                        <Avatar src='Reddit_Icon_FullColor.png' mb={2}/>

                                        <h3 className="headings-settings fs-5 d-flex fw-500 mb-3">Update your password</h3> 

                                        <Input type='password' onBlur={handleOldPassBlur} value={oldPassword.value} onChange={handleOldPass} placeholder='OLD PASSWORD' mb={5} />
                                        {oldPassword.isTouched&&oldPassword.value<1 ?(<PasswordErrorMessage text="This field is required"/>): null }

                                        <Input type='password' onBlur={handleNewPassBlur} value={password.value} onChange={handleNewPass} placeholder='NEW PASSWORD' mb={5} />
                                        {password.isTouched&&password.value.length<8 ?(<PasswordErrorMessage text="Password should have at least 8 characters"/>): null }

                                        <Input type='password' onBlur={handleConfirmPassBlur}  value={confirmPass.value} onChange={handleConfirmPass} placeholder='CONFRIM NEW PASSWORD' mb={5} />
                                        {confirmPass.isTouched&&password.value!=confirmPass.value ?(<PasswordErrorMessage text="Password must match"/>): null }

                                        <Flex justifyContent='space-between' alignItems='center'>
                                            <Titles title='Log me out everywhere'
                                                    description='Changing your password logs you out of all browsers on your device(s). Checking this box also logs you out of all apps you have authorized.'/>
                                            <Switch onChange={handleLogOut}/>
                                        </Flex>
                                        <Button width='10vw' colorScheme='blue' style={props.buttonStyle} type='submit'>Save</Button>
                                        </Box>
                                    </form>
                                </Container>
                            </ModalBody>

                            <ModalFooter height='100px'>
                              
                            </ModalFooter>
                    </ModalContent>
                </Modal>
                </Box>
    )
}

export default ChangePass;