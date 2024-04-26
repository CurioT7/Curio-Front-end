import React from "react";
import logo from "../../assets/Curio_logo.png";
import profile from "../../assets/avatar_default_6.png";
import './search.css';
import { useNavigate } from 'react-router-dom';


function UserResults(props) {
    const navigate = useNavigate();
    return (
        <div className="d-flex user-widget mb-2 col-6" onClick={() => navigate(`/user/${props.username}`)}>
            <img className='profileImg me-3' src={profile} alt="logo"/>
            <div className="d-flex flex-column align-items-center mt-1">
                <h2 className="user-results">u/{props.username}</h2>
                <p className="karma-results me-auto">{props.karma} karma</p>
            </div>
        </div>
    )
}

export default UserResults;