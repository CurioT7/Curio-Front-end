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

function SocialMediaModal(props) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [displayText, setDisplayText] = useState("");
    const [url, setUrl] = useState("");
    const [isSaveEnabled, setIsSaveEnabled] = useState(false);
    const [isUrlValid, setIsUrlValid] = useState(true); 
    const [isUrlDomain, setIsUrlDomain] = useState(true);

    const handleSave = () => {
        if (displayText && url) {
            if (!isValidUrl(url)) {
                setIsUrlValid(false);
                return;
            }
            const receivedDomain = getDomainFromUrl(props.urlPrefix);
            const enteredDomain = getDomainFromUrl(url);
            if (receivedDomain !== enteredDomain) {
                setIsUrlDomain(false);
                return;
            }

            props.handleSocialLinkClick(displayText, props.icon);
            setDisplayText("");
            setUrl("");
            setIsSaveEnabled(false);
            setIsUrlValid(true); 
            onClose();
        }
    };

    const getDomainFromUrl = (url) => {
        try {
            const domain = new URL(url).hostname;
            return domain.startsWith("www.") ? domain.substring(4) : domain;
        } catch (error) {
            return "";
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "display_text") {
            setDisplayText(value);
        } else if (name === "url") {
            setUrl(value);
        }
        setIsSaveEnabled(value !== "" && url !== "");
        setIsUrlValid(true); 
    };

    const handleClose = () => {
        if (!(displayText && url)) {
            return;
        }
        onClose();
    };

    const handleGoBack = () => {
        onClose();
    };

    const isValidUrl = (url) => {
        try {
            new URL(url);
            return true;
        } catch (error) {
            return false;
        }
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
                            <input type="text" name="display_text" placeholder="Display text" className="display_text" value={displayText} onChange={handleInputChange} required/>
                            <input type="url" name="url" placeholder="https://www.webite.com/" className="url_website" value={url} onChange={handleInputChange} required/>
                            {!isUrlValid && <p style={{ color: 'red', fontSize: '12px' }}>Invalid URL</p>} 
                            {!isUrlDomain && <p style={{ color: 'red', fontSize: '12px' }}>Domain is not allowed</p>} 
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default SocialMediaModal;
