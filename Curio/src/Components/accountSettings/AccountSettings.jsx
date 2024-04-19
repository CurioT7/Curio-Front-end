import'./AccountSettings'

import { Flex, Spacer } from '@chakra-ui/react'

import AccountPreferences from "./AccountPreferences"
import React from "react"
import ConnectedAccounts from "./ConnectedAccounts"
import DeleteButton from './buttons/DeleteButton'
import GeneratePass from './buttons/GeneratePass'
import axios from 'axios';

const AccountSettings = () =>{
    const serverHost = import.meta.env.VITE_SERVER_HOST;
    const [email, setEmail] = React.useState("example@gamil.com");
    const [username,setUsername] = React.useState("example")
    const [findPass, setFindPassword] = React.useState(false)
    const [connectedToGoogle, setConnectedToGoogle] = React.useState(false)

    async function FindUserInformation(){
        try{
            const request = await axios.get(`${serverHost}/api/settings/v1/me`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                
                }});
                
                return request.data;
        }
        catch(error){

        }
    }
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
                    <AccountPreferences email={email} username={username} findPass={findPass}/>
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