import UserSetting from "../../Components/UserSetting/UserSetting";
import Feeding from "../../Components/feedSettings/Feeding";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function FeedingSettings(props){
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
            <Feeding/>
        </div>
    )

}

export default FeedingSettings;