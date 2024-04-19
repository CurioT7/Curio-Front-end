import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import "./Notification_Messages.css";

function Notification_Messages() {  
  return (
    <div>
      <div className="notification-page">
      <h3>Messages</h3>
        <div className="notification-content">
        <Tabs variant='soft-rounded' colorScheme='blue'>
        <TabList>
          <Tab>Handle Messages</Tab>
          <Tab>Inbox</Tab>
          <Tab> Sent</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <p>there doesn't seem to be anything here</p>
          </TabPanel>
          <TabPanel>
            <p>there doesn't seem to be anything here</p>
          </TabPanel>
          <TabPanel>
            <p>there doesn't seem to be anything here</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
        </div>
      </div>
    </div>
  );
}

export default Notification_Messages;