import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";

function MessagesNavbar() {
    const navigate = useNavigate();
    return (
        <Tabs style={{ backgroundColor: "#0079D3", color: "#edeff1", fontSize: "larger", paddingLeft: "80px" }} position='relative' variant='unstyled'>
            <TabList>
                <Tab onClick={() => navigate("/message/compose")}>Send a Private Message</Tab>
                <Tab onClick={() => navigate("/message/inbox")}>Inbox</Tab>
                <Tab>Sent</Tab>
            </TabList>
        </Tabs>
    );
}

export default MessagesNavbar;