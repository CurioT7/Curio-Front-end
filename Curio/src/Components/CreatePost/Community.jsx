import React from 'react';
import "./Community.css";
import { Input } from '@chakra-ui/react';


function Community() {
  return (
    <div class="outer-div">
        <div class="middle-div">
            <div class="inner-div">
                <span></span>
                <div class="input-container">
                    <Input variant='unstyled' placeholder='Choose a community' />
                </div>
                <div class="icon-container">
                    <i class="community-arrow fa-solid fa-angle-down"></i>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Community;
