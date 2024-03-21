import ChatAndMessaging from "../../Components/ChatAndMessagingSettings/ChatAndMessaging";
import UserSetting from "../../Components/UserSetting/UserSetting";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
function ChatAndMessagingSettings(props){
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
            <ChatAndMessaging/>
        </div>
    )
}

export default ChatAndMessagingSettings;