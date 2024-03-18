import './Feeding.css'
import { Switch, Flex, Spacer, Box } from '@chakra-ui/react'
import Titles from './childs/Titles';
import React from 'react';
import DropDown from './childs/DropDown';
function Feeding () {
    const [adultContent, setIsMature] = React.useState(false);
    const [autoplayMedia, setIsAuto] = React.useState(false)
    const [communityThemes, setCommunityThemes] =React.useState(false)
    const [communityContentSort, setCommunityContentSort] =React.useState('Hot'); 
    const [rememberContentSort, setCommRemember] = React.useState(false)
    const [globalContentView,setGlobalContentView] = React.useState('card')
    const [rememberContentView,setRememberContentView] = React.useState(false)
    const [openPostsInNewTab, setOpenPostsInNewTab] = React.useState(false)
    function handleIsMature (){
        setIsMature(!adultContent)
        // console.log(isMature)
    }
    // console.log(isMature)
    function handleIsAuto(){
        setIsAuto(!autoplayMedia)
    }

    function handleCommSort(e){
        setCommunityContentSort(e.target.value)
    }
    function handleCommRemember(){
        setCommRemember(!rememberContentSort)
    }
    function handleCommunityThemes(){
        setCommunityThemes(!communityThemes)
    }
    function handleGlobalContentView(e){
        setGlobalContentView(e.target.value)
    }
    function handleRememberContentView(){
        setRememberContentView(!rememberContentView)
    }
    function handleOpenPostsInNewTab(){
        setOpenPostsInNewTab(!openPostsInNewTab)
    }
    // Test Section
    console.log(adultContent)
    console.log(autoplayMedia)
    console.log(communityContentSort)
    console.log(rememberContentSort)
    console.log(globalContentView)
    console.log(rememberContentView)
    console.log(communityThemes)
    console.log(openPostsInNewTab)
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

export default Feeding ;