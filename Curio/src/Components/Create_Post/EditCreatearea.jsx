import React, { useState, useEffect  } from "react";
import "./NewPostForm.css";
import { Button, Flex, Spacer, Checkbox } from '@chakra-ui/react';
import { AddIcon, CheckIcon } from '@chakra-ui/icons';
import "./EditCreatearea.css"

function EditCreatearea() {
    const [ocClicked, setOcClicked] = useState(false);
    const [spoilerClicked, setSpoilerClicked] = useState(false);
    const [nsfwClicked, setNsfwClicked] = useState(false);

    const handleOcClick = () => {
        setOcClicked(!ocClicked);
    };

    const handleSpoilerClick = () => {
        setSpoilerClicked(!spoilerClicked);
    };

    const handleNsfwClick = () => {
        setNsfwClicked(!nsfwClicked);
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
            }}>
                OC
            </Button>
            <Button
            className='rest-button' 
            variant='ghost' 
            leftIcon={spoilerClicked ? <CheckIcon /> : <AddIcon />}
            onClick={handleSpoilerClick}
            style={{
                color: spoilerClicked  ? 'rgb(255, 255, 255)' : '',
                fill: spoilerClicked  ? 'rgb(255, 255, 255)' : '',
                backgroundColor: spoilerClicked  ? 'rgb(0, 0, 0)' : '',
                borderColor: spoilerClicked  ? 'transparent' : ''
            }}>
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
            }}>
                NSFW
            </Button>
            </div>
            <hr className='hr-edit-post' />
            <Flex className='save-buttons' minWidth='max-content' alignItems='center' gap='2'>
                <Spacer />
                <Button className="post-button" variant='outline' colorScheme='blue'>Post</Button>
            </Flex>
        </div>
        <div className='reply_notifications'>
            <Checkbox  value='reply_notifications' size='md'>Send me post reply notifications</Checkbox>
            <div className='container-share-account'><a className='share-account' href="#">
                Connect accounts to share your post
                </a>
                <i class="fa fa-info-circle" aria-hidden="true"/>
            </div>
        </div>
    </div>
  );
}

export default EditCreatearea;
