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
    const [handleMessage, sethandleMessage] = useState(""); // State to manage error message

    const handleSave = () => {
        if (displayText === "@") {
            // Display error message here
            sethandleMessage('"handle"attribute must be provided for INSTAGRAM link type');
            return; // Do not proceed further
        }
    
        if (displayText) {
            let username = displayText.startsWith("@") ? displayText.substring(1) : displayText;
            const usernameUrl = `${props.urlPrefix}${username}`;
            // console.log("Username URL:", usernameUrl);
    
            // Pass URL, displayText, and icon when calling handleSocialLinkClick
            props.handleSocialLinkClick(usernameUrl, displayText, props.icon);
    
            setDisplayText(""); 
            setIsSaveEnabled(false);
    
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
    
        // Reset error message when user starts typing again
        if (handleMessage) {
            sethandleMessage("");
        }
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
                            {handleMessage && <p style={{ color: 'red', fontSize: '12px' }}>{handleMessage}</p>}
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default SocialUsernameModal;
