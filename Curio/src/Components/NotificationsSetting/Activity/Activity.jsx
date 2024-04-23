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
        />
      </Flex>
      <Flex mb={5} alignItems="center">
        <Titles title="Comments on your posts" />
        <Spacer />
        <Switch
          size="lg"
          isChecked={comments}
          onChange={handleCommentsChange}
        />
      </Flex>
      <Flex mb={5} alignItems="center">
        <Titles title="Upvotes on your posts" />
        <Spacer />
        <Switch
          size="lg"
          isChecked={upvotesPosts}
          onChange={handleUpvotesPostsChange}
        />
      </Flex>
      <Flex mb={5} alignItems="center">
        <Titles title="Upvotes on your comments" />
        <Spacer />
        <Switch
          size="lg"
          isChecked={upvotesComments}
          onChange={handleUpvotesCommentsChange}
        />
      </Flex>
      <Flex mb={5} alignItems="center">
        <Titles title="Replies to your comments" />
        <Spacer />
        <Switch
          size="lg"
          isChecked={replies}
          onChange={handleRepliesChange}
        />
      </Flex>
      <Flex mb={5} alignItems="center">
        <Titles title="New followers" />
        <Spacer />
        <Switch
          size="lg"
          isChecked={newFollowers}
          onChange={handleNewFollowersChange}
        />
      </Flex>
      <Flex mb={5} alignItems="center">
        <Titles title="Posts you follow" />
        <Spacer />
        <Switch
          size="lg"
          isChecked={postsYouFollow}
          onChange={handlePostsFollowChange}
        />
      </Flex>
    </>
  );
}

export default Activity;
