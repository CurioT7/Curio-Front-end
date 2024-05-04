import axios from "axios";


const hostUrl = import.meta.env.VITE_SERVER_HOST;


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
  return response;
}
  catch(error){
    console.error(error);
  }
}

export { pollVote };