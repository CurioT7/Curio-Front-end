import { Button, ButtonGroup } from '@chakra-ui/react'
import React from "react"
import { useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter,Box } from "@chakra-ui/react"
import { FaTwitter } from "react-icons/fa";

const Twitter = (props) =>{
    const { isOpen, onOpen, onClose } = useDisclosure()

    return(
        <Box>
                <Button className='fs-6' onClick={onOpen} style={props.buttonStyle} colorScheme='twitter' leftIcon={<FaTwitter />} size='sm'> Connect to Twitter</Button>

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
            </Box>
    )
}

export default Twitter;