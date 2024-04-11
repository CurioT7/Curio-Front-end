import React, { useState, useEffect  } from "react";
import axios from 'axios';
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

function Socialmodal(props){
    const serverHost = import.meta.env.VITE_SERVER_HOST;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedSocialLinks, setSelectedSocialLinks] = useState([]);

    const handleSocialLinkClick = (url, name, iconClass) => {
        if (selectedSocialLinks.length < 5) { 
            setSelectedSocialLinks([...selectedSocialLinks, { name: name, link: url, icon: iconClass }]);
            patchSocialLink(iconClass, name, url);
            // console.log(iconClass)
        }
    };
    
    const handleRemoveSocialLink = (index) => {
        const linkToRemove = selectedSocialLinks[index];
        window.open(linkToRemove.link, "_blank"); // Open the link in a new tab
        const updatedLinks = [...selectedSocialLinks];
        updatedLinks.splice(index, 1);
        setSelectedSocialLinks(updatedLinks);
    };

    const patchSocialLink = (iconClass, name, url) => {
        let platform;
        switch(iconClass) {
            case "fa-solid fa-link":
                platform = "Custom URL";
                break;
            case "fa-brands fa-instagram":
                platform = "Instagram";
                break;
            case "fa-brands fa-twitter":
                platform = "Twitter";
                break;
            case "fa-brands fa-tiktok":
                platform = "TikTok";
                break;
            case "fa-brands fa-twitch":
                platform = "Twitch";
                break;
            case "fa-brands fa-facebook":
                platform = "Facebook";
                break;
            case "fa-brands fa-youtube":
                platform = "Youtube";
                break;
            case "fa-brands fa-tumblr":
                platform = "Tumblr";
                break;
            case "fa-brands fa-spotify":
                platform = "Spotify";
                break;
            case "fa-brands fa-soundcloud":
                platform = "SoundCloud";
                break;
            case "fa-brands fa-paypal":
                platform = "PayPal";
                break;
            default:
                platform = "Unknown";
        }
    
        // Construct the new social link object
        // const newLink = { displayName: name, url: url, platform: platform };
        // console.log(newLink)
    
        axios.patch(`${serverHost}/api/settings/v1/me/prefs`, {
            socialLinks: [...selectedSocialLinks, { displayName: name, url: url, platform: platform }] // Append the new link to the existing list
        },{
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}` 
            }
        }).then(response => {
            // Handle successful patching if needed
        }).catch(error => {
            // Handle error if needed
        });

        // console.log(socialLinks)
    };
    
    // Fetch Function
    useEffect(() => {
        async function fetchsocialLinks() {
            try {
                const response = await axios.get(`${serverHost}/api/settings/v1/me/prefs`, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('token')}` 
                    }
                });
                const formattedSocialLinks = response.data.socialLinks.map(link => ({
                    link: link.url,
                    name: link.displayName,
                    icon: `fa-brands fa-${link.platform}`,
                }));
                setSelectedSocialLinks(formattedSocialLinks || []); 

            } catch (error) {
                if (error.response){
                    switch (error.response.status) {
                        case 404:
                            console.error("User preferences not found.");
                            break;    
                        case 500:
                            console.error("An unexpected error occurred on the server. Please try again later.");
                            break;
                        default:
                            break;
                    }
                }
            }
        }
        fetchsocialLinks();
    }, []);
    

    return(
        <>
        {Array.isArray(selectedSocialLinks) && selectedSocialLinks.slice(0, 5).map((link, index) => (
            <div key={index} className="selected-social-link">
                <i className={link.icon}/> {link.name}
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
