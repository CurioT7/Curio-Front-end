import React from "react";
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
  import { Button } from "@chakra-ui/react";
  import { HiTrash } from "react-icons/hi2";
function LeaveMode(props){
    const { isOpen, onOpen, onClose } = useDisclosure()
    return(
        <div>
            {!props.invited&&<Button onClick={onOpen} fontWeight={700} variant='outline' borderRadius={20} size='sm' colorScheme="blue"> Leave as mod</Button>}
            {props.invited&&<HiTrash onClick={onOpen} style={{cursor:"pointer"}} />}
            <Modal isCentered size='xl' isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader className="border-bottom mb-1">{!props.invited?(<>Leave as mod</>):(<>confirm</>)}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {!props.invited && <>Once you leave as a mod, you will lose mod permissions and will be unable to access any mod tools for this community. Are you sure you wish to leave as a mod of this community?</>}
                    {props.invited && <>Are you sure you want to rescind the moderator invite to {props.user}?</>}
                </ModalBody>

                <ModalFooter borderBottomRadius={5} bg='rgb(237, 239, 241)'>
                    <Button size='sm' borderRadius={20} variant='outline' colorScheme='blue' mr={3} onClick={onClose}>
                        cancel
                    </Button>
                    {!props.invited&&<Button size='sm' onClick={onClose} colorScheme="blue" borderRadius={20}  >Leave</Button>}
                    {props.invited&&<Button size='sm' onClick={onClose} colorScheme="blue" borderRadius={20}  >Remove</Button>}
                </ModalFooter>
            </ModalContent>
            </Modal>
        </div>
    )
}


export default LeaveMode;