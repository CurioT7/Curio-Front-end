import "./AccountSettings.css"
import { Flex, Spacer } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'
import React from "react"
import { useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react"
import ChangePass from "./buttons/ChangePass"
import EmailButton from "./buttons/EmailButton"
const AccountPreferences = () => {
    const [email, setEmail] = React.useState("example@gamil.com");
    const [gender, setGender] = React.useState("MAN")
    
    
    const buttonStyle ={
        borderRadius: "30px", padding: "10px 20px",
    }
    
    const handleChange = (event) => {
        setGender(event.target.value);
      };


      return(
        <>
            <Flex className="mb-3">
                <div>
                    <h3 className="headings-settings d-flex fw-500 mb-1">Email Address</h3> {/* Form to be done  */}
                    <p className="headings-description fw-normal text-muted">{email}</p>
                </div>
                <Spacer />
                <>
                <EmailButton buttonStyle={buttonStyle}/>
                </>
            </Flex>

            <Flex className="mb-3">
                <div>
                    <h3 className="headings-settings d-flex fw-500 mb-1">Change password</h3> 
                    <p className="headings-description fw-normal text-muted">Password must be at least 8 characters long</p>
                </div>
                <Spacer />
                <>
                <ChangePass buttonStyle={buttonStyle}/>
                </>
            </Flex>

            <Flex className="mb-3">
                <div>
                    <h3 className="headings-settings d-flex fw-500 mb-1">Gender</h3>
                    <p className="headings-description fw-normal text-muted">This information may be used to improve your recommendations and ads.</p>
                </div>
                <Spacer />
                <Select className="fw-bold "  variant='unstyled' onChange={handleChange} value={gender} size='xs' width="fit-content"                       
                >
                    <option value='MAN' >MAN</option>
                    <option value='WOMAN'  >WOMAN</option>
                </Select>
            </Flex>

        </>
        
      )
}

export default AccountPreferences;