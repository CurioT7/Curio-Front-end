import { Box, Heading, Text, Flex, Spacer, Link } from '@chakra-ui/react';
import Socialmodal from '../Socialmodal/Socialmodal';

function SocialLinksSection() {
  const buttonStyle ={
    borderRadius: "30px", padding: "10px 20px", 
}
  return (
    <Box className="social-links-section">
      <Box className="social-links">
        <Heading as="h3" className="headings-settings d-flex fw-500 mb-1">Social links (5 max)</Heading>
        <Text className="headings-description fw-normal text-muted">People who visit your profile will see your social links.</Text>
      </Box>
      <Box className="social-links-nav">
        <nav aria-label="Social Links">
          <ul className='list-unstyled d-flex flex-wrap gap-2'>
            <li className='social-link d-flex align-items-center bg-light rounded-pill px-3 py-2'>
              <Spacer />
              <Socialmodal buttonStyle={buttonStyle}/>
            </li>
          </ul>
        </nav>
      </Box>
    </Box>
  );
}

export default SocialLinksSection;
