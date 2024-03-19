import React, { useState } from "react";
import { Button, useDisclosure, Avatar } from '@chakra-ui/react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
} from '@chakra-ui/react';
import "./SocialinputModal.css";

function CurioInput(props) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [displayText, setDisplayText] = useState(""); 
    const [isSaveEnabled, setIsSaveEnabled] = useState(false);

    const handleSave = () => {
        if (displayText) {
            props.handleSocialLinkClick(displayText, props.avatar);
            setDisplayText(""); 
            setIsSaveEnabled(false);
            // There's no function setWarningMessage defined, remove this line to prevent errors.
            onClose();
        }
    };

    const handleInputChange = (e) => {
        let { value } = e.target;
        setDisplayText(value);
        // Enable save button only if input has content.
        setIsSaveEnabled(value !== "");
    };

    const handleClose = () => {
        if (!displayText) { 
            return;
        }
        onClose();
    };

    const handleGoBack = () => {
        onClose();
    };

    return (
        <>
            <div className="custom-url-link-container">
                <li onClick={onOpen} variant='outline' className="custom-url-button list-inline-item">
                    <Avatar size='sm' name={props.name} src={props.avatar} /> {props.name} 
                </li>
            </div>
            <Modal isOpen={isOpen} onClose={handleClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader className="text-center">
                        <div className="container-custom-title">
                            <div className="flex justify-start items-center">
                                <button className="arrow-button" onClick={handleGoBack}><i className="fa-solid fa-arrow-left"></i></button>
                            </div>
                            <div className="flex justify-center items-center">
                                Add Social Link
                            </div>
                            <div className="flex justify-end items-center">
                                {/* Disable button if save is not enabled */}
                                <Button onClick={handleSave} disabled={!isSaveEnabled} bg={isSaveEnabled ? "blue.500" : "gray.400"}>Save</Button>
                            </div>
                        </div>
                    </ModalHeader>
                    <ModalBody>
                        <div className="custom-container">
                            <li className="custom-url-li list-inline-item mb-2 mx-1"><Avatar size='sm' name={props.name} src={props.avatar} /> {props.name} </li> 
                            {/* Added onChange event handler to monitor input changes */}
                            <input type="text" placeholder="r/community, u/user" className="display_text" value={displayText} onChange={handleInputChange} required/>
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default CurioInput;
