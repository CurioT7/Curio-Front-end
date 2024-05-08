import React from "react";
import { useState, useEffect, useRef } from "react";
import Ellipsis from "../../styles/icons/Elippsis";
import SaveButton from "../../styles/icons/SaveButton";
import FilledSave from "../../styles/icons/FilledSave";
import ReportPost from "../../styles/icons/ReportPost";
import Hide from "../../styles/icons/Hide";
import ReportReason  from "./ReportReason.jsx";
import ReportSubmitted from "./ReportSubmitted.jsx";
import ReportExtraReason from "./ReportExtraReason.jsx";
import axios from "axios";
import {useToast} from '@chakra-ui/react';
import FilledHide from "../../styles/icons/FilledHide";
import Delete from "../../styles/icons/Delete.jsx";
const VITE_SERVER_HOST = import.meta.env.VITE_SERVER_HOST;



function PostControl(props) {
  const toast = useToast();
  const [showControls, setShowControls] = useState(false);
  const [isReportReasonModalOpen, setReportReasonModalOpen] = useState(false);
  const [isReportSubmittedModalOpen, setReportSubmittedModalOpen] = useState(false);
  const [isExtraReasonModalOpen, setExtraReasonModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isPostAuthor, setIsPostAuthor] = useState(false);
  const [isSpoiler, setIsSpoiler] = useState(props.isSpoiler);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowControls(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  useEffect(() => {
    if (props.username === localStorage.getItem('username')) {
      setIsPostAuthor(true);
    } else {
      setIsPostAuthor(false);
    }
    if (props.savedPosts && props.savedPosts.some(post => post._id === props._id)) {
      setIsSaved(true);
    } else {
      setIsSaved(false);
    }
    if (props.hiddenPosts && props.hiddenPosts.some(post => post._id === props._id)) {
      console.log('useEffect')
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
    if (localStorage.getItem('token')){
      setIsAuthenticated(true);
    }
    else{
      setIsAuthenticated(false);
    }
    if (props.isSpoiler) {
    setIsSpoiler(true);
    } else {
        setIsSpoiler(false);
    }
    window.addEventListener('loginOrSignup', () => {
        if (localStorage.getItem('token')){
          setIsAuthenticated(true);
        }
        else{
          setIsAuthenticated(false);
        }
      }
    )
    return () => {
      window.removeEventListener('loginOrSignup', () => {
        if (localStorage.getItem('token')){
          setIsAuthenticated(true);
        }
        else{
          setIsAuthenticated(false);
        }
      })
    }
  }, [props.savedPosts, props._id, props.hiddenPosts]);


    
  const handleOpenReportModal = () => {
    setReportReasonModalOpen(true);
  }
  const handleEllipsisClick = () => {
    setShowControls(!showControls);
  };
  const handleShowSubmittedReport = () => {
    setShowControls(false);
    setReportReasonModalOpen(false);
    setReportSubmittedModalOpen(true);
  }
  const handleSetReportReason = (reason) => {
    console.log(reason)
    setReportReason(reason);
  }
  const handleShowExtraReasons = () => {
    setShowControls(false);
    setExtraReasonModalOpen(true);
  }
  const handleBackToReasonModal = () => {
    setExtraReasonModalOpen(false);
    setReportReasonModalOpen(true);
  }
  const showSubmittedFinalReport = () => {
    setExtraReasonModalOpen(false);
    setReportSubmittedModalOpen(true);
  }
  const handleHide = async () => {
    try{
      var hostUrl = import.meta.env.VITE_SERVER_HOST;
      const response = await axios.post(`${hostUrl}/api/hide`, {
        postId: props._id
      },
       {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.status === 200){
        toast({
          description: "Post Hidden",
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
        setIsHidden(true);
        window.dispatchEvent(new Event('hideOrSave'));
      }
    }
    catch(err){
      console.log(err);
      if (err.response.status === 409){
        toast({
          description: "Item already hidden.",
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      }
      else{
        toast({
          description: "Server Error Occured.",
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      
      }
    }
  }

  const handleUnhide = async () => {
    try{
      var hostUrl = import.meta.env.VITE_SERVER_HOST;
      const response = await axios.post(`${hostUrl}/api/unhide`, {
        postId: props._id
      },
       {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.status === 200){
        toast({
          description: "Post Unhidden",
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
        setIsHidden(false);
      }
    }
    catch(err){
      console.log(err);
      if (err.response.status === 409){
        toast({
          description: "Item already unhidden.",
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      }
      else{
        toast({
          description: "Server Error Occured.",
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      }
    }
  }

  const handleSave = async () => {
    try{
      var hostUrl = import.meta.env.VITE_SERVER_HOST;
      const response = await axios.post(`${hostUrl}/api/save`, {
        category: "post",
        id: props._id
      },
       {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.status === 200){
        toast({
          description: "Post saved.",
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
        setIsSaved(true);
      }
    }
    catch(err){
      if (err.response.status === 400){
        toast({
          description: "post already saved.",
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      }
      else{
        toast({
          description: "Server Error Occured.",
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      }
    }
  }

  const handleUnsave = async () => {
    try{
      var hostUrl = import.meta.env.VITE_SERVER_HOST;
      const response = await axios.post(`${hostUrl}/api/unsave`, {
        category: "post",
        id: props._id
      },
       {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.status === 200){
        toast({
          description: "Removed From Save.",
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
        setIsSaved(false);
        window.dispatchEvent(new Event('hideOrSave'));
      }
    }
    catch(err){
      console.log(err);
      if (err.response.status === 400){
        toast({
          description: "post already unsaved.",
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      }
    }
  }

  const handleSaveOrUnsave = () => {
    if (isSaved) {
      handleUnsave();
    } else {
      handleSave();
    }
  }

  const handleHideOrUnhide = () => {
    if (isHidden) {
      handleUnhide();
      props.hidePost();
    } else {
      handleHide();
      props.hidePost();
    }
  }

  const handleDeletePost = async () => {
    try{
      var hostUrl = import.meta.env.VITE_SERVER_HOST;
      const response = await axios.delete(`${hostUrl}/api/deletepost/${props._id}`,
       {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.status === 200){
        toast({
          description: "Post Deleted",
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
        window.dispatchEvent(new Event('deletePost'));
      }
    }
    catch(err){
      console.log(err);
      toast({
        description: "Server Error Occured.",
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }

// const handleUnspoilerClick = async (postID) => {
//     setIsSpoiler(!isSpoiler);
//     const url = `${VITE_SERVER_HOST}/api/unspoil`;
//     const body = {
//         postId: postID
//     };

//     const token = localStorage.getItem('token'); // replace this with how you store your token

//     const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(body)
//     });

//     if (!response.ok) {
//         throw new Error('Network response was not ok');
//     }

//     const responseData = await response.json();
//     return responseData;
// };

// const handleSpoilerClick = async (postID) => {
//   // toggle props.isSpoiler
//   setIsSpoiler(!isSpoiler);
//     const url = `${VITE_SERVER_HOST}/api/spoil`;
//     const body = {
//         postId: postID
//     };

//     const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(body)
//     });

//     if (!response.ok) {
//         throw new Error('Network response was not ok');
//     }

//     const responseData = await response.json();
//     return responseData;
// };

  return (
    <>
      <div ref={dropdownRef}>
        <button className="post-dropdown-control d-flex justify-content-center align-items-center" onClick={handleEllipsisClick}>
          <Ellipsis className="ellipsis-img" />
        </button>
        {showControls && <div style={{ 
                                          display: showControls ? 'flex' : 'none',
                                          flexDirection: 'column',
                                          alignItems: 'flex-start',
                                          position: 'absolute',
                                          top: (props.postDetails == false) ? '0' : '5rem',
                                          right: (props.postDetails == false) ? '0' : '25rem',
                                          backgroundColor: '#FFFFFF',
                                          borderRadius: '10px',
                                          boxShadow: '2px 6px 10px rgba(0, 0, 0, 0.4)',
                                          marginTop: '2.5rem',
                                          marginRight: '1rem',
                                          padding: '0px',
                                          width: isSaved ? '2rem !important' : '2.5rem !important',
                                          height: '0.5rem!important',
                                          zIndex: '1'
                                      }}>
                                          <ul className='drop-down-list w-100 px-0'>
                                              {isAuthenticated && 
                                                <li onClick={handleSaveOrUnsave} className="drop-down-item ps-3 dropdown-list-post-control d-flex align-items-center">
                                                        {isSaved ? <FilledSave /> : <SaveButton /> }
                                                        <div className="d-flex align-items-center justify-content-center"><p className='mt-3 me-2 text-text d-flex'>{isSaved ? "Remove from save" : "Save"}</p></div>
                                                </li>
                                              }
                                              {isAuthenticated && 
                                                <li onClick={handleHideOrUnhide} className="drop-down-item ps-3 dropdown-list-post-control d-flex align-items-center">
                                                        {isHidden ? <FilledHide /> : <Hide />}
                                                        <div><p className='mt-3 text-text'>{isHidden ? "Remove from hide" : "Hide"}</p></div>
                                                </li>
                                              }
                                              <li onClick={handleOpenReportModal} className="drop-down-item ps-3 dropdown-list-post-control d-flex align-items-center">
                                                      <ReportPost />
                                                      <div><p className='mt-3 me-2 text-text'>Report</p></div>
                                              </li>
                                              {isPostAuthor && 
                                                <li onClick={handleDeletePost} className="drop-down-item ps-3 dropdown-list-post-control d-flex align-items-center">
                                                      <Delete />
                                                      <div><p className='mt-3 me-2 text-text'>Delete</p></div>
                                                </li>
                                              }
                                              {
                                                isSpoiler &&
                                                <li className="drop-down-item ps-3 dropdown-list-post-control d-flex align-items-center" onClick={()=> setIsSpoiler(!isSpoiler)} >
                                                  <svg rpl="" fill="currentColor" height="20" icon-name="spoiler-outline" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M9.463 15.384A1.092 1.092 0 0 1 9.076 15a1.033 1.033 0 0 1-.143-.537c-.002-.186.047-.369.143-.529.093-.16.227-.293.387-.387.16-.097.345-.148.533-.147a1.05 1.05 0 0 1 .537.141 1.076 1.076 0 0 1 .537.921c0 .188-.051.373-.148.535-.096.159-.23.292-.39.386a1.042 1.042 0 0 1-.536.143 1.026 1.026 0 0 1-.533-.142Zm-.141-3.329L9.13 5.342h1.73l-.192 6.713H9.322Zm.667 7.935a4.6 4.6 0 0 1-3.27-1.354l-5.367-5.365a4.634 4.634 0 0 1 0-6.542l5.367-5.365a4.626 4.626 0 0 1 6.54 0l5.366 5.364a4.627 4.627 0 0 1 0 6.542l-5.364 5.365a4.6 4.6 0 0 1-3.272 1.355Zm0-18.73a3.353 3.353 0 0 0-2.386.988L2.237 7.614a3.375 3.375 0 0 0 0 4.772l5.366 5.366a3.46 3.46 0 0 0 4.771 0l5.365-5.366a3.374 3.374 0 0 0 0-4.772L12.374 2.25A3.349 3.349 0 0 0 9.99 1.26Z"></path>
                                                  </svg>
                                                      <div><p className='mt-3 me-2 text-text'>Unspoiler</p></div>
                                                </li>
                                              }
                                              {isSpoiler !== undefined && !isSpoiler &&
                                                <li className="drop-down-item ps-3 dropdown-list-post-control d-flex align-items-center" onClick={()=> setIsSpoiler(!isSpoiler)} >
                                                  <svg rpl="" fill="currentColor" height="20" icon-name="spoiler-outline" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M9.463 15.384A1.092 1.092 0 0 1 9.076 15a1.033 1.033 0 0 1-.143-.537c-.002-.186.047-.369.143-.529.093-.16.227-.293.387-.387.16-.097.345-.148.533-.147a1.05 1.05 0 0 1 .537.141 1.076 1.076 0 0 1 .537.921c0 .188-.051.373-.148.535-.096.159-.23.292-.39.386a1.042 1.042 0 0 1-.536.143 1.026 1.026 0 0 1-.533-.142Zm-.141-3.329L9.13 5.342h1.73l-.192 6.713H9.322Zm.667 7.935a4.6 4.6 0 0 1-3.27-1.354l-5.367-5.365a4.634 4.634 0 0 1 0-6.542l5.367-5.365a4.626 4.626 0 0 1 6.54 0l5.366 5.364a4.627 4.627 0 0 1 0 6.542l-5.364 5.365a4.6 4.6 0 0 1-3.272 1.355Zm0-18.73a3.353 3.353 0 0 0-2.386.988L2.237 7.614a3.375 3.375 0 0 0 0 4.772l5.366 5.366a3.46 3.46 0 0 0 4.771 0l5.365-5.366a3.374 3.374 0 0 0 0-4.772L12.374 2.25A3.349 3.349 0 0 0 9.99 1.26Z"></path>
                                                  </svg>
                                                  <div><p className='mt-3 me-2 text-text'>Spoiler</p></div>
                                                </li>
                                              }
                                          </ul>    
                                      </div>
              }
      </div>
      <ReportReason reportType={"post"} postId={props._id} show={isReportReasonModalOpen} showExtraReasons={handleShowExtraReasons} setReportReason={handleSetReportReason} showSubmittedReport={handleShowSubmittedReport} onHide={() => setReportReasonModalOpen(false)} />
      <ReportSubmitted username={props.username} show={isReportSubmittedModalOpen} onHide={() => setReportSubmittedModalOpen(false)} />
      <ReportExtraReason reportType={"post"} postId={props._id} showSubmittedFinalReport={showSubmittedFinalReport} backToReasonModal={handleBackToReasonModal} show={isExtraReasonModalOpen} reportReason={reportReason} onHide={() => setExtraReasonModalOpen(false)} />
    </>
  );
}

export default PostControl;