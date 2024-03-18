import './style.css'
import { Select, Flex, Spacer, Box } from '@chakra-ui/react'
import Titles from '../feedSettings/childs/Titles';
import React from 'react';
function ChatAndMessaging(){

const[chatRequest,setChatRequest]=React.useState("")
const[privateMessage, setPrivateMessage]=React.useState("")
const[approvedUsers,setApprovedUsers]=React.useState([])

function handleChatRequest(e){
    setChatRequest(e.target.value)
}
function handleApprovedUsers(){

}
function handleRmoveUsers(){

}
    return(
        <Box className='container'>
            <Box className='settings-section col'> 
                <Box className="user-settings-header">
                    <h2 className="settings-heading ">Chat & Messaging</h2>
                    <Flex mb={5}>
                    
                    <Titles title="Who can send you chat requests"/>
                    <Spacer/>
                    <Select className="option-value" textAlign='end'   variant='unstyled'  size='xs' width='fit-content'  textTransform="uppercase" >
                        <option className='fw-bold'>Everyone</option>
                        <option className='fw-bold'>Account Older Than 30 Days </option>
                        <option className='fw-bold'>Nobody </option>
                     </Select> 
                    </Flex>
                    <Flex mb={5}>
                    
                    <Titles title="Who can send you private messages" description="Heads up—Reddit admins and moderators of communities you've joined can message you even if they're not approved."/>
                    <Spacer/>
                    <Select className="option-value" textAlign='end'  variant='unstyled'  size='xs' width='fit-content'  textTransform="uppercase" >
                        <option className='fw-bold'>Everyone</option>
                        
                        <option className='fw-bold'>Nobody </option>
                     </Select> 
                    </Flex>
                </Box>
            </Box>
        </Box>
    )
}

export default ChatAndMessaging;