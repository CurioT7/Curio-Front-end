import { Button, ButtonGroup, Box, Text } from '@chakra-ui/react'
import React from "react"
import { useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react"
import { MdMarkEmailUnread } from "react-icons/md";
import axios from 'axios';
import { FaTrashAlt } from "react-icons/fa";
/**
 * GeneratePass component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.username - The username.
 * @param {string} props.email - The email.
 * @param {boolean} props.isEmail - Indicates if the component is for email settings.
 * @param {boolean} props.isDelete - Indicates if the component is for account deletion.
 * @param {boolean} props.isGoogle - Indicates if the component is for Google account settings.
 * @param {Object} props.buttonStyle - The style object for the button.
 * @param {string} props.title - The title of the modal.
 * @param {string} props.context - The context of the modal.
 * @returns {JSX.Element} The GeneratePass component.
 */
function GeneratePass(props){

    const serverHost = import.meta.env.VITE_SERVER_HOST;
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isSent,setIsSent] = React.useState(false)



    function handleIsSent(){
        setIsSent(true)
        sendDataToBackend()
    }
    function handleClose(){
        setIsSent(false)
        onClose()
    }
    async function sendDataToBackend(){
        
        try {
            const response = await axios.post(`${serverHost}/api/auth/password`, {
                username: props.username,
                email: props.email,
            });
        }catch(error){
            console.error('Fail', error.message);
            switch (error.response.status) {
                case 404:
                    console.error('User not found', error.response.data.message)
                    break;
                case 500:
                    console.error('Server Error', error.response.data.message)
                default:
                    break;
            }
        }
    }
    return(
        <Box>
                {props.isEmail &&<Button onClick={onOpen} style={props.buttonStyle} variant='outline' colorScheme='blue'>Change</Button>}
                {props.isDelete &&<Button color='red' onClick={onOpen} variant='unstyled' leftIcon={<FaTrashAlt />} > Delete Account</Button>}
                {props.isGoogle && <Button className='fs-6 text-decoration-underline' variant='ghost'  onClick={onOpen} style={{borderRadius:'30px'}} colorScheme='blue' color='red'  size='sm'>(Disconnect)</Button>}
                <Modal isCentered size='md' isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader mt={5}> <Box display='flex'> <MdMarkEmailUnread className='fs-1 me-3' /><h4> {props.title}</h4> </Box></ModalHeader>
                        <ModalCloseButton />
                        
                        <ModalBody>
                           
                                <Box display='flex'  flexDirection='column'>
                                    {isSent===false&&<Text className='fs-6' fontWeight='400'>{props.context}, you need to create a Curio password first. We'll walk you through it.</Text>}
                                    {isSent===true&&<Text className='fs-6' fontWeight='400'>We sent a message to {props.email} with a link to create your password.</Text>}
                                </Box>
                            
                        </ModalBody>

                        <ModalFooter>
                            
                            {isSent===false && <>
                            <Button mr={3} onClick={onClose} className='fs-6 fw-bold' size='sm' type='submit' style={props.buttonStyle} colorScheme='blue' variant='outline'>Cancel</Button>
                            <Button onClick={handleIsSent} className='fs-6 fw-bold' size='sm' type='submit' style={props.buttonStyle} colorScheme='blue'>Continue</Button>
                            </>}
                            {isSent===true &&<Button onClick={handleClose} className='fs-6 fw-bold' size='sm' type='submit' style={props.buttonStyle} colorScheme='blue'>ok</Button>}
                            
                        </ModalFooter>
                        
                    </ModalContent>
                </Modal>
            </Box>
    )
}

export default GeneratePass;