import { Box, Heading, Text } from "@chakra-ui/react";
import { useState } from "react";
import "./Privacy.css"

function Privacy() {
  const [searchResultsChecked, setSearchResultsChecked] = useState(true);
  const [personalizationChecked, setPersonalizationChecked] = useState(true);

  const handleSearchResultsChange = () => {
    setSearchResultsChecked(!searchResultsChecked);
  };

  const handlePersonalizationChange = () => {
    setPersonalizationChecked(!personalizationChecked);
  };

  return (
    <>
      <Box className="privacy d-flex flex-wrap mb-3">
        <Box className="search-results">
          <label htmlFor="search-results-checkbox">
            <h3 className="headings-settings d-flex fw-500 mb-1">
              Show up in search results
            </h3>
          </label>
          <Text className="headings-description fw-normal text-muted">
            Allow search engines like Google to link to your profile in their search results.
          </Text>
        </Box>
        <Box className="search-results-checkbox">
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="search-results-checkbox"
              checked={searchResultsChecked}
              onChange={handleSearchResultsChange}
            />
          </div>
        </Box>
      </Box>

      <Box className="reddit-personalization d-flex flex-wrap mb-3">
        <Box className="reddit-personalization">
          <label htmlFor="reddit-personalization-checkbox">
            <h3 className="headings-settings d-flex fw-500 mb-1">
              Personalize ads on Reddit based on information and activity from our partners.
            </h3>
          </label>
          <Text className="headings-description fw-normal text-muted">
            Allow us to use information from our partners to show you better ads on Reddit.
          </Text>
        </Box>
        <Box className="reddit-personalization-checkbox">
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="reddit-personalization-checkbox"
              checked={personalizationChecked}
              onChange={handlePersonalizationChange}
            />
          </div>
        </Box>
      </Box>
    </>
  );
}

export default Privacy;
