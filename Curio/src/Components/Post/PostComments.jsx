import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { Avatar, IconButton, Box, Button } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { LuShare } from "react-icons/lu";
import { SlOptions } from "react-icons/sl";
import Upvotes from "../../styles/icons/Upvotes";
import Downvotes from "../../styles/icons/Downvotes";
import FilledUpvote from "../../styles/icons/FilledUpvote";
import FilledDownvote from "../../styles/icons/FilledDownvote";
import Ellipsis from "../../styles/icons/Elippsis";
import SaveButton from "../../styles/icons/SaveButton";
import ReportPost from "../../styles/icons/ReportPost";
import Hide from "../../styles/icons/Hide";
import ReportReason  from "./ReportReason.jsx";
import ReportSubmitted from "./ReportSubmitted.jsx";
import ReportExtraReason from "./ReportExtraReason.jsx";
import axios from "axios";
import FilledSave from "../../styles/icons/FilledSave";
import Delete from "../../styles/icons/Delete";
import { useNavigate } from "react-router-dom";

function PostComments(props) {
    const [upvoted, setUpvoted] = useState(false);
    const [downvoted, setDownvoted] = useState(false);
    const [isReportReasonModalOpen, setReportReasonModalOpen] = useState(false);
    const [isReportSubmittedModalOpen, setReportSubmittedModalOpen] = useState(false);
    const [isExtraReasonModalOpen, setExtraReasonModalOpen] = useState(false);
    const [reportReason, setReportReason] = useState('');
    const [isSaved, setIsSaved] = useState(false);
    const [isCommentAuthor, setIsCommentAuthor] = useState(false);
    const dropdownRef = useRef(null);

    const toast = useToast();
    const navigate = useNavigate();

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

    const handleOpenReportModal = () => {
        setReportReasonModalOpen(true);
    }
    const handleShowSubmittedReport = () => {
        setShowControls(false);
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

    const [showControls, setShowControls] = useState(false);
    const handleEllipsisClick = () => {
        setShowControls(!showControls);
    };

    const makeCommentUpvoted = () => {
        if (upvoted) {
            setUpvoted(false);
        } else {
            setUpvoted(true);
            setDownvoted(false);
        }
    }
    const makeCommentDownvoted = () => {
        if (downvoted) {
            setDownvoted(false);
        } else {
            setDownvoted(true);
            setUpvoted(false);
        }
    }
    const handleSave = async () => {
        console.log(props.key);
        try{
            var hostUrl = import.meta.env.VITE_SERVER_HOST;
            const response = await axios.post(`${hostUrl}/api/save`, {
                category: "comment",
                id: props.id
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.status === 200){
                toast({
                description: "Comment saved.",
                status: 'success',
                duration: 5000,
                isClosable: true,
                })
                setIsSaved(true);
            }
        }
        catch(err){
            console.log(err);
            if (err.response.status === 400 || err.response.status === 404){
                toast({
                description: "comment already saved.",
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
            category: "comment",
            id: props.id
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
        if (isSaved){
            handleUnsave();
        }
        else{
            handleSave();
        }
    }

    const handleDeleteComment = async () => {
        try{
        var hostUrl = import.meta.env.VITE_SERVER_HOST;
        const response = await axios.delete(`${hostUrl}/api/deletecomments/${props.id}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
        if (response.status === 200){
            toast({
            description: "Comment Deleted",
            status: 'success',
            duration: 5000,
            isClosable: true,
            })
            window.dispatchEvent(new Event('deleteComment'));
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

    useEffect(() => {
        if(localStorage.getItem('username') === props.username){
            setIsCommentAuthor(true);
        }
        else{
            setIsCommentAuthor(false);
        }
        if (props.savedComments.some(comment => comment._id === props.id)){
            setIsSaved(true);
        }
        else {
            setIsSaved(false);
        }
    }, [props.savedComments, props.id, props.username])

    const handleNavigationToUser = () => {
        navigate(`/user/${props.username}`);
    }

    return (
        <>
        <div className="d-flex flex-column">
            <div className="d-flex mb-3">
                <Avatar size='sm' className='me-2' name='Segun Adebayo' src='https://preview.redd.it/snoovatar/avatars/nftv2_bmZ0X2VpcDE1NToxMzdfZWI5NTlhNzE1ZGZmZmU2ZjgyZjQ2MDU1MzM5ODJjNDg1OWNiMTRmZV8yNjYyMzA1MA_rare_fece1052-efb7-4ff4-be96-0aabece1e0fa-headshot.png?width=64&height=64&crop=smart&auto=webp&s=523c745b5c559087b4577764c49f60ad3af2c0c6' />
                <div className="d-flex align-items-center">
                    <p onClick={handleNavigationToUser} className="username-comments-section m-0">{props.username}</p>
                </div>
            </div>
            <div className="d-flex">
                <p className="post-details-content">{props.comment}</p>
            </div>
            <div className="d-flex align-items-center col-md-3 col-8">
                <div className="votes-hover-effect d-flex justify-content-center align-items-center p-3">
                    <button onClick={makeCommentUpvoted} className=" upvotes-footer-button d-flex justify-content-center align-items-center">{!upvoted && <Upvotes />} {upvoted && <FilledUpvote colorFill="#D93A00"/>}</button>
                </div>
                <span className="comment-upvotes">{props.commentUpvotes}</span>
                <div className="votes-hover-effect d-flex justify-content-center align-items-center p-3">
                    <button onClick={makeCommentDownvoted} className=" downvotes-footer-button d-flex justify-content-center align-items-center">{!downvoted && <Downvotes />}{downvoted && <FilledDownvote colorFill="#6A5CFF"/>}</button>
                </div>
                <div>
                    <Button flex='1' style={{backgroundColor: "#ffffff"}} className='post-footer-button me-2 px-3' variant='ghost'  leftIcon={<LuShare />}>
                        <span className='share-post-text'>Share</span>
                    </Button>
                </div>
                <button className="post-dropdown-control d-flex justify-content-center align-items-center p-2" onClick={handleEllipsisClick}>
                    <Ellipsis className="ellipsis-img" />
                </button>
                {showControls && <div className="post-dropdown" ref={dropdownRef} style={{ 
                                                    display: showControls ? 'flex' : 'none',
                                                    flexDirection: 'column',
                                                    alignItems: 'flex-start',
                                                    position: 'absolute',
                                                    backgroundColor: '#FFFFFF',
                                                    borderRadius: '10px',
                                                    boxShadow: '2px 6px 10px rgba(0, 0, 0, 0.4)',
                                                    marginTop: '9.5rem',
                                                    marginLeft: '9rem',
                                                    zIndex: '1'
                                                }}>
                                                    <ul className='drop-down-list w-100 px-0'>
                                                        <li onClick={handleSaveOrUnsave} className="drop-down-item ps-3 dropdown-list-post-control d-flex align-items-center">
                                                                {isSaved ? <FilledSave /> : <SaveButton /> }
                                                                <div className="d-flex align-items-center justify-content-center"><p className='mt-3 text-text d-flex'>{isSaved ? "Remove from save" : "Save"}</p></div>
                                                        </li>
                                                        <li onClick={handleOpenReportModal} className="drop-down-item ps-3 dropdown-list-post-control d-flex align-items-center">
                                                                <ReportPost />
                                                                <div><p className='mt-3 text-text'>Report</p></div>
                                                        </li>
                                                        {isCommentAuthor && 
                                                            <li onClick={handleDeleteComment} className="drop-down-item ps-3 dropdown-list-post-control d-flex align-items-center">
                                                                <Delete />
                                                                <div><p className='mt-3 me-2 text-text'>Delete</p></div>
                                                            </li>
                                                        }
                                                    </ul>   
                                                </div>
                        }
            </div>
        </div>
        <ReportReason postId={props.id} show={isReportReasonModalOpen} reportType={"comment"} showExtraReasons={handleShowExtraReasons} setReportReason={handleSetReportReason} showSubmittedReport={handleShowSubmittedReport} onHide={() => setReportReasonModalOpen(false)} />
        <ReportSubmitted username={props.username} show={isReportSubmittedModalOpen} onHide={() => setReportSubmittedModalOpen(false)} />
        <ReportExtraReason postId={props.id} reportType={"comment"} showSubmittedFinalReport={showSubmittedFinalReport} backToReasonModal={handleBackToReasonModal} show={isExtraReasonModalOpen} reportReason={reportReason} onHide={() => setExtraReasonModalOpen(false)} />
        </>
        
    );
}

export default PostComments;