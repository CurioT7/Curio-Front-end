import axios from "axios";


const token = localStorage.getItem("token");

/**
 * Retrieves followers based on the provided friends list.
 *
 * @param {Array} friends - The list of friends to retrieve followers for.
 * @module GetFollowers
 */
async function getFollowers(friends) {
  const hostUrl = import.meta.env.VITE_SERVER_HOST;
  try {
    const response = await axios.get(`${hostUrl}/api/getfriends/followings`, {
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