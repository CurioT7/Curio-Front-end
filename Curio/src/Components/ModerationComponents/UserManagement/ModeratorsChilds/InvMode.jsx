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
function InvMode(props){
    const { isOpen, onOpen, onClose } = useDisclosure()
    const[inputUsername,setInputUsername]=React.useState('')
    const[everything,setEverything]=React.useState(false)
    const[manageUsers,setManageUsers]=React.useState(false)
    const[createLiveChats,setCreateLiveChats]=React.useState(false)
    const[manageSettings,setManageSettings]=React.useState(false)
    const[managePosts,setManagePosts]=React.useState(false)
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
                    <p className='fw-bold mt-2'>Give them access to...</p>
                    <InvCheckBox onChange={handleChangeParent} isChecked={everything} setChecked={setEverything} label="Everything" description="Full access including the ability to manage moderator access and permissions." />
                </div>
                <InvCheckBox onChange={handleChange} isChecked={manageUsers} setChecked={setManageUsers} label="Manage Users" description="Access mod notes, ban and mute users, and approve submitters*." />
                <InvCheckBox onChange={handleChange} isChecked={createLiveChats} setChecked={setCreateLiveChats} label="Create Live Chats" description="Create live chat posts in this community." />
                <InvCheckBox onChange={handleChange} isChecked={manageSettings} setChecked={setManageSettings} label="Manage Settings" description="Manage community settings, appearance, emojis, rules, and AutoMod*." />
                <InvCheckBox onChange={handleChange} isChecked={managePosts} setChecked={setManagePosts} label="Manage Posts & Comments" description="Create and manage user and post flair." />
                
            </ModalBody>

            <ModalFooter borderBottomRadius={5} bg='rgb(237, 239, 241)'>
                <Button size='sm' borderRadius={20} variant='outline' colorScheme='blue' mr={3} onClick={onClose}>
                    cancel
                </Button>
                {!props.edit &&<Button isDisabled={inputUsername.length<3 || inputUsername.length>=21} onClick={onClose} size='sm' colorScheme="blue" borderRadius={20}  >Invite</Button>}
                {props.edit &&<Button size='sm' onClick={onClose} colorScheme="blue" borderRadius={20}  >Save</Button>}
            </ModalFooter>
        </ModalContent>
        </Modal>
    </div>
  )
}

export default InvMode
