import { Card, CardBody} from '@chakra-ui/react'
import React from 'react';
import './searchList.css';
import './Trending.css';
import { Avatar } from '@chakra-ui/react';
import cover from "../../assets/cover.png";


function Trending(props) {
   
    return (
        <Card variant='ghost'>
            {/* <CardHeader paddingBottom={1} className='trending-header'>
            <BsArrowUpRightCircle/> <span>TRENDING TODAY</span>
            </CardHeader> */}
            <div className=' search-body'>
            <CardBody padding={3} paddingTop={3} marginTop={0} className=' trending-body-content'>
                <div>
                    <h5>  {props.title} </h5>
                    <p className='trending-post-description'>{props.description}</p>
                    <p className='trending-post-subreddit'> <Avatar size='2xs'/> <span>subreddits</span></p>
                </div>
                <div><img className="trending-img" src={cover} alt="logo"/></div>
            </CardBody>
            <h3 className="break-line-trending fw-bold mx-2"></h3>
            </div>
            
        </Card>
    )
}

export default Trending;