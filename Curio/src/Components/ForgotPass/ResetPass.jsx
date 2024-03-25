import React, { useState , useEffect } from 'react';
import { changePassword } from '../Login/LoginEndpoints'; 
import  './ResetPass.css'
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'
import logo from "../../assets/Curio_logo.png";

function ResetPass(props) {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [checked, setChecked] = useState(false);

    const handleChangePassword = async (event) => {
        event.preventDefault();

        try {
            const response = await changePassword(password, newPassword);
            console.log('Success:', response);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        props.hideSidebar();
        return () => {
          props.showSidebar();
        };
      }, []);



    return (
        
        <div className='reset-password'>
        <div className='resetBox'>
        
            <form onSubmit={handleChangePassword}>
            <div className='resetText'>
                <img src={logo} alt="Curio Logo" />
            <h3>Reset your password</h3>
            <p>Choose a new password here, then log in to your account.</p>
             </div>
                <div className="resetInput">
                    <input type="password"
                        placeholder='New Password *'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <br />
                <div className="resetInput">
                    <input type="password"
                        placeholder="Verify Password *"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <Checkbox className='termsCheck' checked={!checked} onChange={() => setChecked(checked)} >     
                           Changing your password logs you out of all browsers on your
                           <br /> device(s). Checking this box also logs you out of all apps you  
                           <br /> have authorized.
                </Checkbox>              
                <div className='resetPass'>
                    <button type="submit">Set Password</button>
                </div>
                <br />
                <div className='resetFooter'>
                <a href="#">Sign up •</a> <a href="Login">Log In</a>
                </div>
            </form>

        </div>
        </div>
 
    );
}

export default ResetPass;