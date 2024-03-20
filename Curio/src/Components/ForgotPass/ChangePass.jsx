import React, { useState } from 'react';
import '../Login/Login.css';

function ChangePass({ setChangePass }) {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    return (
       <>
       <div>
        <h1> Not Yet Working</h1>
       </div>
        {/* <button className='backButton'onClick={() => setForgotPass(false)} >
        <svg rpl="" fill="currentColor" height="20" icon-name="back-outline" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 9.375H2.51l7.932-7.933-.884-.884-9 9a.625.625 0 0 0 0 .884l9 9 .884-.884-7.933-7.933H19v-1.25Z"></path>
        </svg>
        </button>
         <div>

            <h1>Change Password</h1>
            <form action="">
                <div className="loginInput">
                    <input
                        type="password"
                        placeholder="New Password *"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password *"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button onClick={() => setChangePass(false)}>Change Password</button>
            </form>
        </div> */}
        </>
    );
    
}

export default ChangePass;