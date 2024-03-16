import Email from "../../Components/emailSettings/Email";
import UserSetting from "../../Components/UserSetting/UserSetting";

function EmailSettings (){
    return(
        <div>
            <UserSetting/>
            <Email/>
        </div>
    )
}

export default EmailSettings;