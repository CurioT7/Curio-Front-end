import'./AccountSettings'

import { Flex, Spacer } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'

import AccountPreferences from "./AccountPreferences"
import React from "react"
import ConnectedAccounts from "./ConnectedAccounts"
import DeleteButton from './buttons/DeleteButton'

import { FaTrashAlt } from "react-icons/fa";
const AccountSettings = () =>{

  
    return (
        <div className="container" >
            <div className="customize-account   ">

                <div className="settings-section col"> 
                    <h2 className="settings-heading ">Account settings</h2>
                    <h3 className="headings-titles text-uppercase fw-bold mb-3">account preferences</h3>
                    <AccountPreferences></AccountPreferences>
                    <h3 className="headings-titles text-uppercase fw-bold mb-3">CONNECTED ACCOUNTS</h3>
                    <ConnectedAccounts></ConnectedAccounts>
                    <h3 className="headings-titles text-uppercase fw-bold mb-3">delete ACCOUNTS</h3>
                    <Flex justifyContent='flex-end' className="mb-5">
                    <DeleteButton/>
                    </Flex>
                </div>

            </div>
        </div>
    )
    
}

export default AccountSettings;