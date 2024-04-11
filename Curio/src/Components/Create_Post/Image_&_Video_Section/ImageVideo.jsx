import React from 'react';
import "./ImageVideo.css";
import { Button } from '@chakra-ui/react';


function ImageVideo() {
  // Your component logic here
  return (
    <div className='image-video-container'>
      <div className='file-input-container'>
        <div className='upload-container'>
          <input type="file" accept="image/png,image/gif,image/jpeg,image/webp,video/mp4,video/quicktime" className='file-input' />
          <div className='upload-button-container'>
            <p className='upload-text'>Drag and drop image or  
            <Button className="upload-button" variant='outline' colorScheme='blue'>Upload</Button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageVideo;
