import React, { useEffect, useState } from 'react';
import "./Sent_Messages_Table.css";


function Sent_Messages() {
    const username = localStorage.getItem('username');

    return (
        <div className='sent_message_table_content'>
            <h5 className='subject_sent_messages'>Subject:</h5>
            <div style={{display:'flex', flexDirection:'column', gap:'18px'}}>
            <span className='sent_message_details'>to <a href="">/u/"to"</a> via /r/"fromsubreddit" <span className='sent_message_time'></span>sent 43 minutes ago</span>
            <span className='message_name_detail'>Message</span>
            </div>
        </div>
    );
}

export default Sent_Messages;
