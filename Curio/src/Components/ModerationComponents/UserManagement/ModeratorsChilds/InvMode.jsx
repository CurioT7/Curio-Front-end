import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
  } from '@chakra-ui/react'
  import { Button,Input} from "@chakra-ui/react";
  import InvCheckBox from './InvCheckBox';
  import { FaPencil } from "react-icons/fa6";
  import { useParams } from 'react-router-dom';
  import { useToast } from '@chakra-ui/react';
  import { SendModeratorInvites,editModeratorAuth } from './ModeratorsEndPoints';
import { set } from 'mongoose';
function InvMode(props){
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { Community } = useParams();
    const toast = useToast();
    const[inputUsername,setInputUsername]=React.useState('')
    const[everything,setEverything]=React.useState(false)
    const[manageUsers,setManageUsers]=React.useState(false)
    const[createLiveChats,setCreateLiveChats]=React.useState(false)
    const[manageSettings,setManageSettings]=React.useState(false)
    const[managePosts,setManagePosts]=React.useState(false)
    const[denyAccess,setDenyAccess]=React.useState(false)
    function toastMessage(status,message){
        toast({
            
            description: message,
            status: status,
            duration: 5000,
            isClosable: true,
        })
    }
    function handleChangeParent(value){
        if(value){
            setManageUsers(true)
            setCreateLiveChats(true)
            setManageSettings(true)
            setManagePosts(true)
        }else{
        setManageUsers(false)
        setCreateLiveChats(false)
        setManageSettings(false)
        setManagePosts(false)
        }
    }
    function handleChange(value){
        if(value==false) setEverything(false)
    }
    function handleInputUsername(e){
        setInputUsername(e.target.value)
    }
    async function handleInvite(){
        const modSettings = {
            role: 'moderator',
            name: inputUsername,
            manageUsers: manageUsers,
            createLiveChats: createLiveChats,
            manageSettings: manageSettings,
            managePostsAndComments: managePosts,
            everything: everything
        }
        const data = await SendModeratorInvites(Community,modSettings);
        if(data){
            toastMessage('info','Moderator invite sent successfully')
            
        }else{
            toastMessage('error','Moderator invite failed')
            
        }
        
        onClose();
    }
    async function handleEdit(){
        const modSettings = {
            role:props.role,
            name: props.username,
            manageUsers: manageUsers,
            createLiveChats: createLiveChats,
            manageSettings: manageSettings,
            managePostsAndComments: managePosts,
            everything: everything
        }
        const data = await editModeratorAuth(Community,modSettings);
        if(data){
            toastMessage('info','Moderator Settings updated successfully')
            
        }else{
            toastMessage('error','Moderator settings update failed')
            
        }
        
        onClose();
    }

    React.useEffect(()=>{
        if(!props.edit){
            
            setInputUsername('')
            setManageUsers(true)
            setCreateLiveChats(true)
            setManageSettings(true)
            setManagePosts(true)
            setEverything(true)
        }else{
            
                
                
            setManageUsers(props.manageUsers)
            setCreateLiveChats(props.createLiveChats)
            setManageSettings(props.manageSettings)
            setManagePosts(props.managePostsAndComments)
            setEverything(props.everything)
            if(props.role==="creator"){
                setManageUsers(true)
                setCreateLiveChats(true)
                setManageSettings(true)
                setManagePosts(true)
                setEverything(true)
                setDenyAccess(true)
            }
            else{
                setDenyAccess(false)
            }
            
        }
    
    },[props.edit, props.inputUsername, props.manageUsers, props.createLiveChats, props.manageSettings, props.managePostsAndComments, props.everything])

  return (
    <div>
        {!props.edit&&<Button onClick={onOpen} fontWeight={700} borderRadius={20} size='sm' colorScheme="blue"> Invite user as mod </Button>}
        {props.edit&&<FaPencil onClick={onOpen} style={{cursor:"pointer"}} />}
        <Modal isCentered size='xl' isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader className="border-bottom mb-1">{!props.edit?(<>Invite Moderators</>):(<>Edit:u/user</>)}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <div className=' border-bottom mb-4'>
                    {!props.edit &&<Input  placeholder='Enter Username' onChange={handleInputUsername} value={inputUsername}/>}
                    {!denyAccess?(<p className='fw-bold mt-2'>Give them access to...</p>):(<p className='fw-bold mt-2'>Can't Access</p>)}
                    <InvCheckBox denyAccess={denyAccess} onChange={handleChangeParent} isChecked={everything} setChecked={setEverything} label="Everything" description="Full access including the ability to manage moderator access and permissions." />
                </div>
                <InvCheckBox denyAccess={denyAccess} onChange={handleChange} isChecked={manageUsers} setChecked={setManageUsers} label="Manage Users" description="Access mod notes, ban and mute users, and approve submitters*." />
                <InvCheckBox denyAccess={denyAccess} onChange={handleChange} isChecked={createLiveChats} setChecked={setCreateLiveChats} label="Create Live Chats" description="Create live chat posts in this community." />
                <InvCheckBox denyAccess={denyAccess} onChange={handleChange} isChecked={manageSettings} setChecked={setManageSettings} label="Manage Settings" description="Manage community settings, appearance, emojis, rules, and AutoMod*." />
                <InvCheckBox denyAccess={denyAccess} onChange={handleChange} isChecked={managePosts} setChecked={setManagePosts} label="Manage Posts & Comments" description="Create and manage user and post flair." />
                
            </ModalBody>

            <ModalFooter borderBottomRadius={5} bg='rgb(237, 239, 241)'>
                {props.edit && props.username !== localStorage.getItem('username')   && <Button size='sm' borderRadius={20}   colorScheme='red' mr={3} >Remove</Button>}
                <Button size='sm' borderRadius={20} variant='outline' colorScheme='blue' mr={3} onClick={onClose}>
                    cancel
                </Button>
                {!props.edit &&<Button  isDisabled={inputUsername.length<3 || inputUsername.length>=21} onClick={handleInvite} size='sm' colorScheme="blue" borderRadius={20}  >Invite</Button>}
                {props.edit &&<Button isDisabled={denyAccess} size='sm' onClick={handleEdit} colorScheme="blue" borderRadius={20}  >Save</Button>}
            </ModalFooter>
        </ModalContent>
        </Modal>
    </div>
  )
}

export default InvMode
