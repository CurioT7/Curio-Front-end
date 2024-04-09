import React from 'react';
import "./NewPostForm.css";
import { Button, ButtonGroup, Flex, Spacer, Checkbox } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import "./EditCreatearea.css"

function EditCreatearea() {
  return (
    <div>
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
            leftIcon={<AddIcon />}>
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
