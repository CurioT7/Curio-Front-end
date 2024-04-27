import axios from "axios";


async function getFollowers(friends) {
  const hostUrl = import.meta.env.VITE_SERVER_HOST;
  try {
    const response = await axios.get(`${hostUrl}/api/${friends}`, {
      friends: friends,
    },{
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${localStorage.getItem('token')}`
    }
    });
    return response;
  }
    catch(error) {
      console.error('Error:', error);
    }
}

export { getFollowers };