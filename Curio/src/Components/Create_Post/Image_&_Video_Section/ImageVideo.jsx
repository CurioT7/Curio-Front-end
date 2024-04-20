// ImageVideo.jsx

import React, { useState, useRef } from 'react';
import "./ImageVideo.css";
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, useDisclosure } from '@chakra-ui/react';

const serverHost = import.meta.env.VITE_SERVER_HOST;

function ImageVideo({ onImageUpload }) {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (selectedFile.type && selectedFile.type.includes('image')) {
        setFile({ type: 'image', file: selectedFile }); // Set the image file
        handleUpload();
      } else if (selectedFile.type && selectedFile.type.includes('video')) {
        // Handle video upload separately if needed
      } else {
        console.error('Unsupported file type');
      }
    }
  };

  const handleDelete = () => {
    onClose();
    setFile(null);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('media', file.file);

      // Pass image data to the parent component
      onImageUpload(formData);

      // Clear file state
      setFile(null);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
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
              <div className="uploaded-content">
                <img src={URL.createObjectURL(file.file)} alt="Uploaded File" className="uploaded-image" />
                <div className="delete-button-container">
                  <button role="button" tabIndex="-1" aria-label="Remove" className='delete-button' onClick={onOpen}>
                    <i className="fa-solid fa-trash"/>
                  </button>
                </div>
              </div>
            ) : (
              <p className='upload-text'>
                Drag and drop images or videos 
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Remove image?</ModalHeader>
          <ModalBody>
            Are you sure you want to remove your image?
          </ModalBody>
          <ModalFooter>
            <Button 
            variant='outline'
            colorScheme='blue'
            mr={3} 
            onClick={onClose}
            style={{
              borderRadius: '9999px',
            }}>
              Keep
            </Button>
            <Button 
            colorScheme='blue'
            onClick={handleDelete}
            style={{
              borderRadius: '9999px',
            }}>
              Remove
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default ImageVideo;
