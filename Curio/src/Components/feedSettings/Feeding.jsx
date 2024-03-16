import './Feeding.css'
import { Switch, Flex, Spacer, Box } from '@chakra-ui/react'
import Titles from './childs/Titles';
import React from 'react';
function Feeding () {
    const [isMature, setIsMature] = React.useState(false);
    const [isAuto, setIsAuto] = React.useState(false)
    function handleIsMature (){
        setIsMature(!isMature)
        // console.log(isMature)
    }
    // console.log(isMature)
    function handleIsAuto(){
        setIsAuto(!isAuto)
    }
    return(
        <div className='container'>
            <div className='customize-account'>
                <div className='settings-section col'>
                <h2 className="settings-heading ">Feeding settings</h2>
                <h3 className="headings-titles text-uppercase fw-bold mb-3">content preferences</h3>
                <Flex mb={5}  alignItems='center'>
                    <Titles title="Show mature(18+) content"
                            description="See NSFW (Not Safe for Work) mature and adult images, videos, written content, and other media in your Reddit feeds and search results."/> 
                    <Spacer/>
                    <Switch size='lg' isChecked={isMature} onChange={handleIsMature}></Switch>
                    
                </Flex>
                {/* Blur mature TODO */}
                <Flex mb={5}  alignItems='center'>
                    <Titles title="Autoplay media"
                            description="Play videos and gifs automatically when in the viewport."/> 
                    <Spacer/>
                    <Switch size='lg' isChecked={isAuto} onChange={handleIsAuto}></Switch>
                    
                </Flex>


                </div>
            </div>
        </div>
    )
    
}

export default Feeding ;