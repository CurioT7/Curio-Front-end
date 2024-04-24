import React, { useState, useEffect } from "react";
import './Feeding.css'
import { Switch, Flex, Spacer, Box, useToast } from '@chakra-ui/react'
import Titles from './childs/Titles';
import DropDown from './childs/DropDown';
import { sendUserDataToBackend,fetchUserDataFromBackend } from '../UserSetting/UserSettingsEndPoints';

function Feeding () {
    const toast = useToast()
    const [adultContent, setIsMature] = useState(false);
    const [autoplayMedia, setIsAuto] = useState(false)
    const [communityThemes, setCommunityThemes] = useState(false)
    const [communityContentSort, setCommunityContentSort] = useState('Hot'); 
    const [rememberContentSort, setCommRemember] = useState(false)
    const [globalContentView,setGlobalContentView] = useState('card')
    const [rememberContentView,setRememberContentView] = useState(false)
    const [openPostsInNewTab, setOpenPostsInNewTab] = useState(false)
    
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
        sendUserDataToBackend({adultContent: !adultContent})
        Toast();
        
    }
    
    function handleIsAuto(){
        setIsAuto(!autoplayMedia);
        sendUserDataToBackend({autoplayMedia: !autoplayMedia});
        Toast();
    }

    function handleCommSort(e){
        setCommunityContentSort(e.target.value)
        sendUserDataToBackend({communityContentSort: e.target.value})
        Toast()
    }
    function handleCommRemember(){
        setCommRemember(!rememberContentSort)
        sendUserDataToBackend({rememberPerCommunity:{rememberContentSort: !rememberContentSort,
                                                rememberContentView: rememberContentView}})
        Toast()
    }
    function handleCommunityThemes(){
        setCommunityThemes(!communityThemes)
        sendUserDataToBackend({communityThemes: !communityThemes})
        Toast()
    }
    function handleGlobalContentView(e){
        setGlobalContentView(e.target.value)
        sendUserDataToBackend({globalContentView: e.target.value})
        Toast()
    }
    function handleRememberContentView(){
        setRememberContentView(!rememberContentView)
        sendUserDataToBackend({rememberPerCommunity:{rememberContentView: !rememberContentView
                                                ,rememberContentSort: rememberContentSort}})
        Toast()
    }
    function handleOpenPostsInNewTab(){
        setOpenPostsInNewTab(!openPostsInNewTab)
        sendUserDataToBackend({openPostsInNewTab: !openPostsInNewTab})
        Toast()
    }    
   
    useEffect(() => {
        async function fetchAndSetData() {
            const data = await fetchUserDataFromBackend();
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
    
    return(
        <div className='container'>
            <div className='customize-account'>
                <div className='feeding-settings-section col'>
                    <h2 className="settings-heading ">Feeding settings</h2>
                    <h3 className="headings-titles text-uppercase fw-bold mb-3">content preferences</h3>
                    <Box>
                        <Flex mb={5}  alignItems='center'>
                            <Titles title="Show mature(18+) content"
                                    description="See NSFW (Not Safe for Work) mature and adult images, videos, written content, and other media in your Reddit feeds and search results."/> 
                            <Spacer/>
                            <Switch size='lg' data-testid="adult-content-switch" isChecked={adultContent} onChange={handleIsMature}></Switch>
                            
                        </Flex>
                    </Box>
                    
                    {/* Blur mature TODO */}
                    <Box>
                        <Flex className='col'  mb={5}  alignItems='center'>
                            <Titles title="Autoplay media"
                                    description="Play videos and gifs automatically when in the viewport."/> 
                            <Spacer/>
                            <Switch size='lg' data-testid="auto-play-media" isChecked={autoplayMedia} onChange={handleIsAuto}></Switch>
                            
                        </Flex>
                    </Box>
                    <Box>
                        <Flex mb={5}  alignItems='center'>
                            <Titles title="Community themes"
                                    description="Use custom themes for all communities. You can also turn this off on a per community basis."/> 
                            <Spacer/>
                            <Switch size='lg' data-testid="community-themes" isChecked={communityThemes} onChange={handleCommunityThemes}></Switch>
                            
                        </Flex>
                    </Box>
                    <DropDown isSort={true} isGlobal={false} data-testid="community-content-sort"  isChecked={rememberContentSort} value={communityContentSort} onChangeSort={handleCommSort} onChangeRemember={handleCommRemember}/>
                    <DropDown isSort={false} isGlobal={true} data-testid="global-content-view" isChecked={rememberContentView} value={globalContentView} onChangeSort={handleGlobalContentView} onChangeRemember={handleRememberContentView}/>
                    <Box>
                        <Flex mb={5}  alignItems='center'>
                            <Titles title="Open posts in new tab"
                                    description="Enable to always open posts in a new tab."/> 
                            <Spacer/>
                            <Switch size='lg' data-testid="post-new-tab" isChecked={openPostsInNewTab} onChange={handleOpenPostsInNewTab}></Switch>
                            
                        </Flex>
                    </Box>
                    
                </div>
            </div>
        </div>
    )
    
}

export default Feeding;