import "./AccountSettings.css"
import { Flex, Spacer,Box } from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'
import React from "react"
import Titles from "../feedSettings/childs/Titles"
import ChangePass from "./buttons/ChangePass"
import EmailButton from "./buttons/EmailButton"
import GeneratePass from "./buttons/GeneratePass"
import { useToast, } from '@chakra-ui/react';
import axios from 'axios';


const AccountPreferences = (props) => {
    const serverHost = import.meta.env.VITE_SERVER_HOST;
   
    const [gender, setGender] = React.useState("MAN")
    const [locationCustomization, setIP] = React.useState("Use approximate location (based on IP)")
   

    const toast = useToast()
    function Toast(){
        toast({
            
            description: "Changes Saved",
            status: 'info',
            duration: 3000,
            isClosable: true,
        })
}
    const buttonStyle ={
        borderRadius: "30px", padding: "10px 20px", 
    }
    
    const handleGender = (event) => {
        setGender(event.target.value);
        sendDataToBackend({gender: event.target.value})
        Toast()
      };
    
    const handleIP = (event) => {
        setIP(event.target.value);
        
        Toast()
    };
    
    async function fetchDataFromBackend() {
        try {
            const response = await axios.get(`${serverHost}/api/settings/v1/me/prefs`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            if (error.response) {
                console.error('Server Error:', error.response.data);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Error', error.message);
            }
            console.error('Error config:', error.config);
        }
    }
    

    async function sendDataToBackend(data) {
        try {
            const response = await axios.patch(`${serverHost}/api/settings/v1/me/prefs`, data, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            
            return response;
        } catch (error) {
            if (error.response) {
                console.error('Server Error:', error.response.data);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Error', error.message);
            }
            console.error('Error config:', error.config);
        }
    }

    React.useEffect(() => {
        async function fetchAndSetData() {
            const data = await fetchDataFromBackend();
            if (data) {
                setGender(data.gender);
                setIP(data.locationCustomization);
            }
           
        }

        fetchAndSetData();
    }, []);

    // Update data when gender or ip changes
    
    
      return(
        <Box mb={10}>
            {props.findPass==false &&  <Flex mb={5} wrap='wrap'>
                    <Titles title='Email Address' description={props.email}/>
                
                    <Spacer />
                    <Box className='account-button'>
                    <GeneratePass  isDelete={false} isGoogle={false} isEmail={true} title="Change your email address" context="To change your email address" email={props.email} username={props.username} buttonStyle={buttonStyle}/>
                    </Box>
                </Flex>}
           
           {props.findPass===true&& <Box>
                <Flex mb={5} justifyContent='space-between'  wrap='wrap'>
                    <Titles title='Email Address' description={props.email}/>
                
                    <Spacer />
                    <Box className='account-button'>
                    <EmailButton  buttonStyle={buttonStyle}/>
                    </Box>
                </Flex>

                <Flex mb={5} wrap='wrap'>
                    <Titles title='Change password' description='Password must be at least 8 characters long'/>
                    {/* <div>
                        <h3 className="headings-settings d-flex fw-500 mb-1">Change password</h3> 
                        <p className="headings-description fw-normal text-muted">Password must be at least 8 characters long</p>
                    </div> */}
                    <Spacer />
                    <Box className='account-button'>
                    <ChangePass  buttonStyle={buttonStyle}/>
                    </Box>
                </Flex>
            </Box>}
            <Flex mb={5} wrap='wrap'>
                <Titles title='Gender' description='This information may be used to improve your recommendations and ads.'/>
                
                <Spacer />
                <Select  textAlign={[ 'left', 'center' ]} className="fw-bold account-button"  variant='unstyled' onChange={handleGender} value={gender} size='xs' width="fit-content" justifyItems='center'                       
                >
                    <option value='MAN' >MAN</option>
                    <option value='WOMAN'  >WOMAN</option>
                </Select>
            </Flex>
            <Flex flexDirection='column' mb={5} wrap='wrap'>
                <Titles title='Location customization' description='Specify a location to customize your recommendations and feed. Reddit does not track your precise geolocation data.'/>
                
                <Box display='flex' ms={10}>
                    <Select  textAlign={[ 'left', 'center' ]}  fontSize='md' fontWeight='500' style={{borderRadius: "30px"}} value={locationCustomization} onChange={handleIP}  placeholder='Use approximate location (based on IP)'  bg='Background'  variant='filled' width='fit-content'   size='xs'  >
                        <option value='Egypt' >Egypt</option>
                        <option value='Germany' >Germany</option>
                    </Select>
                </Box>

            </Flex>

        </Box>
        
      )
}

export default AccountPreferences;