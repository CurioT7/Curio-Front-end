import { useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { Avatar,Button,Image,useToast } from '@chakra-ui/react';

import React from 'react';
import { FaPlus } from "react-icons/fa6";
import { getSubredditInfo,getJoinedCommunities,joinSubCurio,unJoinSubCurio} from './CommunityEndPoints';
import { Link } from 'react-router-dom';



function CommunityHeader( props ) {
  const toast = useToast();
  const navigate = useNavigate();
  const { Community } = useParams();
  const [community, setCommunity] = React.useState("Community");
  const [isJonied, setIsJoined] = React.useState(false);
  const[banner,setBanner] = React.useState("");
  const[icon,setIcon] = React.useState("");
  
  function Toast(message,type){
    toast({
      description: message,
      status: type,
      duration: 2000,
      isClosable: true,
    });
  
  }
  useEffect(() => {
    setCommunity(Community);
    async function fetchAndSetData() {
      //const data = await getSubredditInfo(Community);
      const joinedCommunities = await getJoinedCommunities(localStorage.getItem('username'));
      // if (data) {
      //   if(data.subreddit.banner){
      //     setBanner(data.subreddit.banner);
      //   }
      //   else{
      //     setBanner("");
          
      //   }
      // }
      if(joinedCommunities){
        joinedCommunities.communities.map((community)=>{
          if(community.name === Community){
            setIsJoined(true);
            if(community.banner){
              setBanner(community.banner);
            }
            else{
              setBanner("");
            }
          }
          if(community.icon){
            setIcon(community.icon);
          }
          else{
            setIcon("");
          }
          
        })
      }
      

    }
    fetchAndSetData();
  }, [Community]);

  async function handleJoin(){
    
    const data = await joinSubCurio(Community);
    if(data){
      setIsJoined(true);
    }else{
      Toast("Failed to join community","error");
    }
  }
  async function handleUnJoin(){
    const data = await unJoinSubCurio(Community);
    if(data){
      setIsJoined(false); 
  }
  else{
    Toast("Failed to unjoin community","error");
  
  }
}
  function handleCreatePost(){
    props.setSubreddit(Community);
    navigate(`/user/CreatePost`); 
  }
  return (
    <div className="community-header mb-3 container-lg ">
        {banner?(<div className="mt-4 d-block"> 
          <Image src={banner}  className=" subreddit-background" />
        </div>):(<div className="mt-4 d-block comm-background"> 

        </div> )}
        <div className='d-flex gap-2 align-items-center me-5  mt-5 subreddit-name '>
          <div className='d-flex gap-2 align-items-center '>
            <Avatar src={icon} size="lg" name={community} />
            <h2 className='align-self-end'>r/{community}</h2>
          </div> 
          <div className='d-flex mt-3 gap-2 '>
            <Button onClick={handleCreatePost}  borderColor=' rgb(45, 53, 55)'  borderRadius={20}  variant='outline' className=' comm-black-button d-flex gap-2'> <FaPlus/> Create a Post</Button>
            {isJonied ?(<Button onClick={handleUnJoin} borderRadius={20} borderColor=' rgb(45, 53, 55)' className=' comm-black-button' variant='outline' >Joined</Button>):(<Button borderRadius={20} className='comm-join-button' onClick={handleJoin}>Join</Button>)}
            {props.isModerator ? (
            <Link to={`/r/${Community}/about/modqueue`} >
            <Button borderRadius={20} className='comm-join-button' variant='outline'>Mod tools</Button>
            </Link>) :
            null}
          </div>
        </div>
        
    </div>
  );
}
export default CommunityHeader;