import { BsShield } from "react-icons/bs";
import { PiLockSimpleFill } from "react-icons/pi";
import { PiLockSimple } from "react-icons/pi";
import { Button, Text } from '@chakra-ui/react';
import { SendLockedPost,SendUnlockedPost,FetchPostLockStatus } from './PostEndPoints.js';
import { useToast } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
  } from '@chakra-ui/react'

import './Post.css'
import { set } from "mongoose";

function PostLock(props){

    const [isLocked, setIsLocked] =  useState(false);
    const toast = useToast();
    const Toast = (message,statues) => {
        toast({
            description: message,
            status: statues,
            duration: 3000,
            isClosable: true,
        });
    }

    setTimeout(async () => {
        setIsLocked(props.isLocked);
    },0)
    

    const handleLockComments = async () => {
       
        const response = await SendLockedPost(props.id);
        if(response.success){
            setIsLocked(true);
            props.onChangeLock(true);
            
            Toast("Post locked successfully","success");
        }
        else{
            Toast("Something went wrong, please try again later.","error");
        }

    }
    const handleUnlockComments = async () => {
        
        const response = await SendUnlockedPost(props.id);
        if(response.success){
            
            setIsLocked(false);
            props.onChangeLock(false);
            Toast("Post unlocked successfully","success");
        }
        else{
            Toast("Something went wrong, please try again later.","error");
        }
    }

    return(
        <Popover>
            <PopoverTrigger>
                <Button
                    variant='ghost'
                    colorScheme='gray'
                    className='moderator-icon'
                    
                ><BsShield /></Button>
            </PopoverTrigger>
            <PopoverContent margin={0} padding={0}>
                <PopoverBody margin={0} padding={0}>
                {isLocked?(<Text onClick={handleUnlockComments} margin={0} padding={3} className='moderator-content'><div><PiLockSimpleFill className='moderator-content-icon' /><span>Unlock Comments</span></div></Text>) :(<Text onClick={handleLockComments} margin={0} padding={3} className='moderator-content'> <div> <PiLockSimple className='moderator-content-icon'  /> <span>Lock comments</span></div></Text>)}
                    
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )

    
}

export default PostLock;