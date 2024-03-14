import React from "react";
import '../Login/Login.css';


function ForgotPass(){
return(
    <div className="loginBox">
    <h1>Reset your password</h1>
    <p>Tell us the username and email address associated with your Reddit account, <br />
    and we’ll send you an email with a link to reset your password.</p>
    <form action="">
        <div className='loginInput'> 
            <input type="text" placeholder='Username *' required />
        </div>
        <div className="loginInput">
        <input type="text" placeholder='Email *' required />

        </div>
        <p>Don't have an email or need assistance logging in? <a href="https://support.reddithelp.com/hc/en-us/sections/360008917491-Account-Security">Get Help</a></p>

              <a href="#">Sign up</a>   <a href="Login">Log In</a>
        <button type="submit">Reset Password</button>
    </form>
</div>
    )
    
}

export default ForgotPass;