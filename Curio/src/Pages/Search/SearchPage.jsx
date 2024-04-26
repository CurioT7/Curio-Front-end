import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Divider } from '@chakra-ui/react'
import {useNavigate} from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import UserResults from "./UserResults";
import CommunityResults from "./CommunityResults";

function SearchPage(){
    const { searchTerm } = useParams();
    const navigate = useNavigate();
    const [userResults, setUserResults] = useState([]);
    const [communityResults, setCommunityResults] = useState([]);

    const handleUserResults = async () => {
        try{
            const hostUrl = import.meta.env.VITE_SERVER_HOST;
            const response = await axios.get(`${hostUrl}/api/search/people/${searchTerm}`);
            setUserResults(response.data.users);
        }
        catch(error){
            console.log(error);
        }
    }

    const handleCommunityResults = async () => {
        try{
            const hostUrl = import.meta.env.VITE_SERVER_HOST;
            const response = await axios.get(`${hostUrl}/api/searchCommunities/${searchTerm}`);
            setCommunityResults(response.data.subreddits);
        }
        catch(error){
            console.log(error);
        }

    }

    useEffect(() => {
        handleUserResults();
        handleCommunityResults();
    }, [searchTerm]);


    const tabListRef = useRef();
    return (
        <div className="posts-content-container mt-5">
            <Tabs variant='soft-rounded'>
                <div className="d-flex flex-column">
                    <div className="d-flex">
                        <div className="d-flex align-items-center me-3 mt-2">
                            <h2 style={{color: "#576f76", fontSize: "0.75rem", fontWeight: "600"}}>SEARCH RESULTS</h2>
                        </div>
                            <TabList className="scrollableTabList" ref={tabListRef}>
                                <Tab>Posts</Tab>
                                <Tab>Communities</Tab>
                                <Tab>Comments</Tab>
                                <Tab>People</Tab>
                            </TabList>
                    </div>
                    <div>
                        <TabPanels>
                            <TabPanel>
                            </TabPanel>
                            <TabPanel>
                                {communityResults.length === 0 ? (
                                    <p>No search results</p>
                                ) : (
                                    <>
                                        {communityResults.map(community => (
                                            <>
                                                <CommunityResults name={community.name} members={community.members} />
                                                <hr className='col-md-6 mb-3' style={{backgroundColor: "#0000003F"}}></hr>
                                            </>
                                        ))}
                                    </>
                                )}
                            </TabPanel>
                            <TabPanel>
                            </TabPanel>
                            <TabPanel>
                                {userResults.length === 0 ? (
                                    <p>No search results</p>
                                ) : (
                                    <>
                                        {userResults.map(user => (
                                            <>
                                                <UserResults username={user.username} karma={user.karma} />
                                                <hr className='col-md-6 mb-3' style={{backgroundColor: "#0000003F"}}></hr>
                                            </>
                                        ))}
                                    </>
                                )}
                            </TabPanel>
                        </TabPanels>
                    </div>
                </div>
            </Tabs>
        </div>
    );
}

export default SearchPage;