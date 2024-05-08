import axios from 'axios';
const serverHost = import.meta.env.VITE_SERVER_HOST;

export async function fetchMessages(type) {
  try {
    const response = await axios.get(`${serverHost}/api/message/inbox/${type}`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (response.status === 200) {
      return (response.data.messages);
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        console.error('No subreddit found with that name');
      } else {
        console.error('Error retrieving search results');
      }
    } else {
      console.error('Error fetching messages:', error.message);
    }
    return ('');
  }
}


export async function handleUPVoteComments(itemId, upvoted, setUpvoted, setDownvoted) {
  if (upvoted) {
    const response = await axios.post(`${serverHost}/api/vote`, {
      itemID: itemId,
      itemName: "comment",
      direction: 0
    },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
    if (response.status === 200 || response.status === 201) {
      setUpvoted(false);
    }
  } else {
    const response = await axios.post(`${serverHost}/api/vote`, {
      itemID: itemId,
      itemName: "comment",
      direction: 1
    },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
    if (response.status === 200 || response.status === 201) {
      setUpvoted(true);
      setDownvoted(false);
    }
  }
};

export async function handleDownVoteComments(itemId, downvoted, setUpvoted, setDownvoted) {
  if (downvoted) {
    const response = await axios.post(`${serverHost}/api/vote`, {
      itemID: itemId,
      itemName: "comment",
      direction: 0
    },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
    if (response.status === 200 || response.status === 201) {
      setUpvoted(false);
      setDownvoted(false);
    }
  } else {
    const response = await axios.post(`${serverHost}/api/vote`, {
      itemID: itemId,
      itemName: "comment",
      direction: -1
    },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
    if (response.status === 200 || response.status === 201) {
      setUpvoted(false);
      setDownvoted(true);
    }
  }
};



export async function fetchUpvotedMessages() {
  try {
    const response = await axios.get(`${serverHost}/api/user/upvoted`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (response.status === 200) {
      return (response.data.votedComments);
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400) {
        console.error('User not found');
      } else {
        console.error('An unexpected error occurred on the server. Please try again later');
      }
    } else {
      console.error('Error fetching messages:', error.message);
    }
    return ('');
  }
}

export async function fetchDownvotedMessages() {
  try {
    const response = await axios.get(`${serverHost}/api/user/downvoted`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (response.status === 200) {
      return (response.data.votedComments);
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400) {
        console.error('User not found');
      } else {
        console.error('An unexpected error occurred on the server. Please try again later');
      }
    } else {
      console.error('Error fetching messages:', error.message);
    }
    return ('');
  }
}

export async function BlockUserMessages(blockeduser) {
  try {
    const response = await axios.post(`${serverHost}/api/User/block`,{
      usernameToBlock: blockeduser
    }, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        console.error('User to block not found');
      } else if (error.response.status === 403) {
        console.error(`You can't block the user for 24 hours after unblocking them`);
      } else if (error.response.status === 409 ) {
        console.error(`User already blocked`);
      } else {
        console.error('An unexpected error occurred on the server. Please try again later');
      }
    } else {
      console.error('Error fetching messages:', error.message);
    }
    return ('');
  }
}