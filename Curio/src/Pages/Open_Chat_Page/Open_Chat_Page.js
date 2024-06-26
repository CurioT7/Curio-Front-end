import axios from "axios";
const serverHost = import.meta.env.VITE_SERVER_HOST;
// const io = require("socket.io-client");
import io from "socket.io-client";

export async function CheckUsernaemExist(username) {
  try {
    const responseCheckUsername = await axios.get(
      `${serverHost}/api/chat/checkUsername/${username}`
    );
    return responseCheckUsername.data;
  } catch (error) {
    console.error("Error", error.message);
  }
}

export async function createChatRequest(recipient, message) {
  try {
    const response = await axios.post(
      `${serverHost}/api/chat/create`,
      {
        message: message,
        recipient: recipient,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      console.error("Chat already exists");
    } else if (error.request && error.request.status === 500) {
      console.error("Internal Server error");
    } else {
      console.error("Error", error.message);
    }
  }
}

export async function chatsOverview() {
  try {
    const response = await axios.get(`${serverHost}/api/chat/overview/all`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error", error.message);
  }
}

export async function getChatwholeChat(chatId) {
  try {
    const response = await axios.get(`${serverHost}/api/chat/${chatId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error", error.message);
  }
}

export async function sendMessageRequest(chatId, message, media) {
  try {
    const response = await axios.post(
      `${serverHost}/api/chat/send/${chatId}`,
      {
        message: message,
        media: media,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error", error.message);
  }
}


export async function AboutParticipant(username) {
  try {
    const participantdata = await axios.get(
      `${serverHost}/api/subredditOverview/${username}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      }
    );
    return participantdata.data;
  } catch (error) {
    console.error("Error", error.message);
  }
}
