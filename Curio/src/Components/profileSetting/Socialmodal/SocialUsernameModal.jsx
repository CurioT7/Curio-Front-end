import React, { useState } from "react";
import { Button, useDisclosure } from '@chakra-ui/react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
} from '@chakra-ui/react';
import "./SocialinputModal.css";

function SocialUsernameModal(props) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [displayText, setDisplayText] = useState(""); 
    const [isSaveEnabled, setIsSaveEnabled] = useState(false);
    const [warningMessage, setWarningMessage] = useState("");

    const handleSave = () => {
        if (displayText === "@") {
            setWarningMessage("Handle attribute must be provided for " + props.name.toUpperCase()  + " link type.");
            return;
        }

        if (displayText) {
            const usernameUrl = `${props.urlPrefix}${displayText}`;
            console.log("Username URL:", usernameUrl);
            props.handleSocialLinkClick(displayText, props.icon);
            setDisplayText(""); 
            setIsSaveEnabled(false);
            setWarningMessage("");

            onClose();
        }
    };

    const handleInputChange = (e) => {
        let { value } = e.target;
        
        if (value.length === 0) {
            value = "@";
        }

        if (!value.startsWith("@")) {
            value = "@" + value.substring(1);
        }

        setDisplayText(value);
        setIsSaveEnabled(value.length > 1); 
        setWarningMessage(""); 
    };

    const handleClose = () => {
        if (!displayText || displayText === "@") { 
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
                    <i className={props.icon}/> {props.name}
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
                                <Button onClick={handleSave} disabled={!isSaveEnabled} bg={isSaveEnabled ? "blue.500" : "gray.400"}>Save</Button>
                            </div>
                        </div>
                    </ModalHeader>
                    <ModalBody>
                        <div className="custom-container">
                            <li className="custom-url-li list-inline-item mb-2 mx-1"><i className={props.icon}/> {props.name} </li>
                            <input type="text" placeholder="@username" className="display_text" value={displayText} onChange={handleInputChange} required/>
                            {warningMessage && <p style={{ color: 'red', fontSize: '12px' }}>{warningMessage}</p>}
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default SocialUsernameModal;
