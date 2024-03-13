import React from "react";
import '../Login/Login.css';

function ForgotUser(){
    return (
        <div className="loginBox">
            <h1>Recover your username</h1>
            <p>Tell us the email address associated with your Curio account,
            <br /> and we’ll send you an email with your username.</p>
            <form action="">
                <div className='loginInput'> 
                    <input type="text" placeholder='Email *' required />
                </div>
                <p>Don't have an email or need assistance logging in? <a href="https://support.reddithelp.com/hc/en-us/sections/360008917491-Account-Security">Get Help</a></p>
                   <a href="#">Sign up</a>   <a href="Login">Log In</a>
                <button type="submit">Email Me</button>
            </form>
        </div>
        );
}

export default ForgotUser;