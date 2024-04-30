import axios from "axios";

const hostUrl = import.meta.env.VITE_SERVER_HOST;
async function getUnreadNotifications() {
  try{
  const response = await axios.get(`${hostUrl}/api/notifications/unread`, {
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response;
  } catch (error) {
    console.error('Error:', error);
  }
}


async function getAllNotifications() {
  try{
  const response = await axios.get(`${hostUrl}/api/notifications/history`, {
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response;
  } catch (error) {
    console.error('Error:', error);
  }
}


async function markAsViweed () {
  try{
  const response = await axios.patch(`${hostUrl}/api/notifications/mark-all-viewed`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response;
  } catch (error) {
    console.error('Error:', error);
  }

}

export { getUnreadNotifications, getAllNotifications, markAsViweed };


