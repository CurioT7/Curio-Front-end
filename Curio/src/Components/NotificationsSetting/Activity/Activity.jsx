/**
 * Activity Component
 * 
 * A component to manage user activity notification settings.
 * 
 * @component
 * @param {Object} userActivity - User activity settings object containing mentions, comments, upvotesPosts, upvotesComments, replies, newFollowers, and postsYouFollow.
 * @module Activity
 * @example
 * import React from 'react';
 * import Activity from './Activity';
 * 
 * const MyComponent = () => {
 *   const userActivity = {
 *     mentions: true,
 *     comments: true,
 *     upvotesPosts: true,
 *     upvotesComments: true,
 *     replies: true,
 *     newFollowers: true,
 *     postsYouFollow: true
 *   };
 * 
 *   return (
 *     <Activity userActivity={userActivity} />
 *   );
 * };
 * 
 * export default MyComponent;
 */

import React, { useState, useEffect } from "react";
import { Flex, Switch, Spacer, useToast } from "@chakra-ui/react";
import Titles from "../../feedSettings/childs/Titles";
import { sendUserDataToBackend } from '../../UserSetting/UserSettingsEndPoints';


function Activity({ userActivity }) {
  const toast = useToast();
  const [mentions, setMentionChecked] = useState(true);
  const [comments, setCommentsChecked] = useState(true);
  const [upvotesPosts, setUpvotesPostsChecked] = useState(true);
  const [upvotesComments, setUpvotesCommentsChecked] = useState(true);
  const [replies, setRepliesChecked] = useState(true);
  const [newFollowers, setNewFollowersChecked] = useState(true);
  const [postsYouFollow, setPostsFollowChecked] = useState(true);

  useEffect(() => {
    setMentionChecked(userActivity.mentions);
    setCommentsChecked(userActivity.comments);
    setUpvotesPostsChecked(userActivity.upvotesPosts);
    setUpvotesCommentsChecked(userActivity.upvotesComments);
    setRepliesChecked(userActivity.replies);
    setNewFollowersChecked(userActivity.newFollowers);
    setPostsFollowChecked(userActivity.postsYouFollow);
  }, [userActivity]);

  function Toast() {
    toast({
      description: "Changes Saved",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  }

  function handleMentionChange(){
    setMentionChecked(!mentions);
    sendUserDataToBackend({mentions :! mentions});
    Toast();
  };

  function handleCommentsChange(){
    setCommentsChecked(!comments);
    sendUserDataToBackend({comments :! comments});
    Toast();
  };

  function handleUpvotesPostsChange(){
    setUpvotesPostsChecked(!upvotesPosts);
    sendUserDataToBackend({upvotesPosts :! upvotesPosts});
    Toast();
  };


  function handleUpvotesCommentsChange(){
    setUpvotesCommentsChecked(!upvotesComments);
    sendUserDataToBackend({upvotesComments :! upvotesComments});
    Toast();
  };

  function handleRepliesChange(){
    setRepliesChecked(!replies);
    sendUserDataToBackend({replies :! replies});
    Toast();
  };

  function handleNewFollowersChange(){
    setNewFollowersChecked(!newFollowers);
    sendUserDataToBackend({newFollowers :! newFollowers});
    Toast();
  };

  function handlePostsFollowChange(){
    setPostsFollowChecked(!postsYouFollow);
    sendUserDataToBackend({postsYouFollow :! postsYouFollow});
    Toast();
  };

  return (
    <>
      <Flex mb={5} alignItems="center">
        <Titles title="Mentions of u/username" />
        <Spacer />
        <Switch
          size="lg"
          isChecked={mentions}
          onChange={handleMentionChange}
          data-testid="mentions-switch"
        />
      </Flex>
      <Flex mb={5} alignItems="center">
        <Titles title="Comments on your posts" />
        <Spacer />
        <Switch
          size="lg"
          isChecked={comments}
          onChange={handleCommentsChange}
          data-testid="comments-switch"
        />
      </Flex>
      <Flex mb={5} alignItems="center">
        <Titles title="Upvotes on your posts" />
        <Spacer />
        <Switch
          size="lg"
          isChecked={upvotesPosts}
          onChange={handleUpvotesPostsChange}
          data-testid="upvotesPosts-switch"
        />
      </Flex>
      <Flex mb={5} alignItems="center">
        <Titles title="Upvotes on your comments" />
        <Spacer />
        <Switch
          size="lg"
          isChecked={upvotesComments}
          onChange={handleUpvotesCommentsChange}
          data-testid="upvotesComments-switch"
        />
      </Flex>
      <Flex mb={5} alignItems="center">
        <Titles title="Replies to your comments" />
        <Spacer />
        <Switch
          size="lg"
          isChecked={replies}
          onChange={handleRepliesChange}
          data-testid="replies-switch"
        />
      </Flex>
      <Flex mb={5} alignItems="center">
        <Titles title="New followers" />
        <Spacer />
        <Switch
          size="lg"
          isChecked={newFollowers}
          onChange={handleNewFollowersChange}
          data-testid="newFollowers-switch"
        />
      </Flex>
      <Flex mb={5} alignItems="center">
        <Titles title="Posts you follow" />
        <Spacer />
        <Switch
          size="lg"
          isChecked={postsYouFollow}
          onChange={handlePostsFollowChange}
          data-testid="postsYouFollow-switch"
        />
      </Flex>
    </>
  );
}

export default Activity;
