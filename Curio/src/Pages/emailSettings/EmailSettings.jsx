import Email from "../../Components/emailSettings/Email";
import UserSetting from "../../Components/UserSetting/UserSetting";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./EmailSettings.css"

function EmailSettings (props){
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
    return(
        <div>
          <UserSetting />
          <div className='container'>
            <div className="email-settings">
                <div className="email-settings-section">
                <h2 className='email-settings-heading'>Manage Emails</h2>
                  <Email/>
                </div>
            </div>
          </div>
        </div>
    )
}

export default EmailSettings;