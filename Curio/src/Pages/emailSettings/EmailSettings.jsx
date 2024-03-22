import Email from "../../Components/emailSettings/Email";
import UserSetting from "../../Components/UserSetting/UserSetting";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

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
            <UserSetting/>
            <Email/>
        </div>
    )
}

export default EmailSettings;