import {Box, Flex, Spacer, Switch} from '@chakra-ui/react'
import "./AccountSettings.css"
import Twitter from './buttons/Twitter'
import Google from './buttons/Google'
import Apple from './buttons/Apple'
import Titles from '../feedSettings/childs/Titles'
const ConnectedAccounts =() =>{
    const buttonStyle ={
        borderRadius: "30px", padding: "10px 20px",width:"180px", height:"35px",
    }
    return(
        <Box>
            <Flex display='flex' alignItems='center'  mb={5}>
                <Box>
                    <Titles title='Connect to Google' description='Connect account to log in to Reddit with Google'/>
                    
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