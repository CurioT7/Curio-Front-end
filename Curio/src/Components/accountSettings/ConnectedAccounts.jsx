import {Box, Flex, Spacer} from '@chakra-ui/react'
import "./AccountSettings.css" 
import Twitter from './buttons/Twitter'
import Google from './buttons/Google'
import Apple from './buttons/Apple'
const ConnectedAccounts =() =>{
    const buttonStyle ={
        borderRadius: "30px", padding: "10px 20px",width:"180px", height:"35px",
    }
    return(
        <Box>
            <Flex flexDirection='column' mb={5}>
                <Box>
                    <h3 className="headings-settings d-flex fw-500 mb-1">Connect to Twitter</h3>
                    <p className="headings-description fw-normal text-muted">Connect a Twitter account to enable the choice to tweet your new posts and display a link on your profile. We will never post to Twitter without your permission.</p>
                </Box>
                <Box display='flex' justifyContent='flex-end'>
                <Twitter buttonStyle={buttonStyle} ></Twitter>
                </Box>

            </Flex>
            <Flex display='flex' alignItems='center'  mb={5}>
                <Box>
                    <h3 className="headings-settings d-flex fw-500 mb-1">Connect to Apple</h3>
                    <p className="headings-description fw-normal text-muted">Connect account to log in to Reddit with Apple</p>
                </Box>
                <Spacer/>
                <Box >
                <Apple buttonStyle={buttonStyle} ></Apple>
                </Box>

            </Flex>
            <Flex display='flex' alignItems='center'  mb={5}>
                <Box>
                    <h3 className="headings-settings d-flex fw-500 mb-1">Connect to Google</h3>
                    <p className="headings-description fw-normal text-muted">Connect account to log in to Reddit with Google</p>
                </Box>
                <Spacer/>
                <Box >
                <Google buttonStyle={buttonStyle} ></Google>
                </Box>

            </Flex>
        </Box>
    )
}

export default ConnectedAccounts;