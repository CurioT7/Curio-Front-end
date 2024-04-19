import React, { useState, useRef } from 'react';
import "./ImageVideo.css";
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, useDisclosure } from '@chakra-ui/react';
import axios from 'axios';

const serverHost = import.meta.env.VITE_SERVER_HOST;

function ImageVideo() {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (selectedFile.type && selectedFile.type.includes('image')) {
        // Create a FormData object
        const formData = new FormData();
        formData.append('media', selectedFile);
        try {
          // Make a POST request to the backend
          const response = await axios.post(`${serverHost}/api/submit`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          console.log('File uploaded successfully:', response.data);
        } catch (error) {
          console.error('Error uploading file:', error);
        }
        setFile({ type: 'image', url: URL.createObjectURL(selectedFile) });
      } else if (selectedFile.type && selectedFile.type.includes('video')) {
        setFile({ type: 'video', file: selectedFile });
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
                {file.type === 'video' ? (
                  <video className="uploaded-video" controls>
                    <source src={URL.createObjectURL(file.file)} type={file.file.type} />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img src={file.url} alt="Uploaded File" className="uploaded-image" />
                )}
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
          <ModalHeader>Remove {file && file.type === 'image' ? 'image' : 'video'}?</ModalHeader>
          <ModalBody>
            Are you sure you want to remove your {file && file.type === 'image' ? 'image' : 'video'}?
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
