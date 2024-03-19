import Email from "../../Components/emailSettings/Email";
import UserSetting from "../../Components/UserSetting/UserSetting";
import { useEffect } from "react";
function EmailSettings (props){
    useEffect(() => {
        props.hideSidebar();
      }, []);
    return(
        <div>
            <UserSetting/>
            <Email/>
        </div>
    )
}

export default EmailSettings;