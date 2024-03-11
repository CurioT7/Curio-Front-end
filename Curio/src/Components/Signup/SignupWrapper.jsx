import React, { useEffect } from "react";
import { useState } from "react";
import SignupInfo from "./SignupInfo";
import UsernameInfo from "./UsernameInfo";


function SignupWrapper({firstSignupStep}){
    const [isSignupInfoModalOpen, setSignupInfoModalOpen] = useState(false);
    const [isUsernameInfoModalOpen, setUsernameInfoModalOpen] = useState(false);
    const [firstStep, setFirstStep] = useState(firstSignupStep);


    useEffect(() => {
        if(firstSignupStep){
            console.log('firstStep', firstStep);
            setSignupInfoModalOpen(true);
        }
    }, [isSignupInfoModalOpen]);

    return(
        <>
            {isSignupInfoModalOpen && <SignupInfo show={isSignupInfoModalOpen} onHide={() => setSignupInfoModalOpen(false)} />}
            {isUsernameInfoModalOpen && <UsernameInfo />}
        </>
    );
}


export default SignupWrapper;