import React from "react";
import Header from "../../../Pages/Moderation/header";
import ModSidebar from "../../../Pages/Moderation/ModerationSidebar/ModSidebar";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Divider } from '@chakra-ui/react'
import'./Rules.css'


function Rules( props ) {
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
                </Tab>
                <Tab>
                    Removal reasons
                </Tab>
            </TabList>
            <TabPanels>
               <TabPanel>
               <div className="d-flex justify-content-end me-5 ">
               <button className="BanUserBtn" >Add Rule</button>

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