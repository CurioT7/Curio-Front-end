import React, { useState } from "react";
import "./NewPostForm.css";
import { Button, Flex, Spacer, Checkbox, useToast } from "@chakra-ui/react";
import { AddIcon, CheckIcon } from "@chakra-ui/icons";
import "./EditCreateArea.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const serverHost = import.meta.env.VITE_SERVER_HOST;

// Function component for editing and creating posts
function EditCreateArea({ title, content, community, days, options, imageFormData, selectedMethod }) {
  const username = localStorage.getItem('username');
  const [ocClicked, setOcClicked] = useState(false);
  const [spoilerClicked, setSpoilerClicked] = useState(false);
  const [nsfwClicked, setNsfwClicked] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  // Function to display a toast message
  function Toast(message, state) {
    toast({
      description: message,
      status: state,
      duration: 3000,
      isClosable: true,
    })
  }

  // Function to handle OC click
  const handleOcClick = () => {
    setOcClicked(!ocClicked);
  };

  // Function to handle Spoiler click
  const handleSpoilerClick = () => {
    if (community && community.community) {
      setSpoilerClicked(!spoilerClicked);
    }
  };

  // Function to handle NSFW click
  const handleNsfwClick = () => {
    setNsfwClicked(!nsfwClicked);
  };

  // Function to convert options array to string
  const handleTurnToSting = (options) => {
    let string = "";
    for (let i = 0; i < options.length; i++) {
      string += options[i];
      if (i < options.length - 1) {
        string += ",";
      }
    }
    return string;
  }

  // Function to handle form submission
  const handleSubmit = async () => {
    try {
      let optionsString; // Initialize optionsString
      if (selectedMethod === 'poll') {
        // If selectedMethod is 'poll', generate optionsString
        optionsString = handleTurnToSting(options);
      }

      // Initialize subreddit to null
      let subreddit = null;

      if (community.community !== username) {
        subreddit = community.community;
      }
      const postData = {
        title: title,
        content: content,
        subreddit: subreddit,
        isOC: ocClicked,
        isSpoiler: spoilerClicked,
        isNSFW: nsfwClicked,
        voteLength: days,
        options: optionsString,
        type: selectedMethod
      };

      if (imageFormData) {
        // Create a new FormData object
        const formData = new FormData();
        formData.append('media', imageFormData.get('media'));

        // Merge formData with postData
        for (let [key, value] of formData.entries()) {
          postData[key] = value;
      }
      }
      const response = await axios.post(
        `${serverHost}/api/submit`,
        postData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      switch (response.status) {
        case 201:
          Toast('Post created successfully', 'success');
          const postId = response.data.postId;
          navigate(`/post/post-details/${postId}`);
          break;
        default:
          console.error("Unexpected response status:", response.status);
          break;
      }
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        switch (status) {
          case 401:
            Toast('Unauthorized: Authentication token is missing or invalid', 'error');
            break;
          case 404:
            Toast('User not found', 'error');
            break;
          case 400:
            Toast('Invalid destination', 'error');
            break;
          case 500:
            Toast('Internal server error', 'error');
            break;
          default:
            console.error("Unexpected response status:", response.status);
            break;
        }
      } else {
        console.error("Error:", error.message);
      }
    }
  }; 

  return (
    <div className="EditCreatearea">
      <div>
        <div className='button-group-edit'>
          {/* Button for OC */}
          <Button
            className='rest-button'
            variant='ghost'
            leftIcon={ocClicked ? <CheckIcon /> : <AddIcon />}
            onClick={handleOcClick}
            style={{
              color: ocClicked ? 'rgb(255, 255, 255)' : '',
              fill: ocClicked ? 'rgb(255, 255, 255)' : '',
              backgroundColor: ocClicked ? 'rgb(255, 69, 0)' : '',
              borderColor: ocClicked ? 'transparent' : ''
            }}
          >
            OC
          </Button>
          {/* Button for Spoiler */}
          <Button 
            className='rest-button' 
            leftIcon={spoilerClicked ? <CheckIcon /> : <AddIcon />}
            onClick={handleSpoilerClick}
            disabled={!community || !community.community}
            style={{
              color: spoilerClicked ? 'rgb(255, 255, 255)' : '',
              fill: spoilerClicked ? 'rgb(255, 255, 255)' : '',
              backgroundColor: spoilerClicked ? 'rgb(0, 0, 0)' : '',
              borderColor: spoilerClicked ? 'transparent' : '',
              cursor: !community || !community.community ? 'not-allowed' : 'pointer',
              background: !community || !community.community ? '#cccccc' : '',
            }}
          >
            Spoiler
          </Button>
          {/* Button for NSFW */}
          <Button
            className='rest-button'
            variant='ghost'
            leftIcon={nsfwClicked ? <CheckIcon /> : <AddIcon />}
            onClick={handleNsfwClick}
            style={{
              color: nsfwClicked ? 'rgb(255, 255, 255)' : '',
              fill: nsfwClicked ? 'rgb(255, 255, 255)' : '',
              backgroundColor: nsfwClicked ? 'rgb(255, 88, 91)' : '',
              borderColor: nsfwClicked ? 'transparent' : ''
            }}
          >
            NSFW
          </Button>
        </div>
        {/* Save and post buttons */}
        <hr className='hr-edit-post' />
        <Flex className='save-buttons' minWidth='max-content' alignItems='center' gap='2'>
          <Spacer />
          <Button className="post-button" variant='outline' colorScheme='blue' onClick={handleSubmit}>Post</Button>
        </Flex>
      </div>
      {/* Checkbox for reply notifications */}
      <div className='reply_notifications'>
        <Checkbox value='reply_notifications' size='md'>Send me post reply notifications</Checkbox>
        {/* Container for connecting accounts */}
        <div className='container-share-account'>
          <a className='share-account' href="#">
            Connect accounts to share your post
          </a>
          <i class="fa fa-info-circle" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

export default EditCreateArea;