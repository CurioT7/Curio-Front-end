import { Card, CardBody} from '@chakra-ui/react'
import { Avatar } from '@chakra-ui/react';
import './searchList.css';
function SearchBy(props){

    return (
        <Card variant='ghost'>
            <CardBody padding={3} paddingTop={3} marginTop={0} className=' searchBy-body-content'>
                <div>
                    <Avatar size='2xs'/>
                </div>
                <div>
                    <h5>  {props.title} </h5>
                    <p className='trending-post-description'>{props.description}</p>
                    <p className='trending-post-subreddit'>  <span>subreddits</span></p>
                </div>

            </CardBody>
        </Card>
    )
}

export default SearchBy;