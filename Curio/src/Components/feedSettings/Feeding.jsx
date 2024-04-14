import './Feeding.css'
import { Switch, Flex, Spacer, Box, useToast } from '@chakra-ui/react'
import Titles from './childs/Titles';
import React from 'react';
import DropDown from './childs/DropDown';
import axios from 'axios';


function Feeding () {
    const serverHost = import.meta.env.VITE_SERVER_HOST;
    const toast = useToast()
    const [adultContent, setIsMature] = React.useState(false);
    const [autoplayMedia, setIsAuto] = React.useState(false)
    const [communityThemes, setCommunityThemes] =React.useState(false)
    const [communityContentSort, setCommunityContentSort] =React.useState('Hot'); 
    const [rememberContentSort, setCommRemember] = React.useState(false)
    const [globalContentView,setGlobalContentView] = React.useState('card')
    const [rememberContentView,setRememberContentView] = React.useState(false)
    const [openPostsInNewTab, setOpenPostsInNewTab] = React.useState(false)
    
    function Toast(){
        toast({
            
            description: "Changes Saved",
            status: 'info',
            duration: 3000,
            isClosable: true,
          })
    }
    function handleIsMature (){
        setIsMature(!adultContent)
        sendDataToBackend({adultContent: !adultContent})
        Toast();
        // console.log(isMature)
    }
    // console.log(isMature)
    function handleIsAuto(){
        setIsAuto(!autoplayMedia);
        sendDataToBackend({autoplayMedia: !autoplayMedia});
        Toast();
    }

    function handleCommSort(e){
        setCommunityContentSort(e.target.value)
        sendDataToBackend({communityContentSort: e.target.value})
        Toast()
    }
    function handleCommRemember(){
        setCommRemember(!rememberContentSort)
        sendDataToBackend({rememberPerCommunity:{rememberContentSort: !rememberContentSort,
                                                rememberContentView: rememberContentView}})
        Toast()
    }
    function handleCommunityThemes(){
        setCommunityThemes(!communityThemes)
        sendDataToBackend({communityThemes: !communityThemes})
        Toast()
    }
    function handleGlobalContentView(e){
        setGlobalContentView(e.target.value)
        sendDataToBackend({globalContentView: e.target.value})
        Toast()
    }
    function handleRememberContentView(){
        setRememberContentView(!rememberContentView)
        sendDataToBackend({rememberPerCommunity:{rememberContentView: !rememberContentView
                                                ,rememberContentSort: rememberContentSort}})
        Toast()
    }
    function handleOpenPostsInNewTab(){
        setOpenPostsInNewTab(!openPostsInNewTab)
        sendDataToBackend({openPostsInNewTab: !openPostsInNewTab})
        Toast()
    }
    //send and get data from backend//
    async function sendDataToBackend(data) {
    // console.log(localStorage.getItem('token'));

        // Validate data
        if (!data || typeof data !== 'object') {
            console.error('Invalid data:', data);
            return;
        }
        try {
           
            const response = await axios.patch(`${serverHost}/api/settings/v1/me/prefs`, data, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            // console.log(response)
            // Handle response if needed
            return response;
        } catch (error) {
            console.error('Error sending data to backend:', error);
            // Handle error if needed
        }
    }

    async function fetchDataFromBackend() {
        const token = localStorage.getItem('token');
        // console.log(token)
        if (!token) {
        console.error('No token found');
        return;
        }
        try {
            
            const response = await axios.get(`${serverHost}/api/settings/v1/me/prefs`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching data from backend:', error);
        }
    }
    React.useEffect(() => {
        async function fetchAndSetData() {
            const data = await fetchDataFromBackend();
            if (data) {
                setIsMature(data.adultContent);
                setIsAuto(data.autoplayMedia);
                setCommunityThemes(data.communityThemes);
                setCommunityContentSort(data.communityContentSort);
                setCommRemember(data.rememberPerCommunity.rememberContentSort);
                setGlobalContentView(data.globalContentView);
                setRememberContentView(data.rememberPerCommunity.rememberContentView);
                setOpenPostsInNewTab(data.openPostsInNewTab);
            }
        }

        fetchAndSetData();
    }, []);
    // Test Section
    // console.log(adultContent)
    // console.log(autoplayMedia)
    // console.log(communityContentSort)
    // console.log(rememberContentSort)
    // console.log(globalContentView)
    // console.log(rememberContentView)
    // console.log(communityThemes)
    // console.log(openPostsInNewTab)
    //----------------------------------//
    return(
        <div className='container'>
            <div className='customize-account'>
                <div className='settings-section col'>
                    <h2 className="settings-heading ">Feeding settings</h2>
                    <h3 className="headings-titles text-uppercase fw-bold mb-3">content preferences</h3>
                    <Box>
                        <Flex mb={5}  alignItems='center'>
                            <Titles title="Show mature(18+) content"
                                    description="See NSFW (Not Safe for Work) mature and adult images, videos, written content, and other media in your Reddit feeds and search results."/> 
                            <Spacer/>
                            <Switch size='lg' isChecked={adultContent} onChange={handleIsMature}></Switch>
                            
                        </Flex>
                    </Box>
                    
                    {/* Blur mature TODO */}
                    <Box>
                        <Flex className='col'  mb={5}  alignItems='center'>
                            <Titles title="Autoplay media"
                                    description="Play videos and gifs automatically when in the viewport."/> 
                            <Spacer/>
                            <Switch size='lg' isChecked={autoplayMedia} onChange={handleIsAuto}></Switch>
                            
                        </Flex>
                    </Box>
                    <Box>
                        <Flex mb={5}  alignItems='center'>
                            <Titles title="Community themes"
                                    description="Use custom themes for all communities. You can also turn this off on a per community basis."/> 
                            <Spacer/>
                            <Switch size='lg' isChecked={communityThemes} onChange={handleCommunityThemes}></Switch>
                            
                        </Flex>
                    </Box>
                    <DropDown isSort={true} isGlobal={false}  isChecked={rememberContentSort} value={communityContentSort} onChangeSort={handleCommSort} onChangeRemember={handleCommRemember}/>
                    <DropDown isSort={false} isGlobal={true}  isChecked={rememberContentView} value={globalContentView} onChangeSort={handleGlobalContentView} onChangeRemember={handleRememberContentView}/>
                    <Box>
                        <Flex mb={5}  alignItems='center'>
                            <Titles title="Open posts in new tab"
                                    description="Enable to always open posts in a new tab."/> 
                            <Spacer/>
                            <Switch size='lg' isChecked={openPostsInNewTab} onChange={handleOpenPostsInNewTab}></Switch>
                            
                        </Flex>
                    </Box>
                    
                </div>
            </div>
        </div>
    )
    
}

export default Feeding;