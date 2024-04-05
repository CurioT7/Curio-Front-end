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
    const [domainMessage, setdomainMessage] = useState(""); 
    const [urlMessage, seturlMessage] = useState("");

    const handleSave = () => {
        if (displayText && url) {
            const enteredDomain = (new URL(url)).hostname;

            // Split the domain by dots and extract the second part
            const domainParts = enteredDomain.split('.');
            const extractedDomain = domainParts.length >= 2 ? domainParts[1] : null;

            const wwwPrefix = enteredDomain.startsWith("www.") ? "www." : "";
            
            // Check if entered domain matches platform's domain
            if ((extractedDomain === props.name.toLowerCase()) || props.name.toLowerCase() === "custom url") {
                props.handleSocialLinkClick(url, displayText, props.icon);
                setDisplayText("");
                setUrl("");
                setIsSaveEnabled(false);
                onClose();
            } else {
                setdomainMessage("Domain is not allowed");
            }
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
                            <input type="text" name="display_text" id="display_text" placeholder="Display text" className="display_text" value={displayText} onChange={handleInputChange} required/>
                            <input type="url" name="url" placeholder="https://www.webite.com/" className="url_website" value={url} onChange={handleInputChange} required/>
                            {domainMessage && <p style={{ color: 'red', fontSize: '12px' }}>{domainMessage}</p>}
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default SocialMediaModal;
