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
function LeaveMode(){
    const { isOpen, onOpen, onClose } = useDisclosure()
    return(
        <div>
            <Button onClick={onOpen} fontWeight={700} variant='outline' borderRadius={20} size='sm' colorScheme="blue"> Leave as mod</Button>

            <Modal isCentered size='xl' isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader className="border-bottom mb-1">Leave as mod</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    Once you leave as a mod, you will lose mod permissions and will be unable to access any mod tools for this community. Are you sure you wish to leave as a mod of this community?
                </ModalBody>

                <ModalFooter borderBottomRadius={5} bg='rgb(237, 239, 241)'>
                    <Button size='sm' borderRadius={20} variant='outline' colorScheme='blue' mr={3} onClick={onClose}>
                        cancel
                    </Button>
                    <Button size='sm' colorScheme="blue" borderRadius={20}  >Leave</Button>
                </ModalFooter>
            </ModalContent>
            </Modal>
        </div>
    )
}


export default LeaveMode;