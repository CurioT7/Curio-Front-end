import { Box, Heading, Text } from '@chakra-ui/react';
import { useState } from 'react';

function ProfileImageUpload() {
  const [profileImage, setProfileImage] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleBannerImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setBannerImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box className="profile-banner-images mb-3" data-testid="profile-banner-images">
      <h3 className="headings-settings" fontWeight="500" mb="1">
        Profile and banner image
      </h3>
      <Text className="headings-description" fontWeight="normal" color="gray.500">
        Images must be .png or .jpg format
      </Text>

      <Box className="image-upload-container" display="flex" flexDirection="column" alignItems="start" mt="3" mb="4">
        <Box className="row">
          <Box className="col">
            <Box className="upload-profile-image h-100 ms-3 me-0 card text-center" data-testid="profile-image" style={{ backgroundImage: `url(${profileImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
              <label htmlFor="profile-upload">
                <Box className='upload-icon-profile'>
                  <i className="fa-solid fa-upload"></i>
                </Box>
                <Box>
                  <span>Drag and Drop or Upload <span aria-label="Profile Image">Profile</span> Image</span>
                </Box>
                <Box className='upload-file-profile'>
                  <input type="file" role='img' name="profileIcon" id="profile-upload" accept="image/x-png,image/jpg" onChange={handleProfileImageChange} style={{ display: 'none' }} />
                </Box>
              </label>
            </Box>
          </Box>
          <Box className="col">
            <Box className="banner-upload h-100 ms-3 me-0 card text-center" style={{ backgroundImage: `url(${bannerImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
              <label htmlFor="banner-upload">
                <Box className='upload-icon-profile'>
                  <i className="fa-solid fa-upload"></i>
                </Box>
                <Box>
                  <span>Drag and Drop or Upload <span>Banner</span> Image</span>
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
  );
}

export default ProfileImageUpload;
