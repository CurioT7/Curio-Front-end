import React from "react";
import { useState, useEffect } from "react";
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
      const response = await axios.delete(`${hostUrl}/api/deletepost/${props._id}`);
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

  return (
    <>
      <div>
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