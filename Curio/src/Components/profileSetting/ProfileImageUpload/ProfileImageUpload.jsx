import { Box, Text } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import "./ProfileImageUpload.css";

const serverHost = import.meta.env.VITE_SERVER_HOST;

function ProfileImageUpload() {
  const [profileImage, setProfileImage] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get(`${serverHost}/api/settings/v1/me/prefs`, {
        headers: {
          'authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setProfileImage(response.data.profileImage);
      setBannerImage(response.data.bannerImage);
    } catch (error) {
      if (error.response) {
        // Handle error response here
        const status = error.response.status;
        if (status === 500) {
          console.error("500 Internal Server Error: An unexpected error occurred on the server. Please try again later.");
        } else {
          console.error("Error fetching data from backend:", error.response.data);
        }
      } else {
        console.error('Error fetching data from backend:', error.message);
      }
    }
  };

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(file); // Store the file object, not the base64 data
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleBannerImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setBannerImage(file); // Store the file object, not the base64 data
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, setImage) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(file);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };


  const uploadImages = async () => {
    const formData = new FormData();
    if (profileImage) {
      formData.append('images', profileImage);
    }
    if (bannerImage) {
      formData.append('images', bannerImage);
    }

    try {
      const response = await axios.patch(`${serverHost}/api/settings/v1/me/prefs`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      switch (response.status) {
        case 200:
          console.log("User preferences updated successfully");
          break;
        case 404:
          console.log("User preferences not found");
          break;
        default:
          console.log("Unexpected response status:", response.status);
          break;
      }
      // Handle successful upload
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        if (status === 500) {
          console.log("500 Internal Server Error: An unexpected error occurred on the server. Please try again later.");
        } else {
          console.error("Error sending data to backend:", error.response.data);
        }
      } else {
        console.error('Error sending data to backend:', error.message);
      }
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} encType="multipart/form-data" style={{ width: 650 }}>
      <Box className="profile-banner-images mb-3" data-testid="profile-banner-images">
        <h3 className="headings-settings" fontWeight="500" mb="1">
          Profile and banner image
        </h3>
        <Text className="headings-description" fontWeight="normal" color="gray.500">
          Images must be .png or .jpg format
        </Text>
        <Box className="image-upload-container" mt="3" mb="4">
          <Box className="row-images">
            <Box className="column-profile-image" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, setProfileImage)}>
              <Box className="upload-profile-image h-100 ms-3 me-0 card text-center" data-testid="profile-image" style={{ backgroundImage: `url(${profileImage ? URL.createObjectURL(profileImage) : ''})`}}>
                <label htmlFor="profile-upload">
                  <Box className='upload-profile'>
                    {profileImage ? <i className="fa fa-camera upload-image-icon-appear" aria-hidden="true"/> : <i className="fa fa-plus upload-image-icon" aria-hidden="true"/>}
                  </Box>
                  <Box className='image-text'>
                    {profileImage ? "" : <span>Drag and Drop or Upload <span aria-label="Profile Image" style={{fontWeight:"700"}}>Profile</span> Image</span>}
                  </Box>
                  <Box className='upload-file-profile'>
                    <input type="file" role='img' name="profileIcon" id="profile-upload" accept="image/x-png,image/jpg" onChange={handleProfileImageChange} style={{ display: 'none' }} />
                  </Box>
                </label>
              </Box>
            </Box>
            <Box className="column-banner-image" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, setBannerImage)}>
              <Box className="banner-upload  ms-3 me-0 card text-center" style={{ backgroundImage: `url(${bannerImage ? URL.createObjectURL(bannerImage) : ''})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <label htmlFor="banner-upload">
                  <Box className='upload-profile'>
                    {bannerImage  ? <i className="fa fa-camera upload-image-icon-appear" aria-hidden="true"/> : <i className="fa fa-plus upload-image-icon" aria-hidden="true"/>}
                  </Box>
                  <Box className='image-text'>
                    {bannerImage  ? '' : <span>Drag and Drop or Upload <span aria-label="Banner Image" style={{fontWeight:"700"}}>Banner</span> Image</span>}
                  </Box>
                  <Box className='upload-file-profile'>
                    <input type="file" name="profileBanner" id="banner-upload" accept="image/x-png,image/jpg" onChange={handleBannerImageChange} style={{ display: 'none' }} />
                  </Box>
                </label>
              </Box>
            </Box>
          </Box>
        </Box>
        <button type="button" onClick={uploadImages}>Upload Images</button> {/* Button to trigger image upload */}
      </Box>
    </form>
  );
}

export default ProfileImageUpload;
