import React from "react";
import Header from "../../../Pages/Moderation/header";
import ModSidebar from "../../../Pages/Moderation/ModerationSidebar/ModSidebar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Tabs, TabList, TabPanels, Tab, TabPanel, Divider } from '@chakra-ui/react'
import'./Rules.css'


function Rules( props ) {

  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    console.log('Opening modal...');
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const { Community } = useParams();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    props.hideSidebar();
    return () => {
      props.showSidebar();
    };
  }, []);


  return (
    <div style={{marginTop:"4rem"}}>
    <Header />
    <ModSidebar communityName={Community}/>
    <div style={{marginLeft: "17rem" }}>
      <h6>Rules and Removal Reasons</h6>
      <br />
      <div className="RuleTabs">
        <Tabs variant='soft-rounded'colorScheme='gray'>
            <TabList>
            <Tab>
    Rules
    {isOpen && (
        <Modal isOpen={isOpen} onClose={closeModal}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add Rule</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <p className="inputTitle">Rule</p>
                    <input type="text" placeholder="Rule displayed (e.g. No photos)"  className="ruleinput"/>
                    <div className="radiobtn">
                  <p className="inputTitle">Applies to</p>
                   <label>
                  <input type="radio" name="choice" value="post_only" />
                  Posts Only
              </label>
              <br />
              <label>
                  <input type="radio" name="choice" value="comment_only" />
                  Comments Only
              </label>
              <br />
              <label>
                  <input type="radio" name="choice" value="post_and_comment" />
                  Posts & Comments
              </label>
              </div>
              <div>
              <p className="inputTitle">Report Reason</p>
              <b className="ruletitle">Defaults to rules name if left blank</b>
              <br />
              </div>
              <input type="text"
              className="ruleinput"
              placeholder="Reason rule is broken (e.g. This is a photo)"
               />

               <p className="inputTitle">Full Description</p>
               <input type="text" 
               className="describetext"
               placeholder="Enter the full decription of the rule."
               />
                </ModalBody>
                <ModalFooter>
                    <button onClick={closeModal} className="buttonrule">Close</button>
                    <button className="BanUserBtn">Add New Rule</button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )}
</Tab>
                <Tab>
                    Removal reasons
                </Tab>
            </TabList>
            <TabPanels>
               <TabPanel>
               <div className="d-flex justify-content-end me-5 ">
               <button className="BanUserBtn" onClick={openModal} >Add Rule</button>

            <button className="buttonrule">
                Reorder Rules
            </button>
            </div>
            <div className="rulesnote"> These are rules that visitors must follow to participate. They can be used as reasons to report or ban posts, comments, and users. Communities can have a maximum of 15 rules.</div>
               </TabPanel>
               <TabPanel>
                hii
               </TabPanel>
            </TabPanels>
        </Tabs>
      </div>
        
      </div>
      </div>
  );
}

export default Rules;