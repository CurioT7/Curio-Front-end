import React, { useState, useEffect } from "react";
import { Button, useDisclosure } from '@chakra-ui/react';
import "./Socialmodal.css";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react';
import logo from "../../../assets/Curio_logo.png";
import SocialMediaModal from "./SocialMediaModal";
import SocialUsernameModal from "./SocialUsernameModal";
import CurioInput from "./CurioInput";
import { sendUserDataToBackend } from '../../../Components/UserSetting/UserSettingsEndPoints.js';

function Socialmodal(props){
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedSocialLinks, setSelectedSocialLinks] = useState([]);

    useEffect(() => {
        setSelectedSocialLinks(props.SocialLinks || []);
    }, [props.SocialLinks]);

    const handleSocialLinkClick = (url, name, iconClass) => {
        if (selectedSocialLinks.length < 5) {
            const platform = getPlatformFromIconClass(iconClass);
            const newLink = { displayName: name, url: url, platform: platform };
            setSelectedSocialLinks([...selectedSocialLinks, newLink]);
            sendUserDataToBackend({socialLinks: [...selectedSocialLinks, newLink]});
        }
    };

    const handleRemoveSocialLink = (index) => {
        const updatedLinks = [...selectedSocialLinks];
        updatedLinks.splice(index, 1);
        setSelectedSocialLinks(updatedLinks);
        sendUserDataToBackend({ socialLinks: updatedLinks });
    };

    const RedirectToSocialLink = (index) => {
        const linkToRedirect = selectedSocialLinks[index];
        window.open(linkToRedirect.url, "_blank");
    }

    const getPlatformFromIconClass = (iconClass) => {
        const iconToPlatform = {
            "fa-solid fa-link": "Custom URL",
            "fa-brands fa-instagram": "Instagram",
            "fa-brands fa-twitter": "Twitter",
            "fa-brands fa-tiktok": "TikTok",
            "fa-brands fa-twitch": "Twitch",
            "fa-brands fa-facebook": "Facebook",
            "fa-brands fa-youtube": "Youtube",
            "fa-brands fa-tumblr": "Tumblr",
            "fa-brands fa-spotify": "Spotify",
            "fa-brands fa-soundcloud": "SoundCloud",
            "fa-brands fa-paypal": "PayPal",
        };
        return iconToPlatform[iconClass] || "Unknown";
    };
    
    return(
        <>
        {Array.isArray(selectedSocialLinks) && selectedSocialLinks.slice(0, 5).map((link, index) => (
            <div key={index} className="selected-social-link" onClick={() => RedirectToSocialLink(index)}>
                <i className={link.platform}/> {link.displayName} 
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
                    <div className="container-social container mb-6 mx-2">
                        <li className="social-icon-modal list-inline-item mb-2 mx-1">
                            <SocialMediaModal name="Custom URL" icon="fa-solid fa-link" handleSocialLinkClick={handleSocialLinkClick}/>
                        </li>
                        <li className="social-icon-modal list-inline-item mb-2 mx-1">
                            <CurioInput name="Curio" avatar={logo} handleSocialLinkClick={handleSocialLinkClick} />
                        </li>
                        <li className="social-icon-modal list-inline-item mb-2 mx-1">
                            <SocialUsernameModal name="Instagram" icon="fa-brands fa-instagram" handleSocialLinkClick={handleSocialLinkClick} urlPrefix="https://www.instagram.com/" />
                        </li>
                        <li className="social-icon-modal list-inline-item mb-2 mx-1">
                            <SocialUsernameModal name="Twitter" icon="fa-brands fa-twitter" handleSocialLinkClick={handleSocialLinkClick} urlPrefix="https://twitter.com/"/>
                        </li>
                        <li className="social-icon-modal list-inline-item mb-2 mx-1">
                            <SocialUsernameModal name="TikTok" icon="fa-brands fa-tiktok" handleSocialLinkClick={handleSocialLinkClick} urlPrefix="https://www.tiktok.com/"/>
                        </li>
                        <li className="social-icon-modal list-inline-item mb-2 mx-1">
                            <SocialUsernameModal name="Twitch" icon="fa-brands fa-twitch" handleSocialLinkClick={handleSocialLinkClick} urlPrefix="https://www.twitch.tv/"/>
                        </li>
                        <li className="social-icon-modal list-inline-item mb-2 mx-1">
                            <SocialMediaModal name="Facebook" icon="fa-brands fa-facebook" handleSocialLinkClick={handleSocialLinkClick} />
                        </li>
                        <li className="social-icon-modal list-inline-item mb-2 mx-1">
                            <SocialMediaModal name="Youtube" icon="fa-brands fa-youtube" handleSocialLinkClick={handleSocialLinkClick} />
                        </li>
                        <li className="social-icon-modal list-inline-item mb-2 mx-1">
                            <SocialUsernameModal name="Tumblr" icon="fa-brands fa-tumblr" handleSocialLinkClick={handleSocialLinkClick} urlPrefix="https://www.tumblr.com/"/>
                        </li>
                        <li className="social-icon-modal list-inline-item mb-2 mx-1">
                            <SocialUsernameModal name="Spotify" icon="fa-brands fa-spotify" handleSocialLinkClick={handleSocialLinkClick} urlPrefix="https://open.spotify.com/"/>
                        </li>
                        <li className="social-icon-modal list-inline-item mb-2 mx-1">
                            <SocialUsernameModal name="SoundCloud" icon="fa-brands fa-soundcloud" handleSocialLinkClick={handleSocialLinkClick} urlPrefix="https://soundcloud.com/"/>
                        </li>
                        <li className="social-icon-modal list-inline-item mb-2 mx-1">
                            <SocialUsernameModal name="PayPal" icon="fa-brands fa-paypal" handleSocialLinkClick={handleSocialLinkClick} urlPrefix="https://www.paypal.com/"/>
                        </li>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
        </>
    );
}

export default Socialmodal;
