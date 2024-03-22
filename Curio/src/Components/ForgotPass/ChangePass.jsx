import React, { useState } from 'react';
import { changePassword } from '../Login/LoginEndpoints';
import '../Login/Login.css';

function ChangePass({ setChangePass }) {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleChangePassword = async (event) => {
        event.preventDefault();

        try {
            const response = await changePassword(password, newPassword);
            console.log('Success:', response);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
       <>
       
         <button className='backButton'onClick={() => setForgotPass(false)} >
        <svg rpl="" fill="currentColor" height="20" icon-name="back-outline" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 9.375H2.51l7.932-7.933-.884-.884-9 9a.625.625 0 0 0 0 .884l9 9 .884-.884-7.933-7.933H19v-1.25Z"></path>
        </svg>
        </button>
        <div>
        <h3> UI not completed yet</h3>
       </div>

         <div className='loginBox'>

            <h3>Change Password</h3>
            <form onSubmit={handleChangePassword}>
                <div className="loginInput">
                <input type="password"
                placeholder='New Password *'
                 value={password} 
                 onChange={(e) => setPassword(e.target.value)} 
                 />

                    </div> 
                   <div className="loginInput">
                     <input type="password" 
                     placeholder="Confirm Password *" 
                     value={newPassword} 
                     onChange={(e) => setNewPassword(e.target.value)} />
                </div>

                <div className='resetPass'>
                <button onClick={() => setChangePass(false)}>Reset Password</button>
                </div>
            </form>
        </div> 
        </>
    );
    
}

export default ChangePass;