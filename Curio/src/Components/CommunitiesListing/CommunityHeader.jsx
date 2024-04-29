import { useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { Avatar,Button,Image } from '@chakra-ui/react';
import logo from "../../assets/Loginbackground.jpg";
import React from 'react';
import { FaPlus } from "react-icons/fa6";
import { getSubredditInfo } from './CommunityEndPoints';

function CommunityHeader( props ) {
  const navigate = useNavigate();
  const { Community } = useParams();
  const [community, setCommunity] = React.useState("Community");
  const[isBackGround,setIsBackGround] = React.useState(false);
  const[background,setBackground] = React.useState("");
useEffect(() => {
  setCommunity(Community);
  async function fetchAndSetData() {
    const data = await getSubredditInfo(Community);
    if (data) {
      if(data.subreddit.banner){
        setTimeout(() => {
          setIsBackGround(true);
          setBackground(data.subreddit.banner);
        }, 0);
        
      }
    }
  }
  fetchAndSetData();
}, [Community]);
function handleCreatePost(){
  props.setSubreddit(Community);
  navigate(`/user/CreatePost`); 
}
  return (
    <div className="community-header container-lg ">
        {isBackGround?(<div className="mt-4 d-block"> 
          <Image src={logo}  className=" subreddit-background" />
        </div>):(<div className="mt-4 d-block comm-background"> 

        </div> )}
        <div className='d-flex gap-2 align-items-center me-5  mt-5 subreddit-name '>
          <div className='d-flex gap-2 align-items-center '>
            <Avatar size="lg" name={community} />
            <h2 className='align-self-end'>r/{community}</h2>
          </div> 
          <div>
            <Button onClick={handleCreatePost}  borderRadius={20} colorScheme='blue' variant='outline' size="md" className='mt-3 d-flex gap-2'> <FaPlus/> Create a Post</Button>
          </div>
        </div>
        
    </div>
  );
}
export default CommunityHeader;