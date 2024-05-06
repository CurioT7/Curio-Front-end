import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom"; 

function InboxTabs() {
    const navigate = useNavigate(); 

    const handleTabClick = (path) => {
        navigate(path); 
    };

    return (
        <Tabs style={{backgroundColor : "#0079D3", color: "white", height: "2.5rem", paddingLeft: "80px"}} position='relative' variant='unstyled'>
        <TabList>
            <Tab _selected={{borderBottom: "1px", borderColor: "white"}} _hover={{borderBottom: "1px", borderColor: "white"}} style={{fontSize: "0.8rem"}} onClick={() => handleTabClick("")}>All</Tab>
            <Tab _selected={{borderBottom: "1px", borderColor: "white"}} _hover={{borderBottom: "1px", borderColor: "white"}} style={{fontSize: "0.8rem"}} onClick={() => handleTabClick("")}>Unread</Tab>
            <Tab _selected={{borderBottom: "1px", borderColor: "white"}} _hover={{borderBottom: "1px", borderColor: "white"}} style={{fontSize: "0.8rem"}} onClick={() => handleTabClick("")}>Messages</Tab>
            <Tab _selected={{borderBottom: "1px", borderColor: "white"}} _hover={{borderBottom: "1px", borderColor: "white"}} style={{fontSize: "0.8rem"}} onClick={() => handleTabClick("/message/selfreply")}>Comment Replies</Tab>
            <Tab _selected={{borderBottom: "1px", borderColor: "white"}} _hover={{borderBottom: "1px", borderColor: "white"}} style={{fontSize: "0.8rem"}} onClick={() => handleTabClick("/message/mentions")}>Username Mentions</Tab>
        </TabList>
         <TabIndicator mt='-1px' height='1px' bg='white.500' borderRadius='1px' />
        <TabPanels>
            <TabPanel>
            </TabPanel>
            <TabPanel>
            </TabPanel>
            <TabPanel>
            </TabPanel>
        </TabPanels>
        </Tabs>
    );
}

export default InboxTabs;