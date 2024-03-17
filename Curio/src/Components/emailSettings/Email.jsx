import { Switch, Flex, Spacer, Box } from '@chakra-ui/react'
import Titles from '../feedSettings/childs/Titles';
import React from 'react';
import 'G:/university/Senior 1/Spring/Software/Project/Code/Front End/Curio-Front-end/Curio/src/Components/style/userSettingsStyle.css'
function Email (){
    const [newFollowerEmail,setNewFollowerEmail]=React.useState(true)
    const [chatRequestEmail,setChatRequestEmail]=React.useState(true)
    const [unsubscribeFromAllEmails,setUnsubscribeFromAllEmails] = React.useState(false)
    function handleNewFollowerEmail(){
        setNewFollowerEmail(!newFollowerEmail)
    }
    function handleChatRequestEmail(){
        setChatRequestEmail(!chatRequestEmail)
    }
    function handleUnsubscribeFromAllEmails(){
        setUnsubscribeFromAllEmails(!unsubscribeFromAllEmails)
    }
    // console test
    console.log(` New user: ${newFollowerEmail}`)
    console.log(`Chat: ${chatRequestEmail}`)
    console.log(`Unsub: ${unsubscribeFromAllEmails}`)
    // *-----------------------------------------------*//
    return(
        <Box className='container'>
            <Box className='settings-section col'> 
                <Box className="user-settings-header">
                    <h2 className="settings-heading ">Manage Emails</h2>
                    <h3 className="headings-titles text-uppercase fw-bold mb-3">messages</h3>
                    <Flex mb={5} alignItems='center'>
                        <Titles title='Chat requests'/>
                        <Spacer/>
                        <Switch size='lg' isChecked={chatRequestEmail} onChange={handleChatRequestEmail}/>
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
            </Box>
        </Box>
    )
}

export default Email;