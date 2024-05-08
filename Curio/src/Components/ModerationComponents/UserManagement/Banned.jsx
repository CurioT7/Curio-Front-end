import React, { useState , useEffect } from 'react';
import "./Banned.css";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Card, CardHeader, CardBody, CardFooter} from '@chakra-ui/react';
const VITE_SERVER_HOST = import.meta.env.VITE_SERVER_HOST;


function Banned({ communityName }) {
  const [isOpen, setIsOpen] = useState(false);
  const [bannedUsers, setBannedUsers] = useState([]);
  const [subredditName, setSubredditName] = useState('');
  const [userToBan, setUserToBan] = useState('');
  const [violation, setViolation] = useState('');
  const [modNote, setModNote] = useState('');
  const [userMessage, setUserMessage] = useState('');


  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const getBannedUserDetails = async () => {
    const url = `${VITE_SERVER_HOST}/api/r/${communityName}/about/banned`;
    const token = localStorage.getItem('token');

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const responseData = await response.json();

    const bannedUsers = responseData.bannedUsers.map(bannedUser => ({
        banDetails: bannedUser.banDetails.map(banDetail => ({
            id: banDetail._id,
            bannedUsername: banDetail.bannedUsername,
            linkedSubreddit: banDetail.linkedSubreddit,
            violation: banDetail.violation,
            modNote: banDetail.modNote,
            userMessage: banDetail.userMessage,
            bannedBy: banDetail.bannedBy,
            __v: banDetail.__v
        })),
        userDetails: {
            id: bannedUser.userDetails._id,
            username: bannedUser.userDetails.username,
            email: bannedUser.userDetails.email,
            gender: bannedUser.userDetails.gender,
            karma: bannedUser.userDetails.karma,
            cakeDay: bannedUser.userDetails.cakeDay,
            socialLinks: bannedUser.userDetails.socialLinks,
        }
    }));


    return bannedUsers;
};

useEffect(() => {
  const fetchBannedUserDetails = async () => {
      const users = await getBannedUserDetails();
      setBannedUsers(users);
      console.log(users);
  };

  fetchBannedUserDetails();

//   console.log(bannedUsers);
}, [bannedUsers]);

useEffect(() => {
  setSubredditName(communityName);
}, [communityName]);

const banUser = async (subredditName, userToBan, violation, modNote, userMessage) => {
  const url = `${VITE_SERVER_HOST}/api/moderator/ban`;
    const token = localStorage.getItem('token');

    const body = {
        subredditName,
        userToBan,
        violation,
        modNote,
        userMessage
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    else 
    {
      // close nmodal 
      closeModal();
    }

    const responseData = await response.json();
    return responseData;
};
const unbanUser = async (subredditName, bannedUser) => {
    const url = `${VITE_SERVER_HOST}/api/moderator/unban`;
    const token = localStorage.getItem('token');

    const body = {
        subredditName,
        bannedUser
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const responseData = await response.json();
    return responseData;
};

  return (

    <div className='banpage'>
    <div className="d-flex justify-content-end me-5">
      <div>
        <button className="BanUserBtn" onClick={openModal}>Ban user</button>

        {isOpen && (
          <Modal isOpen={isOpen} onClose={closeModal}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Ban a user:</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <p className='inputTitle'>ENTER USERNAME</p>
                <input 
                    type="text" 
                    placeholder='u/username' 
                    className='baninput' 
                    value={userToBan} 
                    onChange={(e) => setUserToBan(e.target.value)}
                />                
                <p className='inputTitle'>REASON FOR BAN</p>
                <input 
                    type="text" 
                    placeholder='Reason' 
                    className='baninput' 
                    value={violation} 
                    onChange={(e) => setViolation(e.target.value)}
                />
                <p className='inputTitle'>MOD NOTE</p>
                <input type="text"
                 placeholder='Mod Note'  
                 className='baninput'
                 value={modNote}
                  onChange={(e) => setModNote(e.target.value)}
                 />
                <p>User Message</p>
                <input type="text"
                placeholder='user message'
                value={userMessage} 
                onChange={(e)=>setUserMessage(e.target.value)}/>
              </ModalBody>

              <ModalFooter>
                <button className="BanUserBtn"
                onClick={()=> banUser(subredditName, userToBan, violation, modNote, userMessage)}
                >Ban</button>
                <button className="CancelBtn" onClick={closeModal}>Cancel</button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
      </div>
     
    </div>
    <div className='BanContent'>
    <i class="_1c2rKv1iuQylye8ejI6-1v icon icon-ban"></i>
    {bannedUsers.length > 0 ? (
        <ul>
          
            {bannedUsers.map((user, index) => (
              <Card>
              <CardBody>
                    <div>{user.banDetails.length > 0 && user.banDetails[index].bannedUsername}</div>
                    <button className='BanUserBtn'
                    onClick={()=> unbanUser(subredditName, user.banDetails[index].bannedUsername)}
                    >
                      Unban</button>
              </CardBody>
            </Card>
            ))}
           
        </ul>
    ) : (
        <p>No banned users in u/community</p>
    )}
</div>
    </div>
  );
}

export default Banned;