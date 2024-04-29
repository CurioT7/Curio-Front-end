import { Button,Switch, Box, Container, Flex} from '@chakra-ui/react'
import React from "react"
import { useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react"
import { Input,Avatar } from "@chakra-ui/react";
import Titles from '../../feedSettings/childs/Titles';
import './formstyle.css'
import PasswordErrorMessage from './PasswordErrorMessage';
import { useToast, } from '@chakra-ui/react';
import axios from 'axios';
import logo from '../../../assets/Curio_logo.png'
function ChangePass(props){
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast()
    function Toast(){
        toast({
            
            description: "Password Changed Successfully, you will be redirected",
            status: 'info',
            duration: 3000,
            isClosable: true,
          })
    }
    
    //   use states

    const [oldPassword,setOldPass]=React.useState({
        value: "",
        isTouched: false,
        isCorrect: true,
      })
    const [password,setNewPass]=React.useState({
        value: "",
        isTouched: false,
        isCorrect: true,
      })
    const [confirmPass,setConfirmPass]=React.useState({
        value: "",
        isTouched: false,
      })
    const [logOut,setLogOut]=React.useState(false)

    const [errorMessage, setErrorMessage] = React.useState("");
    
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
        if(oldPassword.value.length<1){
            setOldPass({...oldPassword,isCorrect: false})
        }
    }
    function handleNewPassBlur(){
        setNewPass({...password,isTouched:true})
        if(password.value.length<8){
            setNewPass({...password,isCorrect: false})
        }
    }
    function handleConfirmPassBlur(){
        setConfirmPass({...confirmPass,isTouched: true})
    }
    function handleLogOut(){
        setLogOut(!logOut)
    }
    async function sendNewPasswordToBackend() {
        const serverHost = import.meta.env.VITE_SERVER_HOST;
        try {
            const response = await axios.patch(`${serverHost}/api/auth/change_password`, {
                oldPassword: oldPassword.value,
                password: password.value
            }, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            
            // If the response is successful, set isCorrect for both to be true
            setOldPass({...oldPassword, isCorrect: true});
            setNewPass({...password, isCorrect: true});
            Toast();
            setTimeout(() => {
                window.location.reload();
            }, 1500);
            clearForm();
            return response;
        } catch (error) {
            console.error('Error sending new password to backend:', error);
            // Use a switch statement to handle different error responses
            switch (error.response.status) {
                case 400:
                    if (error.response.data.message === "Old password is incorrect") {
                        setOldPass({...oldPassword, isCorrect: false});
                        setNewPass({...password, isCorrect: true});
                        setErrorMessage(" incorrect password");
                        
                    } else if (error.response.data.message === "Password doesn't meet the requirements") {
                        setNewPass({...password, isCorrect: false});
                        setOldPass({...oldPassword, isCorrect: true});
                        setErrorMessage("Enter Valid Password");
                       
                    }
                    break;
                case 404:
                    // Handle 404 error here
                    break;
                default:
                    // Handle other errors here
                    break;
            }
        }
    }
    
    //API call--------------------------------//
    async function handleSubmit(e){
        e.preventDefault();
        await sendNewPasswordToBackend()
        
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
    
    return(
        <Box>
                <Button onClick={onOpen} style={props.buttonStyle} colorScheme='blue' variant='outline'>Change</Button>

                <Modal  size='3xl' isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                        <ModalContent>
                            
                            <ModalCloseButton />
                            
                            <ModalBody padding={0} className='row' >
                                <div className='col-2 bg-secondary left-img-changepass'>

                                </div>
                                <Container mt={10} mb={10} ms={10}>
                                    <form onSubmit={handleSubmit}>
                                        <Box display='flex' paddingBottom={10} className='col-8' flexDirection='column'>
                                        <Avatar size='lg' src={logo} mb={2}/>

                                        <h3 className="headings-settings fs-5 d-flex fw-500 mb-3">Update your password</h3> 

                                        <Input isInvalid={!oldPassword.isCorrect} type='password' onBlur={handleOldPassBlur} value={oldPassword.value} onChange={handleOldPass} placeholder='OLD PASSWORD' mb={5} />
                                        {oldPassword.isTouched&&oldPassword.value<1 ?(<PasswordErrorMessage text="This field is required"/>): null }
                                        {oldPassword.isCorrect==false && errorMessage &&<PasswordErrorMessage text={errorMessage} />}

                                        <Input isInvalid={!password.isCorrect} type='password' onBlur={handleNewPassBlur} value={password.value} onChange={handleNewPass} placeholder='NEW PASSWORD' mb={5} />
                                        {password.isTouched&&password.value.length<8 ?(<PasswordErrorMessage text="Password should have at least 8 characters"/>): null }
                                        {password.isCorrect==false && errorMessage && <PasswordErrorMessage text={errorMessage} />}
                                        
                                        <Input isInvalid={password.value != confirmPass.value} type='password' onBlur={handleConfirmPassBlur}  value={confirmPass.value} onChange={handleConfirmPass} placeholder='CONFRIM NEW PASSWORD' mb={5} />
                                        {confirmPass.isTouched&&password.value!=confirmPass.value ?(<PasswordErrorMessage text="Password must match"/>): null }

                                        
                                        <Button width='10vw' colorScheme='blue' style={props.buttonStyle} type='submit'>Save</Button>
                                        </Box>
                                    </form>
                                </Container>
                            </ModalBody>

                    
                    </ModalContent>
                </Modal>
                </Box>
    )
}

export default ChangePass;