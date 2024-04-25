import React, { useState , useEffect } from 'react';
import { resetPassword } from '../Login/LoginEndpoints'; 
import  './ResetPass.css'
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'
import logo from "../../assets/Curio_logo.png";
import SignupHandlerForLogin from '../Login/SignupHandlerForLogin.jsx';
import { useParams , useNavigate} from 'react-router-dom';

function ResetPass(props) {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [checked, setChecked] = useState(false);
    const [match, setMatch] = useState(true);
    const {token} = useParams();
    localStorage.setItem('resetToken', token);
    const navigate = useNavigate();

    

    useEffect(() => {
        if(password !== newPassword){
            setMatch(false);
        } else {
            setMatch(true);
        }
    }, [password, newPassword]);



const handleResetPassword = async (event) => {
  event.preventDefault();

  try {
    const response = await resetPassword(password);
    console.log('Success:', response);
    navigate('/login');
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
        
            <form onSubmit={handleResetPassword} className='resetForm'>
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
                        placeholder="Confirm Password *"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)
                        }
                    />
                    {!match && <div>Password does not match</div>}
                </div>
                <Checkbox className='termsCheck' checked={!checked} onChange={() => setChecked(checked)} >     
                           Changing your password logs you out of all browsers on your
                           <br /> device(s). Checking this box also logs you out of all apps you  
                           <br /> have authorized.
                </Checkbox>              
                <div className='resetPass'>
                    <button type="submit" >Set Password</button>
                </div>
                <br />
                <div className='resetFooter'>
                <SignupHandlerForLogin /> <a href="Login"> • Log In</a>
                </div>
            </form>

        </div>
        </div>
 
    );
}

export default ResetPass;