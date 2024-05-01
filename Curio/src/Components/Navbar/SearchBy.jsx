import { Card, CardBody} from '@chakra-ui/react'
import { Avatar } from '@chakra-ui/react';
import './searchList.css';
function SearchBy(props){

    return (
        <Card variant='ghost'>
            <div className=' search-body'>
                <CardBody padding={3} paddingTop={3} marginTop={0} className=' searchBy-body-content'>
                    <div>
                        {console.log(props.avatar)}
                        {props.avatar&&<Avatar src={toString(props.avatar)} size='xs'/>}
                    </div>
                    { props.type==="user" &&<div className='searchBy-details'>
                        
                        <p className='search-user'>u/{props.name}</p>
                        <p className='trending-post-subreddit'>  <span>{props.description} karma</span></p>
                    </div>
                    }
                    { props.type==="comm" &&<div className='searchBy-details'>
                        <p className='search-user'>r/{props.name}</p>
                        <p className='trending-post-subreddit'>  <span>{props.description} members</span></p>
                        </div>
                    }

                </CardBody>
            </div>
        </Card>
    )
}

export default SearchBy;