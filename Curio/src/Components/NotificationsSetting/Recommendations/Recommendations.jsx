import React, { useState } from 'react';
import { Box, Heading } from "@chakra-ui/react";

function Recommendations() {
    const [isChecked, setIsChecked] = useState(true);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <Box className="new-followers d-flex flex-wrap mb-3">
            <Box className="trending-posts">
                <label htmlFor="trending-posts-checkbox">
                    <Heading as="h3" className="headings-settings d-flex fw-500 mb-1">
                        Trending posts
                    </Heading>
                </label>
            </Box>
            <Box className="trending-posts-checkbox">
                <div className="form-check form-switch">
                    <input 
                        className="form-check-input" 
                        type="checkbox" 
                        id="flexSwitchCheckDefault"
                        checked={isChecked} // Use isChecked for default state
                        onChange={handleCheckboxChange} // Handle checkbox change
                    />
                </div>
            </Box>
        </Box>
    );
}
export default Recommendations;
