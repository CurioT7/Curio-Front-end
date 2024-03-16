import React from "react";
import { Button, ButtonGroup } from '@chakra-ui/react'
import { useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react"

function Socialmodal(props){
    const { isOpen, onOpen, onClose } = useDisclosure()
    return(
        <>
        <Button onClick={onOpen} style={props.buttonStyle} variant='outline'>Add social link</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
            

        </Modal>
        </>
    );
}

export default Socialmodal