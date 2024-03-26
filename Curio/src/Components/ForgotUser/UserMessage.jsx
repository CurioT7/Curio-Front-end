import React from 'react';
import '../Login/Login.css';
import Modal from 'react-modal';

function UserMessage({ setUserMessage }) {
    return (
        <>
            <button className='backButton' onClick={() => setUserMessage(false)}>
                <svg fill="currentColor" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 9.375H2.51l7.932-7.933-.884-.884-9 9a.625.625 0 0 0 0 .884l9 9 .884-.884-7.933-7.933H19v-1.25Z"></path>
                </svg>
            </button>

            <div className='messageBox'>
               <svg rpl="" class="pb-md" fill="currentColor" height="32" icon-name="inbox-outline" viewBox="0 0 20 20" width="32" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.987 3.636a1.627 1.627 0 0 0-1.624-1.623L1.626 2A1.627 1.627 0 0 0 0 3.625v12.75A1.627 1.627 0 0 0 1.625 18h16.749A1.629 1.629 0 0 0 20 16.373l-.013-12.737ZM1.625 3.25l16.738.013a.375.375 0 0 1 .374.375v1l-7.8 6.8a1.366 1.366 0 0 1-1.941-.025L1.25 4.579v-.954a.375.375 0 0 1 .375-.375Zm17.014 13.39a.376.376 0 0 1-.265.11H1.625a.375.375 0 0 1-.375-.375V6.246l6.888 6.078a2.61 2.61 0 0 0 1.848.762 2.54 2.54 0 0 0 1.8-.732L18.739 6.3l.01 10.078a.376.376 0 0 1-.11.262Z"></path>
                </svg>
               <div>
               <h1>Check your inbox</h1>
                <p>
                You'll get a username recovery email if the address you <br /> provided has been verified.
                </p>
                </div>
            </div>
            <div className='messageFooter'>
                    <p> Didn't receive an email? Check your spam folder or</p>
                <button className='resetByEmail'>  Try Another Email </button>
                </div>
        </>
    );
}

export default UserMessage;