import React, { Component } from 'react'
import './Login.css'


function Login() {
  return (
    <div className = "login-box">
        <form action=" ">
          <h2>Login</h2>
          <div className='login-input'> 
            <input type="text" placeholder='Username *' required />
          </div>
          <div className='login-input'>
          <input type="password" placeholder='Password *' required />
          </div>
          <div className='forgot'>
            <b>Forgot your </b><a href="#">username</a> <b>or</b> <a href="#">password</a>
          </div>

          <div className='sign-up'>
          <b>New to Reddit? </b><a href="#">Sign up</a>
          </div>
          
          <button type="submit">Login</button>
        </form>

      </div>
  )
}

export default Login