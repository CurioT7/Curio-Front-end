import {Box, Flex, Spacer, Switch} from '@chakra-ui/react'
import "./AccountSettings.css"
import Google from './buttons/Google'
import Titles from '../feedSettings/childs/Titles'
import Disconnect from './buttons/Disconnect'
import GeneratePass from './buttons/GeneratePass'
const ConnectedAccounts =(props) =>{
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
                {props.findPass===true && props.isConnected?(<Disconnect buttonStyle={buttonStyle}></Disconnect>):null}
                {props.findPass===true && props.isConnected===false ?(<Google buttonStyle={buttonStyle} ></Google>):null}
                {props.findPass===false&&<GeneratePass title="Disconnect from Google" context="To disconnect your Google account" isEmail={false} isDelete={false} isGoogle={true} email={props.email} username={props.username}/>}
                </Box>

            </Flex>

        </Box>
    )
}

export default ConnectedAccounts;