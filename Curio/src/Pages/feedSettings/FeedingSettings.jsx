import UserSetting from "../../Components/UserSetting/UserSetting";
import Feeding from "../../Components/feedSettings/Feeding";
import { useEffect } from "react";
function FeedingSettings(props){
    useEffect(() => {
        props.hideSidebar();
      }, []);
    return(
        <div>
            <UserSetting/>
            <Feeding/>
        </div>
    )

}

export default FeedingSettings;