import React from 'react';
import { useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import CreatePost from "../../Components/CreatePost/CreatePost"
import "./Createpost.css"

function Createpost(props) {
  const navigate = useNavigate();
  useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
       navigate('/login');
      }
      props.hideSidebar();
      return () => {
      props.showSidebar();
      }
    }, []);
  return (
    <div className='container'>
      <div className='row justify-content-evenly'>
        <div className='col-7'>
          <CreatePost/>
        </div>
        <div className='col-2'>
          wfrefvvbgbgrfbwg
        </div>
      </div>
    </div>
  );
}

export default Createpost;
