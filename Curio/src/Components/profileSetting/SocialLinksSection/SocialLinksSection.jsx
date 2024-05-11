/**
 * Component for displaying social links section.
 * @param {Object[]} SocialLinks - The array of social links.
 * @module SocialLinksSection
 */
import { Box, Text, Spacer } from '@chakra-ui/react';
import Socialmodal from '../Socialmodal/Socialmodal';

function SocialLinksSection({ SocialLinks }) {
  const buttonStyle = {
    borderRadius: "30px",
    padding: "10px 15px", 
  };

  return (
    <Box className="social-links-section">
      <Box className="social-links">
        <h3 className="headings-settings d-flex fw-500 mb-1">Social links (5 max)</h3>
        <Text className="headings-description fw-normal text-muted">People who visit your profile will see your social links.</Text>
      </Box>
      <Box className="social-links-nav">
        <nav aria-label="Social Links">
          <ul className='list-unstyled d-flex flex-wrap gap-2'>
            <li className='social-link d-flex align-items-center rounded-pill px-3 py-2'>
              <Spacer />
              <div style={{display:'flex', flexWrap:'wrap', gap:'0.5em'}}>
                <Socialmodal buttonStyle={buttonStyle} SocialLinks={SocialLinks} validate={'withCancel'}/>
              </div>
            </li>
          </ul>
        </nav>
      </Box>
    </Box>
  );
}

export default SocialLinksSection;
