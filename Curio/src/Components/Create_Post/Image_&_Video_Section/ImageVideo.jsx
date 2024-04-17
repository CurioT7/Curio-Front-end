import React, { useState, useRef } from 'react';
import "./ImageVideo.css";
import { Button } from '@chakra-ui/react';

function ImageVideo() {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (selectedFile.type.includes('image')) {
        setFile(URL.createObjectURL(selectedFile));
      } else if (selectedFile.type.includes('video')) {
        setFile(selectedFile);
      }
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className='image-video-container'>
      <div className='file-input-container'>
        <div className='upload-container'>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            className='file-input'
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <div className='upload-button-container'>
            {file ? (
              <>
                {file.type.includes('video') ? (
                  <video className="uploaded-video" controls>
                    <source src={URL.createObjectURL(file)} type={file.type} />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img src={file} alt="Uploaded File" className="uploaded-image" />
                )}
              </>
            ) : (
              <p className='upload-text'>
                Drag and drop image or 
                <Button
                  className="upload-button"
                  variant='outline'
                  colorScheme='blue'
                  style={{
                    borderRadius: '9999px',
                    display: 'inline-block',
                    margin: '10px 8px',
                    lineHeight: '18px',
                    position: 'relative',
                    boxSizing: 'border-box',
                    fontFamily: 'Noto Sans, Arial, sans-serif',
                    fontSize: '14px',
                  }}
                  onClick={handleButtonClick}
                >
                  Upload
                </Button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageVideo;

