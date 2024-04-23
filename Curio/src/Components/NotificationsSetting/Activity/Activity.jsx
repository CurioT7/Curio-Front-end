import React, { useState, useEffect } from "react";
import { Flex, Switch, Spacer, useToast } from "@chakra-ui/react";
import axios from "axios";
import Titles from "../../feedSettings/childs/Titles";
import { sendUserDataToBackend,fetchUserDataFromBackend } from '../../UserSetting/UserSettingsEndPoints';

const serverHost = import.meta.env.VITE_SERVER_HOST;

function Activity() {
  const toast = useToast();
  const [mentions, setMentionChecked] = useState(true);
  const [comments, setCommentsChecked] = useState(true);
  const [upvotesPosts, setUpvotesPostsChecked] = useState(true);
  const [upvotesComments, setUpvotesCommentsChecked] = useState(true);
  const [replies, setRepliesChecked] = useState(true);
  const [newFollowers, setNewFollowersChecked] = useState(true);
  const [postsYouFollow, setPostsFollowChecked] = useState(true);

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

  async function fetchDataFromBackend() {
    try {
      const response = await axios.get(
        `${serverHost}/api/settings/v1/me/prefs`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      switch (response.status) {
        case 404:
          console.log("User preferences not found");
          break;
        default:
          console.log("Unexpected response status:", response.status);
          break;
      }
      return response.data;
    } catch (error) {
      if (error.response) {
        // Handle error response here
        const status = error.response.status;
        if (status === 500) {
          console.log("500 Internal Server Error: An unexpected error occurred on the server. Please try again later.");
        } else {
          console.error("Error fetching data from backend:", error.response.data);
        }
      } else {
        console.error('Error fetching data from backend:', error.message);
      }
    }
  }

  useEffect(() => {
    async function fetchAndSetData() {
        const data = await fetchDataFromBackend();
        if (data) {
          setMentionChecked(data.mentions);
          setCommentsChecked(data.comments);
          setUpvotesPostsChecked(data.upvotesPosts);
          setUpvotesCommentsChecked(data.upvotesComments);
          setRepliesChecked(data.replies);
          setNewFollowersChecked(data.newFollowers);
          setPostsFollowChecked(data.postsYouFollow);
        }
      } 

    fetchAndSetData();
  }, []);

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
