import axios from "axios";


const hostUrl = import.meta.env.VITE_SERVER_HOST;
const token = localStorage.getItem('token');


async function pollVote(_id, votepick){
  try{
  const response = await axios.post(`${hostUrl}/api/pollVote`, {
    postId: _id,
    option: votepick
  },{
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
}
  catch(error){
    console.error(error);
  }
}


async function getPollInfo(postID){
    try{
        const response = await axios.get(`${hostUrl}/api/info?objectID=${postID}&objectType=post`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
       return response.data;
    }
    catch(error){
        console.error(error);
    }
  }

export { pollVote, getPollInfo };