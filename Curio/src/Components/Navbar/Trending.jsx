import { Card, CardBody} from '@chakra-ui/react'
import React from 'react';
import './searchList.css';

import { Avatar } from '@chakra-ui/react';
import cover from "../../assets/cover.png";


/**
 * Renders a trending card component.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.title - The title of the trending post.
 * @param {string} props.description - The description of the trending post.
 * @returns {JSX.Element} The rendered Trending component.
 */
function Trending(props) {
    const handleNavigate = () => {
    
        window.location.href = `/search/${props.description}`;
    }
    return (
        <Card variant='ghost'>
            {/* <CardHeader paddingBottom={1} className='trending-header'>
            <BsArrowUpRightCircle/> <span>TRENDING TODAY</span>
            </CardHeader> */}
            <div onClick={handleNavigate} className=' search-body'>
            <CardBody padding={3} paddingTop={3} marginTop={0} className=' trending-body-content'>
                <div>
                    <h5>  {props.title} </h5>
                    <p className='trending-post-description'>{props.description}</p>
                    <p className='trending-post-subreddit'> <Avatar data-testid="avatar"  size='2xs'/> <span>subreddits</span></p>
                </div>
                <div><img className="trending-img" src={cover} alt="logo"/></div>
            </CardBody>
            <h3 className="break-line-trending fw-bold mx-2"></h3>
            </div>
            
        </Card>
    )
}

export default Trending;