import { Button,Switch, Box, Container, Flex, Text } from '@chakra-ui/react'
import React from "react"
import { useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react"
import { Input, FormControl, FormLabel, Image,Avatar } from "@chakra-ui/react";
import Titles from '../../feedSettings/childs/Titles';
import './formstyle.css'
function ChangePass(props){
    const { isOpen, onOpen, onClose } = useDisclosure();
    
    function PasswordErrorMessage1 (num) {
        
            return (
              <Text fontSize='xs'color='red'fontWeight='bold'>This field is required</Text>
            )
        
        }
      function PasswordErrorMessage2(){
        return (
            <Text fontSize='xs'color='red'fontWeight='bold'>Password should have at least 8 characters</Text>
          );
      }
      function PasswordErrorMessage3(){
        return (
            <Text fontSize='xs'color='red'fontWeight='bold'>Password must match</Text>
          );
      }

    //   use states

    const [oldPass,setOldPass]=React.useState({
        value: "",
        isTouched: false,
      })
    const [newPass,setNewPass]=React.useState({
        value: "",
        isTouched: false,
      })
    const [confirmPass,setConfirmPass]=React.useState({
        value: "",
        isTouched: false,
      })
    const [logOut,setLogOut]=React.useState(false)

    function handleOldPass(e){
        setOldPass({...oldPass,value: e.target.value})
    }
    function handleNewPass(e){
        setNewPass({...newPass,value: e.target.value})
    }
    function handleConfirmPass(e){
        setConfirmPass({...confirmPass,value: e.target.value})
    }
    function handleOldPassBlur(){
        setOldPass({...oldPass,isTouched:true})
    }
    function handleNewPassBlur(){
        setNewPass({...newPass,isTouched:true})
    }
    function handleConfirmPassBlur(){
        setConfirmPass({...confirmPass,isTouched: true})
    }
    function handleLogOut(){
        setLogOut(!logOut)
    }
    function handleSubmit(e){
        e.preventDefault();
        clearForm();
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
    console.log(`${oldPass.value} ${newPass.value} ${confirmPass.value}`)
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

                                        <Input type='password' onBlur={handleOldPassBlur} value={oldPass.value} onChange={handleOldPass} placeholder='OLD PASSWORD' mb={5} />
                                        {newPass.isTouched&&oldPass.value<1 ?(<PasswordErrorMessage1/>): null }

                                        <Input type='password' onBlur={handleNewPassBlur} value={newPass.value} onChange={handleNewPass} placeholder='NEW PASSWORD' mb={5} />
                                        {newPass.isTouched&&newPass.value.length<8 ?(<PasswordErrorMessage2/>): null }

                                        <Input type='password' onBlur={handleConfirmPassBlur}  value={confirmPass.value} onChange={handleConfirmPass} placeholder='CONFRIM NEW PASSWORD' mb={5} />
                                        {newPass.isTouched&&newPass.value!=confirmPass.value ?(<PasswordErrorMessage3/>): null }

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