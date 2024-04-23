import React, { useState } from "react";
import "./NewPostForm.css";
import { Button, Flex, Spacer, Checkbox } from "@chakra-ui/react";
import { AddIcon, CheckIcon } from "@chakra-ui/icons";
import "./EditCreatearea.css";
import axios from "axios";

const serverHost = import.meta.env.VITE_SERVER_HOST;

function EditCreatearea({ title, content, community, days, options, imageFormData, selectedMethod }) {
  const [ocClicked, setOcClicked] = useState(false);
  const [spoilerClicked, setSpoilerClicked] = useState(false);
  const [nsfwClicked, setNsfwClicked] = useState(false);

  const handleOcClick = () => {
    setOcClicked(!ocClicked);
  };

  const handleSpoilerClick = () => {
    if (community && community.community) {
      setSpoilerClicked(!spoilerClicked);
    }
  };  

  const handleNsfwClick = () => {
    setNsfwClicked(!nsfwClicked);
  };

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

  const optionsString = handleTurnToSting(options);

  const handleSubmit = async () => {
    try {
      const postData = {
        title: title, 
        content: content,
        subreddit: community.community && community.community,
        isOC: ocClicked,
        isSpoiler: spoilerClicked,
        isNSFW: nsfwClicked,
        voteLength: days,
        options: optionsString,
        selectedMethod: selectedMethod
      };

      // If imageFormData is available, append it to postData
      if (imageFormData) {
        postData.image = imageFormData;
      }

      const response = await axios.post(
        `${serverHost}/api/submit`,
        postData,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Handle different response status codes
      switch (response.status) {
        case 201:
          console.log("Post created successfully");
          break;
        case 401:
          console.log("Unauthorized: Authentication token is missing or invalid");
          break;
        case 404:
          console.log("User not found");
          break;
        case 400:
          console.log("Invalid destination");
          break;
        case 500:
          console.log("Internal server error");
          break;
        default:
          console.log("Unexpected response status:", response.status);
          break;
      }
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        switch (status) {
          case 401:
            console.log("Unauthorized: Authentication token is missing or invalid");
            break;
          case 404:
            console.log("User not found");
            break;
          case 400:
            console.log("Invalid destination");
            break;
          case 500:
            console.log("Internal server error");
            break;
          default:
            console.log("Unexpected error:", error.response.data);
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
          <Button 
            className='rest-button' 
            variant='ghost' 
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
        <hr className='hr-edit-post' />
        <Flex className='save-buttons' minWidth='max-content' alignItems='center' gap='2'>
          <Spacer />
          <Button className="post-button" variant='outline' colorScheme='blue' onClick={handleSubmit}>Post</Button>
        </Flex>
      </div>
      <div className='reply_notifications'>
        <Checkbox  value='reply_notifications' size='md'>Send me post reply notifications</Checkbox>
        <div className='container-share-account'>
          <a className='share-account' href="#">
            Connect accounts to share your post
          </a>
          <i class="fa fa-info-circle" aria-hidden="true"/>
        </div>
      </div>
    </div>
  );
}

export default EditCreatearea;