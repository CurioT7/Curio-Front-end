import { Switch, Flex, Spacer, Box,Button,Text } from '@chakra-ui/react'
import Titles from '../feedSettings/childs/Titles';
import React from 'react';
import './Email.css'
import { useToast, } from '@chakra-ui/react';
import axios from 'axios';

const serverHost = import.meta.env.VITE_SERVER_HOST;
/**
 * Represents the Email component.
 * This component handles email settings and preferences.
 *
 * @returns {JSX.Element} The Email component.
 */
function Email (){

    const toast = useToast()
    const [newFollowerEmail,setNewFollowerEmail]=React.useState(true)
    const [chatRequestEmail,setChatRequestEmail]=React.useState(true)
    const [unsubscribeFromAllEmails,setUnsubscribeFromAllEmails] = React.useState(false)
    function Toast(){
        toast({
            
            description: "Changes Saved",
            status: 'info',
            duration: 3000,
            isClosable: true,
          })
    }
    function handleNewFollowerEmail(){
        setNewFollowerEmail(!newFollowerEmail)
        sendDataToBackend({ newFollowerEmail: !newFollowerEmail });
        Toast()
    }
    function handleChatRequestEmail(){
        setChatRequestEmail(!chatRequestEmail)
        sendDataToBackend({ chatRequestEmail: !chatRequestEmail });
        Toast()
    }

    function handleUnsubscribeFromAllEmails(){
        setUnsubscribeFromAllEmails(!unsubscribeFromAllEmails)
        sendDataToBackend({ unsubscribeFromAllEmails: !unsubscribeFromAllEmails });
       Toast()
    }
    async function sendDataToBackend(data) {
        try {
            
            const response = await axios.patch(`${serverHost}/api/settings/v1/me/prefs`, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response;
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

    async function fetchDataFromBackend() {
        try {
            
            const response = await axios.get(`${serverHost}/api/settings/v1/me/prefs`, {
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
                setNewFollowerEmail(data.newFollowerEmail);
                setChatRequestEmail(data.chatRequestEmail);
                setUnsubscribeFromAllEmails(data.unsubscribeFromAllEmails);
            }
        }

        fetchAndSetData();
    }, []);
    
    return(
        <Box className="user-settings-header">
            <h3 className="headings-titles text-uppercase fw-bold mb-3">messages</h3>
            <Flex mb={5} alignItems='center'>
                <Titles title='Chat requests'/>
                <Spacer/>
                <Switch  size='lg' isChecked={chatRequestEmail} onChange={handleChatRequestEmail}/>
            </Flex>
            <h3 className="headings-titles text-uppercase fw-bold mb-3">Activity</h3>
            <Flex mb={5} alignItems='center'>
                <Titles title='New user welcome'
                            />
                <Spacer/>
                <Switch size='lg' isChecked={newFollowerEmail} onChange={handleNewFollowerEmail}/>

            </Flex>
            <h3 className="headings-titles text-uppercase fw-bold mb-3"></h3>
            <Flex mb={5} alignItems='center'>
                <Titles title='Unsubscribe from all emails'
                            />
                <Spacer/>
                <Switch size='lg' isChecked={unsubscribeFromAllEmails} onChange={handleUnsubscribeFromAllEmails}/>

            </Flex>
            
        </Box>
    )
}

export default Email;