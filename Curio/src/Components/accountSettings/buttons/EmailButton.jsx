import { Button, ButtonGroup } from '@chakra-ui/react'
import React from "react"
import { useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react"

const EmailButton = (props) =>{
    const { isOpen, onOpen, onClose } = useDisclosure()

    return(
        <>
                <Button onClick={onOpen} style={props.buttonStyle} variant='outline'>Change</Button>

                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus architecto reprehenderit ex doloribus, perspiciatis labore veritatis maxime! Repellendus velit ipsam ratione iusto exercitationem voluptates, sit nihil quod. Officia, laboriosam? Atque!</p>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                        Close
                        </Button>
                        <Button variant='ghost'>Secondary Action</Button>
                    </ModalFooter>
                    </ModalContent>
                </Modal>
                </>
    )
}

export default EmailButton;