/**
 * Component for uploading profile and banner images.
 * @param {string} message - The message to be displayed in the toast.
 * @param {string} info - The status color of the toast.
 * @param {Object} event - The event object.
 * @param {Object} event - The event object.
 * @param {Function} setImage - The function to set the image.
 * @module ProfileImageUpload
 */
import { Box, Text, useToast } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import "./ProfileImageUpload.css";

const serverHost = import.meta.env.VITE_SERVER_HOST;

function ProfileImageUpload() {
  const [profileImage, setProfileImage] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);
  const [checkImageBanner, setCheckImageBanner] = useState(false);
  const [checkImageProfile, setCheckImageProfile] = useState(false);
  const toast = useToast();

  /**
   * Displays a toast notification.
   */
  function Toast(message, info) {
    toast({
      description: message,
      status: info,
      duration: 3000,
      isClosable: true,
    })
  }

  useEffect(() => {
    fetchImages();
  }, []);

  /**
   * Fetches profile and banner images from the backend.
   */
  const fetchImages = async () => {
    try {
      const response = await axios.get(`${serverHost}/api/settings/v1/me/prefs`, {
        headers: {
          'authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setBannerImage(response.data.banner);
      localStorage.setItem('bannerImage', response.data.banner);
      setProfileImage(response.data.profilePicture);
      localStorage.setItem('profileImage', response.data.profilePicture);

    } catch (error) {
      if (error.response) {
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

  /**
   * Handles profile image change event.
   */
  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    setProfileImage(file);
    setCheckImageProfile(true);
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  /**
   * Handles banner image change event.
   */
  const handleBannerImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    setBannerImage(file);
    setCheckImageBanner(true);
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  /**
   * Handles drag over event.
   */
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  /**
   * Handles drop event.
   */
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

  useEffect(() => {
    if (checkImageProfile || checkImageBanner) {
      uploadImages();
    }
  }, [checkImageProfile, checkImageBanner]);


  /**
   * Uploads profile and banner images to the backend.
   */
  const uploadImages = async () => {
    const formData = new FormData();
    if (checkImageProfile) {
      formData.append('profilePicture', 'Update');
      formData.append('media', profileImage);
    }

    if (checkImageBanner) {
      formData.append('banner', 'Update');
      formData.append('media', bannerImage);
    }

    try {
      const response = await axios.patch(
        `${serverHost}/api/settings/v1/me/prefs`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      switch (response.status) {
        case 200:
          Toast('Changes Saved', 'success');
          if (checkImageBanner) {
            localStorage.setItem('bannerImage', response.data.banner);
            const file = bannerImage;
            const reader = new FileReader();
            reader.onloadend = () => {
              setBannerImage(reader.result);
              setCheckImageBanner(false);
            };
            reader.readAsDataURL(file);
          }
          if (checkImageProfile) {
            localStorage.setItem('profileImage', response.data.profilePicture);
            const file = profileImage;
            const reader = new FileReader();
            reader.onloadend = () => {
              setProfileImage(reader.result);
              setCheckImageProfile(false);
            };
            reader.readAsDataURL(file);
            window.dispatchEvent(new Event('prefsChanged'));
          }
          break;
        case 404:
          Toast('User preferences not found', 'error');
          break;
        default:
          console.error('Unexpected response status:', response.status);
          break;
      }
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        if (status === 500) {
          Toast(
            '500 Internal Server Error: An unexpected error occurred on the server. Please try again later.', 'error'
          );
        } else {
          console.error('Error sending data to backend:', error.response.data);
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
              <Box
                className="upload-profile-image h-100 ms-3 me-0 card text-center"
                data-testid="profile-image"
                style={{ backgroundImage: `url(${profileImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              >
                <label htmlFor="profile-upload">
                  <Box className='upload-profile'>
                    {profileImage ? <i className="fa fa-camera upload-image-icon-appear" aria-hidden="true" /> : <i className="fa fa-plus upload-image-icon" aria-hidden="true" />}
                  </Box>
                  <Box className='image-text'>
                    {profileImage ? "" : <span>Drag and Drop or Upload <span aria-label="Profile Image" style={{ fontWeight: "700" }}>Profile</span> Image</span>}
                  </Box>
                  <Box className='upload-file-profile'>
                    <input type="file" role='img' name="profileIcon" id="profile-upload" accept="image/x-png,image/jpg" onChange={handleProfileImageChange} style={{ display: 'none' }} />
                  </Box>
                </label>
              </Box>
            </Box>
            <Box className="column-banner-image" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, setBannerImage)}>
              <Box className="banner-upload  ms-3 me-0 card text-center" style={{ backgroundImage: `url(${bannerImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <label htmlFor="banner-upload">
                  <Box className='banner-upload-container'>
                    {bannerImage ? <i className="fa fa-camera upload-image-icon-appear" aria-hidden="true" /> : <i className="fa fa-plus upload-image-icon" aria-hidden="true" />}
                  </Box>
                  <Box className='image-text'>
                    {bannerImage ? '' : <span>Drag and Drop or Upload <span aria-label="Banner Image" style={{ fontWeight: "700" }}>Banner</span> Image</span>}
                  </Box>
                  <Box className='upload-file-profile'>
                    <input type="file" name="profileBanner" id="banner-upload" accept="image/x-png,image/jpg" onChange={handleBannerImageChange} style={{ display: 'none' }} />
                  </Box>
                </label>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </form>
  );
}

export default ProfileImageUpload;