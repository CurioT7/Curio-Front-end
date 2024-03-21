import Account from "../../Components/accountSettings/AccountSettings";
import UserSetting from "../../Components/UserSetting/UserSetting";
import { useEffect } from "react";
const AccountSettings = (props) =>{
    useEffect(() => {
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