import "./AccountSettings.css"
import { Switch } from '@chakra-ui/react'
import { Flex, Spacer } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'
import AccountPreferences from "./AccountPreferences"
import React from "react"
import ConnectedAccounts from "./ConnectedAccounts"
const AccountSettings = () =>{

    const [email, setEmail] = React.useState("example@gamil.com");
    const [gender, setGender] = React.useState("MAN")
    const buttonStyle ={
        borderRadius: "30px", padding: "10px 20px",
    }
    
    const handleChange = (event) => {
        setGender(event.target.value);
      };

    return (
        <div className="container" >
            <div className="customize-account   ">

                <div className="settings-section col"> 
                    <h2 className="settings-heading ">Account settings</h2>
                    <h3 className="headings-titles text-uppercase fw-bold mb-3">account preferences</h3>
                    <AccountPreferences></AccountPreferences>
                    <h3 className="headings-titles text-uppercase fw-bold mb-3">CONNECTED ACCOUNTS</h3>
                    <ConnectedAccounts></ConnectedAccounts>
                </div>

            </div>
        </div>
    )
    
}

export default AccountSettings;