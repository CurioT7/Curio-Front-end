import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator } from '@chakra-ui/react';

function InboxTabs() {
    return (
        <Tabs style={{backgroundColor : "#0079D3", color: "white", height: "2.5rem", paddingLeft: "80px"}} position='relative' variant='unstyled'>
        <TabList>
            <Tab _selected={{borderBottom: "1px", borderColor: "white"}} _hover={{borderBottom: "1px", borderColor: "white"}} style={{fontSize: "0.8rem"}}>All</Tab>
            <Tab _selected={{borderBottom: "1px", borderColor: "white"}} _hover={{borderBottom: "1px", borderColor: "white"}} style={{fontSize: "0.8rem"}}>Unread</Tab>
            <Tab _selected={{borderBottom: "1px", borderColor: "white"}} _hover={{borderBottom: "1px", borderColor: "white"}} style={{fontSize: "0.8rem"}}>Messages</Tab>
            <Tab _selected={{borderBottom: "1px", borderColor: "white"}} _hover={{borderBottom: "1px", borderColor: "white"}} style={{fontSize: "0.8rem"}}>Comment Replies</Tab>
            <Tab _selected={{borderBottom: "1px", borderColor: "white"}} _hover={{borderBottom: "1px", borderColor: "white"}} style={{fontSize: "0.8rem"}}>Username Mentions</Tab>
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