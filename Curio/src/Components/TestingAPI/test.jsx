import React, { useEffect, useState } from "react";
import axios from "axios";

const hostUrl = import.meta.env.VITE_SERVER_HOST;

function Test(props) {
  const [id, setId] = useState(null);


  useEffect(() => {
    props.hideSidebar();
  }, []);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const username = 'your_username'; // replace with the actual username
        const token = 'your_token'; // replace with the actual token
        const response = await axios.post(`${hostUrl}/api/v1/me/friends/${username}`, {}, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        setId(response.data); // Access the 'id' attribute
        if(response.data){
          console.log(response.data)
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      {id}
    </div>
  );
}

export default Test;