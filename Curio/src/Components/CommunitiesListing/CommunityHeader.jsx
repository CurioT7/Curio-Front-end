import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import React from 'react';

function CommunityHeader({ props }) {
  const { Community } = useParams();
  const [community, setCommunity] = React.useState("Community");
useEffect(() => {
  setCommunity(Community);
}, [Community]);
  return (
    <div className="community-header container-lg ">
        <div className="row comm-background  text-center  d-block"> 
        
        </div>
        <div className='  mt-5 row'>
          <h2>r/{community}</h2>
        </div>
    </div>
  );
}
export default CommunityHeader;