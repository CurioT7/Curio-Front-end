import {React, useEffect, useState} from "react";
import MessagesNavbar from "../../Components/Messages/MessagesNavbar.jsx";
import InboxTabs from "../../Components/Messages/InboxTabs.jsx";


function MessagesInbox(props) {

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
        props.hideSidebar();
        return () => {
            props.showSidebar();
        }
    }, []);


    return (
        <div style={{ marginTop: "60px" }}>
            <MessagesNavbar />
            <InboxTabs/>
        </div>
    );
}

export default MessagesInbox;