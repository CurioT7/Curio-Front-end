import'./AccountSettings'

import { Flex, Spacer } from '@chakra-ui/react'

import AccountPreferences from "./AccountPreferences"
import React from "react"
import ConnectedAccounts from "./ConnectedAccounts"
import DeleteButton from './buttons/DeleteButton'
import GeneratePass from './buttons/GeneratePass'
import { FindUserInformation } from '../UserSetting/UserSettingsEndPoints'
const AccountSettings = () =>{
    const [email, setEmail] = React.useState("example@gamil.com");
    const [username,setUsername] = React.useState("example")
    const [findPass, setFindPassword] = React.useState(false)
    const [connectedToGoogle, setConnectedToGoogle] = React.useState(false)

   
    React.useEffect(() => {
        async function fetchAndSetData() { 
            const UserData = await FindUserInformation();
            if(UserData){
                setEmail(UserData.email);
                setUsername(UserData.username);
                setFindPassword(UserData.createdPassword);
                setConnectedToGoogle(UserData.connectedToGoogle);
            }
        }

        fetchAndSetData();
    }, []);
    return (
        <div className="container" >
            <div className="customize-account   ">

                <div className="account-settings-section col"> 
                    <h2 className="settings-heading ">Account settings</h2>
                    <h3 className="headings-titles text-uppercase fw-bold mb-3">account preferences</h3>
                    <AccountPreferences onChangeEmail={setEmail} email={email} username={username} findPass={findPass}/>
                    <h3 className="headings-titles text-uppercase fw-bold mb-3">CONNECTED ACCOUNTS</h3>
                    <ConnectedAccounts findPass={findPass} isConnected={connectedToGoogle}/>
                    <h3 className="headings-titles text-uppercase fw-bold mb-3">delete ACCOUNTS</h3>
                    <Flex justifyContent='flex-end' className="mb-5">
                    {findPass?(<DeleteButton/>) : (<GeneratePass title="Deactivate account" context="To deactivate your Reddit account" isEmail={false} isDelete={true} isGoogle={false} email={email} username={username}/>)}
                    </Flex>
                </div>

            </div>
        </div>
    )
    
}

export default AccountSettings;