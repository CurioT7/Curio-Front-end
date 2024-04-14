import React from 'react';
import "./NewPostForm.css";
import { Button, Flex, Spacer, Checkbox } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import "./EditCreatearea.css"
import { set } from 'mongoose';
import { useState } from 'react';


function EditCreatearea() {
    const [isSpoiler,setSpoiler] = useState(false);
  return (
    <div className="EditCreatearea mt-3">
        <div>
            <div className='button-group-edit'>
            <Button 
            className='rest-button'
            variant='ghost' 
            leftIcon={<AddIcon />}>
                OC
            </Button>
            <Button
            className='rest-button' 
            variant='ghost' 
            leftIcon={<AddIcon />}
            onClick={() => setSpoiler(!isSpoiler)}
            style={{
                backgroundColor: isSpoiler ? 'black' : 'initial',
                color: isSpoiler ? 'white' : 'initial'
            }}
            >
            Spoiler
            </Button>
            <Button 
            className='rest-button'  
            variant='ghost' 
            leftIcon={<AddIcon />}>
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
