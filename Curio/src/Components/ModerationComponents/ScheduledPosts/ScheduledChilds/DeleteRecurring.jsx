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
  import { FaTrashAlt } from "react-icons/fa";
function DeleteRec(props){
    const { isOpen, onOpen, onClose } = useDisclosure()

    function handleDelete(){
        props.onClose()
    }
    return(
        <div>
            <Button size='md' display='flex' gap={1} borderRadius={20} variant='unstyled' color="red" mr={3} onClick={onOpen}><FaTrashAlt/>Delete</Button>
            <Modal isCentered size='xl' isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader className="border-bottom mb-1">Delete post</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                Are you sure you want to delete this recurring scheduled post? The template will be deleted and will be no longer submitted. You cannot undo this action.
                </ModalBody>

                <ModalFooter borderBottomRadius={5} bg='rgb(237, 239, 241)'>
                    <Button size='sm' _hover={{color:"gray",borderColor:"gray"}} borderRadius={20} variant='outline' colorScheme='blue' mr={3} onClick={onClose}>
                        cancel
                    </Button>
                    <Button size='sm' _hover={{background:"red"}} onClick={handleDelete} colorScheme="blue" borderRadius={20}  >Yes,Delete</Button>
                    
                </ModalFooter>
            </ModalContent>
            </Modal>
        </div>
    )
}


export default DeleteRec;