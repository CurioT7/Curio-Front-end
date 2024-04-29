import axios from "axios";


async function getUnreadNotifications() {
  const hostUrl = import.meta.env.VITE_SERVER_HOST;
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
  const hostUrl = import.meta.env.VITE_SERVER_HOST;
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
  const hostUrl = import.meta.env.VITE_SERVER_HOST;
  try{
  const response = await axios.patch(`${hostUrl}/api/notifications/mark-all-viewed`, {
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

export { getUnreadNotifications, getAllNotifications, markAsViweed };


