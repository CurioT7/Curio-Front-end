/**
 * Messages Component
 * 
 * A component to manage user notification settings for private messages, chat messages, and chat requests.
 * 
 * @component
 * @param {Object} userActivity - User activity settings object containing allowPrivateMessages, allowChatNotifications, and allowChatRequests.
 * @module Messages
 * @example
 * import React from 'react';
 * import Messages from './Messages';
 * 
 * const MyComponent = () => {
 *   const userActivity = {
 *     allowPrivateMessages: true,
 *     allowChatNotifications: true,
 *     allowChatRequests: true
 *   };
 * 
 *   return (
 *     <Messages userActivity={userActivity} />
 *   );
 * };
 * 
 * export default MyComponent;
 */

import React, { useState, useEffect } from "react";
import { Flex, Switch, Spacer, useToast } from "@chakra-ui/react";
import Titles from "../../feedSettings/childs/Titles";
import { sendUserDataToBackend } from '../../UserSetting/UserSettingsEndPoints';


function Messages({ userActivity }) {
  const toast = useToast();
  const [allowPrivateMessages, setAllowPrivateMessages] = useState(true);
  const [allowChatNotifications, setAllowChatNotifications] = useState(true);
  const [allowChatRequests, setAllowChatRequests] = useState(true);

  useEffect(() => {
    setAllowPrivateMessages(userActivity.allowPrivateMessages);
    setAllowChatNotifications(userActivity.allowChatNotifications);
    setAllowChatRequests(userActivity.allowChatRequests);
  }, [userActivity]);

  function Toast() {
    toast({
      description: "Changes Saved",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  }

  function handlePrivateMessagesChange(){
    setAllowPrivateMessages(!allowPrivateMessages);
    sendUserDataToBackend({allowPrivateMessages :! allowPrivateMessages});
    Toast();
  };

  function handleChatMessagesChange(){
    setAllowChatNotifications(!allowChatNotifications);
    sendUserDataToBackend({allowChatNotifications :! allowChatNotifications});
    Toast();
  };

  function handleChatrequestChange(){
    setAllowChatRequests(!allowChatRequests);
    sendUserDataToBackend({allowChatRequests :! allowChatRequests});
    Toast();
  };

  return (
    <>
      <Flex mb={5} alignItems="center">
        <Titles title="Private messages" />
        <Spacer />
        <Switch
          size="lg"
          isChecked={allowPrivateMessages}
          onChange={handlePrivateMessagesChange}
          data-testid="allowPrivateMessages-switch"
        />
      </Flex>
      <Flex mb={5} alignItems="center">
        <Titles title="Chat messages" />
        <Spacer />
        <Switch
          size="lg"
          isChecked={allowChatNotifications}
          onChange={handleChatMessagesChange}
          data-testid="allowChatNotifications-switch"
        />
      </Flex>
      <Flex mb={5} alignItems="center">
        <Titles title="Chat requests" />
        <Spacer />
        <Switch
          size="lg"
          isChecked={allowChatRequests}
          onChange={handleChatrequestChange}
          data-testid="allowChatRequests-switch"
        />
      </Flex>
    </>
  );
}

export default Messages;
