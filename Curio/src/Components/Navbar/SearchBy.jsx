import { Card, CardBody} from '@chakra-ui/react'
import { Avatar } from '@chakra-ui/react';
import './searchList.css';
/**
 * Renders a search result card with user or community details.
 *
 * @param {Object} props - The component props.
 * @param {string} props.type - The type of search result (either "user" or "comm").
 * @param {string} props.name - The name of the user or community.
 * @param {string} props.description - The description of the user or community.
 * @param {string} props.avatar - The URL of the user's avatar image.
 * @returns {JSX.Element} The rendered component.
 */
function SearchBy(props){
    const handleNavigate = () => {
        if(props.type==="user"){
            window.location.href = `/user/${props.name}`;
        }
        else if(props.type==="comm"){
            window.location.href = `/r/${props.name}`;
        }
    }
    return (
        <Card variant='ghost'>
            <div onClick={handleNavigate}  className=' search-body'>
                <CardBody padding={3} paddingTop={3} marginTop={0} className=' searchBy-body-content'>
                    <div>
                        
                        {props.avatar&&<Avatar data-testid="avatar" name={props.name} src={toString(props.avatar)} size='xs'/>}
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