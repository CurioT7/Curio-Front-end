import ChatAndMessaging from "../../Components/ChatAndMessagingSettings/ChatAndMessaging";
import UserSetting from "../../Components/UserSetting/UserSetting";
import { useEffect } from "react";
function ChatAndMessagingSettings(props){
    useEffect(() => {
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