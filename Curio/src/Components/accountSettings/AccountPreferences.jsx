import "./AccountSettings.css"
import { Flex, Spacer,Box } from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'
import React from "react"
import Titles from "../feedSettings/childs/Titles"
import ChangePass from "./buttons/ChangePass"
import EmailButton from "./buttons/EmailButton"
import GeneratePass from "./buttons/GeneratePass"
import { useToast, } from '@chakra-ui/react';
import { sendUserDataToBackend,fetchUserDataFromBackend } from "../UserSetting/UserSettingsEndPoints"


const AccountPreferences = (props) => {   
    const [gender, setGender] = React.useState("MAN")
    const [locationCustomization, setIP] = React.useState("Use approximate location (based on IP)")
    const LocationArr=["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "The Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin",  "Bosnia and Herzegovina", "Brazil","Cameroon","Canada","Chile","China","Colombia","Croatia","Cuba","Cyprus","Czech Republic","Denmark","Egypt","Estonia","Finland","France","Georgia","Germany","Ghana","Greece","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Japan","Jordan","Kazakhstan","Kenya","Kuwait","Lebanon","Liberia","Libya","Lithuania","Luxembourg","Madagascar","Malaysia","Maldives","Mali","Malta","Mexico","Moldova","Monaco","Mongolia","Morocco","Nepal","Netherlands","New Zealand","Nigeria","Norway","Oman","Pakistan","Panama","Paraguay","Peru","Philippines","Poland","Portugal","Qatar","Romania","Russia","Saudi Arabia","Senegal","Serbia","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","Sudan","Sweden","Switzerland","Syria","Taiwan","Tanzania","Thailand","Tunisia","Turkey","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Venezuela","Vietnam","Yemen","Zambia"]

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
        sendUserDataToBackend({gender: event.target.value})
        Toast()
      };
    
    const handleIP = (event) => {
        setIP(event.target.value);
        sendUserDataToBackend({locationCustomization: event.target.value})
        Toast()
    };    
    React.useEffect(() => {
        async function fetchAndSetData() {
            const data = await fetchUserDataFromBackend();
            if (data) {
                
                setGender(data.gender.toUpperCase());
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
                    <EmailButton onChangeEmail={props.onChangeEmail}  buttonStyle={buttonStyle}/>
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
                    <Select  textAlign='left' fontSize='md' fontWeight='500' style={{borderRadius: "30px"}} value={locationCustomization} onChange={handleIP}  placeholder='Use approximate location (based on IP)'  bg='Background'  variant='filled' width='fit-content'   size='sm'  >
                        {LocationArr.map((location, index) => (
                            <option key={index} value={location}>{location}</option>
                        ))}
                    </Select>
                </Box>

            </Flex>

        </Box>
        
      )
}

export default AccountPreferences;