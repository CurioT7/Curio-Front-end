import React, { useState , useEffect } from 'react';
import "./Banned.css";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Card, CardHeader, CardBody, CardFooter} from '@chakra-ui/react';
const VITE_SERVER_HOST = import.meta.env.VITE_SERVER_HOST;


function Banned({ communityName }) {
  const [isOpen, setIsOpen] = useState(false);
  const [bannedUsers, setBannedUsers] = useState([]);


  const openModal = () => {
    console.log('Opening modal...');
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

    // Extracting banned user details
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
  };

  fetchBannedUserDetails();
  console.log(bannedUsers);
}, []);

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
                <input type="text" placeholder='u/username' className='baninput'/>
                <p className='inputTitle'>REASON FOR BAN</p>
                <input type="text" placeholder='Reason'  className='baninput'/>
                <p className='inputTitle'>MOD NOTE</p>
                <input type="text" placeholder='Mod Note'  className='baninput'/>
                
              </ModalBody>

              <ModalFooter>
                <button className="BanUserBtn">Ban</button>
                <button className="CancelBtn" onClick={closeModal}>Cancel</button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
      </div>
     
    </div>
    <div className='BanContent'>
    <i class="_1c2rKv1iuQylye8ejI6-1v icon icon-ban"></i>
      <p>No banned users in u/community</p>
      {/* <ul>
        <li className='card'>
        <Card>
        <CardBody>
          <h6>banned</h6>
        </CardBody>
      </Card>
        </li>
      </ul> */}
      </div>
    </div>
  );
}

export default Banned;