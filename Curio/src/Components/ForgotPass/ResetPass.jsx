import React, { useState } from 'react';
import { changePassword } from '../Login/LoginEndpoints'; 
import Sidebar from '../Sidebar/SidebarComponent.jsx';

function ResetPass() {
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
              <div className='loginBox'>
            <h3>Reset your password</h3>
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
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <div className='resetPass'>
                    <button type="submit">Reset Password</button>
                </div>
            </form>
        </div>
    
        
 
    );
}

export default ResetPass;