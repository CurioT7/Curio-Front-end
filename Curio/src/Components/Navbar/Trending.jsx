import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { BsArrowUpRightCircle } from "react-icons/bs";
import React from 'react';
import './Trending.css';
import { Avatar } from '@chakra-ui/react';
import cover from "../../assets/cover.png";
import { getTrending } from './SearchingEndPoints';

function Trending(props) {
    const [trending, setTrending] = React.useState([]);
    React.useEffect(() => {
        async function fetchData() {
            const trendingData = await getTrending();
            setTrending(trendingData.posts);
            console.log(trendingData.posts);
        }
        fetchData();
    }, []);
    return (
        <Card variant='ghost'>
            <CardHeader paddingBottom={1} className='trending-header'>
            <BsArrowUpRightCircle/> <span>TRENDING TODAY</span>
            </CardHeader>
            <div className=' card-body'>
            <CardBody padding={3} className=' card-body-content'>
                <div>
                    <h5>  Post Title </h5>
                    <p className='trending-post-description'>Post Description</p>
                    <p className='trending-post-subreddit'> <Avatar size='2xs'/> <span>subreddits</span></p>
                </div>
                <div><img className="trending-img" src={cover} alt="logo"/></div>
            </CardBody>
            <h3 className="break-line-trending fw-bold mb-3 mx-2"></h3>
            </div>
            
        </Card>
    )
}

export default Trending;