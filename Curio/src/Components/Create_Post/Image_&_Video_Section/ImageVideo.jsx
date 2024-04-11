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
            <Button 
            className="upload-button" 
            variant='outline' 
            colorScheme='blue'
            style={{borderRadius: '9999px',
              display: 'inline-block',
              margin: '10px 8px',
              lineHeight: '18px',
              position: 'relative',
              boxSizing: 'border-box',
              fontFamily: 'Noto Sans, Arial, sans-serif',
              fontSize: '14px',
            }} 
            >Upload</Button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageVideo;
