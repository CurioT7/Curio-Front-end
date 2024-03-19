import "./AccountSettings.css"
import { Flex, Spacer,Box, Center } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'
import React from "react"
import Titles from "../feedSettings/childs/Titles"
import ChangePass from "./buttons/ChangePass"
import EmailButton from "./buttons/EmailButton"

const AccountPreferences = () => {
    const [email, setEmail] = React.useState("example@gamil.com");
    const [gender, setGender] = React.useState("MAN")
    const [ip, setIP] = React.useState("Use approximate location (based on IP)")
    
    const buttonStyle ={
        borderRadius: "30px", padding: "10px 20px", 
    }
    
    const handleGender = (event) => {
        setGender(event.target.value);
      };
    
    const handleIP = (event) => {
        setIP(event.target.value);
    };


      return(
        <Box mb={10}>
            <Flex mb={5} wrap='wrap'>
                <Titles title='Email Address' description={email}/>
              
                <Spacer />
                <>
                <EmailButton buttonStyle={buttonStyle}/>
                </>
            </Flex>

            <Flex mb={5}>
                <Titles title='Change password' description='Password must be at least 8 characters long'/>
                {/* <div>
                    <h3 className="headings-settings d-flex fw-500 mb-1">Change password</h3> 
                    <p className="headings-description fw-normal text-muted">Password must be at least 8 characters long</p>
                </div> */}
                <Spacer />
                <>
                <ChangePass buttonStyle={buttonStyle}/>
                </>
            </Flex>

            <Flex mb={5}>
                <Titles title='Gender' description='This information may be used to improve your recommendations and ads.'/>
                
                <Spacer />
                <Select textAlign={[ 'left', 'center' ]} className="fw-bold "  variant='unstyled' onChange={handleGender} value={gender} size='xs' width="fit-content" justifyItems='center'                       
                >
                    <option value='MAN' >MAN</option>
                    <option value='WOMAN'  >WOMAN</option>
                </Select>
            </Flex>
            <Flex flexDirection='column' mb={5} >
                <Titles title='Location customization' description='Specify a location to customize your recommendations and feed. Reddit does not track your precise geolocation data.'/>
                
                <Box display='flex' ms={10}>
                    <Select textAlign={[ 'left', 'center' ]}  fontSize='md' fontWeight='500' style={{borderRadius: "30px"}} value={ip} onChange={handleIP}  placeholder='Use approximate location (based on IP)'  bg='Background'  variant='filled' width='fit-content'   size='xs'  >
                        <option value='Egypt' >Egypt</option>
                        <option value='Germany' >Germany</option>
                    </Select>
                </Box>

            </Flex>

        </Box>
        
      )
}

export default AccountPreferences;