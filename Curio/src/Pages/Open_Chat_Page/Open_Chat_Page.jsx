import React, { useEffect, useState } from "react";
import OpenChatCom from "../../Components/OpenChat/OpenChatComLeft_Side/OpenChatComLeft_Side";
import NewChat_Com from "../../Components/OpenChat/OpenChatComRight_Side/NewChat/NewChat";
import "./Open_Chat_Page.css";
import Threads from "../../Components/OpenChat/OpenChatComRight_Side/Threads/Threads";
import LiveChat from "../../Components/OpenChat/OpenChatComRight_Side/LiveChat/LiveChat";
import { useNavigate } from "react-router-dom";
import { chatsOverview } from "./Open_Chat_Page";
import { io } from "socket.io-client";

function Right_Side_Chat(props) {
  const navigate = useNavigate();
  const [recipient, setRecipient] = useState("");
  const [chatsData, setChatsData] = useState(null);
  const [chatId, setChatId] = useState();
  const user = localStorage.getItem("username");
  console.log("user", user);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  console.log("onlineUsers", onlineUsers);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    props.hideSidebar();
    props.hideNavbar();
    // Fetch chats data and store it in state
    async function fetchChatsData() {
      try {
        const data = await chatsOverview();
        setChatsData(data);
      } catch (error) {
        console.error("Error", error.message);
      }
    }

    fetchChatsData();
    return () => {
      props.showSidebar();
      props.showNavbar();
    };
  }, []);

  useEffect(() => {
    if (!user) return;
    const newsocket = io("http://localhost:3000");
    setSocket(newsocket);
    // return () => {
    //   newsocket.disconnect();
    // };
  }, [user]);

  useEffect(() => {
    if (!socket) return;
    socket.emit("addNewUser", user);
    socket.on("getOnlineUsers", (res) => {
      setOnlineUsers(res);
    });

    return () => {
      socket.off("getOnlineUsers");
    };
  }, [socket]);

  const handleRecipient = (newrecipient) => {
    setRecipient(newrecipient);
  };

  const handleChatId = (newChatID) => {
    setChatId(newChatID);
  };

  return (
    <div className="open-chat-container">
      <div className="side-bar-chat-page">
        <OpenChatCom chatsData={chatsData} handleChatId={handleChatId} />
      </div>
      <div className="right-side-main-chat">
        {props.newPage === "New Chat" ? (
          <NewChat_Com handleRecipient={handleRecipient} />
        ) : props.newPage === "Threads" ? (
          <Threads />
        ) : props.newPage === "Chat" ? (
          <>
            <LiveChat recipient={recipient} chatId={chatId} socket={socket} />
          </>
        ) : null}
      </div>
    </div>
  );
}

export default Right_Side_Chat;
