import {Box, Flex, Spacer, Switch} from '@chakra-ui/react'
import 'G:/university/Senior 1/Spring/Software/Project/Code/Front End/Curio-Front-end/Curio/src/Components/style/userSettingsStyle.css'
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
            <Flex flexDirection='column' mb={5}>
                <Titles title='Connect to Twitter' description='Connect a Twitter account to enable the choice to tweet your new posts and display a link on your profile. We will never post to Twitter without your permission.'/>
                
                <Box display='flex' justifyContent='flex-end' mb={10}>
                    <Twitter buttonStyle={buttonStyle} ></Twitter>
                </Box>
                <Box >
                    <Flex ms={10}>
                        <Titles title='Show link on profile' description='You can show a link to your Twitter account on your profile'/>
                        <Spacer/>
                        <Switch disabled={true} size='lg'/>
            
                    </Flex>
                </Box>

            </Flex>
            <Flex display='flex' alignItems='center'  mb={5}>
                
                <Box>
                 <Titles title='Connect to Apple' description='Connect account to log in to Reddit with Apple'/>
                </Box>
                <Spacer/>
                <Box >
                <Apple buttonStyle={buttonStyle} ></Apple>
                </Box>

            </Flex>
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