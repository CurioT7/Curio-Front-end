// JSX file 2: Socialmodal.jsx
import React, { useState } from "react";
import { Button, useDisclosure } from '@chakra-ui/react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react';
import "./Socialmodal.css";

function Socialmodal(props){
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedSocialLinks, setSelectedSocialLinks] = useState([]);

    const handleSocialLinkClick = (socialLink, iconClass) => {
        // Add the clicked social link to the selectedSocialLinks array
        setSelectedSocialLinks([...selectedSocialLinks, { link: socialLink, icon: iconClass }]);
        onClose();
    };

    const handleRemoveSocialLink = (index) => {
        // Remove the selected social link from the array
        const updatedLinks = [...selectedSocialLinks];
        updatedLinks.splice(index, 1);
        setSelectedSocialLinks(updatedLinks);
    };

    return(
        <>
        {/* Display all selected social links */}
        {selectedSocialLinks.map((link, index) => (
            <div key={index} className="selected-social-link">
                <i className={link.icon}/> {link.link}
                {/* Add a cancel icon to remove the link */}
                <i className="fa-solid fa-x" onClick={() => handleRemoveSocialLink(index)}></i>
            </div>
        ))}
        <div className="social-link-container">
            <Button onClick={onOpen} style={props.buttonStyle} variant='outline' className="add-social-button">
                <i className="fa-solid fa-plus"></i>Add social link
            </Button>
        </div>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader className="text-center">Add Social Link</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <div className="container-social mb-6 mx-2">
                        <li className="social-icon-modal list-inline-item mb-2 mx-1" onClick={() => handleSocialLinkClick('Custom URL', 'fa-solid fa-link')}>
                            <i className="fa-solid fa-link"/> Custom URL
                        </li>
                        <li className="social-icon-modal list-inline-item mb-2 mx-1" onClick={() => handleSocialLinkClick('Curio', 'fa-solid fa-link')}>
                            <i className="fa-solid fa-link"/> Curio
                        </li>
                        <li className="social-icon-modal list-inline-item mb-2 mx-1" onClick={() => handleSocialLinkClick('Instagram', 'fa-brands fa-instagram')}>
                            <i className="fa-brands fa-instagram"/> Instagram
                        </li>
                        <li className="social-icon-modal list-inline-item mb-2 mx-1" onClick={() => handleSocialLinkClick('Twitter', 'fa-brands fa-twitter')}>
                            <i className="fa-brands fa-twitter"/> Twitter
                        </li>
                        <li className="social-icon-modal list-inline-item mb-2 mx-1" onClick={() => handleSocialLinkClick('TikTok', 'fa-brands fa-tiktok')}>
                            <i className="fa-brands fa-tiktok"/>  TikTok
                        </li>
                        <li className="social-icon-modal list-inline-item mb-2 mx-1" onClick={() => handleSocialLinkClick('Twitch', 'fa-brands fa-twitch')}>
                            <i className="fa-brands fa-twitch"/> Twitch
                        </li>
                        <li className="social-icon-modal list-inline-item mb-2 mx-1" onClick={() => handleSocialLinkClick('Facebook', 'fa-brands fa-facebook')}>
                            <i className="fa-brands fa-facebook"/> Facebook
                        </li>
                        <li className="social-icon-modal list-inline-item mb-2 mx-1" onClick={() => handleSocialLinkClick('Facebook', 'fa-brands fa-facebook')}>
                            <i className="fa-brands fa-youtube"/> Youtube
                        </li>
                        <li className="social-icon-modal list-inline-item mb-2 mx-1" onClick={() => handleSocialLinkClick('Facebook', 'fa-brands fa-facebook')}>
                            <i className="fa-brands fa-tumblr"/> Tumblr
                        </li>
                        <li className="social-icon-modal list-inline-item mb-2 mx-1" onClick={() => handleSocialLinkClick('Facebook', 'fa-brands fa-facebook')}>
                            <i className="fa-brands fa-spotify"/> Spotify
                        </li>
                        <li className="social-icon-modal list-inline-item mb-2 mx-1" onClick={() => handleSocialLinkClick('Facebook', 'fa-brands fa-facebook')}>
                            <i className="fa-brands fa-soundcloud"/> SoundCloud
                        </li>
                        <li className="social-icon-modal list-inline-item mb-2 mx-1" onClick={() => handleSocialLinkClick('Facebook', 'fa-brands fa-facebook')}>
                            <i className="fa-brands fa-paypal"/> PayPal
                        </li>
                        <li className="social-icon-modal list-inline-item mb-2 mx-1" onClick={() => handleSocialLinkClick('Facebook', 'fa-brands fa-facebook')}>
                            <i className="fa-brands fa-facebook"/> Facebook
                        </li>
                        {/* Other social links... */}
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
        </>
    );
}

export default Socialmodal;
