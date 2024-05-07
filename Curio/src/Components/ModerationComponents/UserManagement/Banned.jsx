import React, { useState } from 'react';
import "./Banned.css";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter} from '@chakra-ui/react';

function Banned() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    console.log('Opening modal...');
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
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
      </div>
    </div>
  );
}

export default Banned;