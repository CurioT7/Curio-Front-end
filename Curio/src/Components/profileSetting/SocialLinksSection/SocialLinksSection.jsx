import { Box, Heading, Text, Link } from '@chakra-ui/react';

function SocialLinksSection() {
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
              <Link>
                <i className="fa-solid fa-plus me-2"></i>Add social link
              </Link>
            </li>
          </ul>
        </nav>
      </Box>
    </Box>
  );
}

export default SocialLinksSection;
