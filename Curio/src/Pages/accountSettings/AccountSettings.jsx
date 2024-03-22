import Account from "../../Components/accountSettings/AccountSettings";
import UserSetting from "../../Components/UserSetting/UserSetting";
import { useEffect } from "react";
import {useNavigate} from 'react-router-dom';
const AccountSettings = (props) =>{
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
        <Account/>
    </div> 
    )
}

export default AccountSettings;