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
  import { PiPencilSimpleLineFill } from "react-icons/pi";
/**
 * Renders a component that allows the user to submit a scheduled post immediately.
 *
 * @component
 * @example
 * return (
 *   <PostNow />
 * )
 */
function PostNow(props){
    const { isOpen, onOpen, onClose } = useDisclosure()
    return(
        <div>
            <Button onClick={onOpen} display="flex" gap={1} fontSize="0.75rem" _hover={{background:"rgb(232, 232, 232)"}}  variant='ghost' padding={1} size={1}><PiPencilSimpleLineFill/><p style={{fontSize:"0.75rem"}} className='m-0 text-secondary' >Submit Now</p> </Button>
            <Modal isCentered size='xl' isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader className="border-bottom mb-1">Confirm</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    Are you sure you want to submit this scheduled post now? This action cannot be undone.
                </ModalBody>

                <ModalFooter borderBottomRadius={5} bg='rgb(237, 239, 241)'>
                    <Button size='sm' borderRadius={20} variant='outline' colorScheme='blue' mr={3} onClick={onClose}>
                        cancel
                    </Button>
                    <Button size='sm' onClick={onClose} colorScheme="blue" borderRadius={20}  >Submit</Button>
                    
                </ModalFooter>
            </ModalContent>
            </Modal>
        </div>
    )
}


export default PostNow;