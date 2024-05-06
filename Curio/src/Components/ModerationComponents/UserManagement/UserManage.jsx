import React from "react";
import Header from "../../../Pages/Moderation/header";
import ModSidebar from "../../../Pages/Moderation/ModerationSidebar/ModSidebar";
import { useEffect } from "react";


function UserManage( props ) {

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    props.hideSidebar();
    return () => {
      props.showSidebar();
    };
  }, []);


  return (
    <div style={{marginTop:"4rem"}}>
    <Header />
    <ModSidebar/>
    <div style={{marginLeft: "17rem" }}>
      <h1>User Management</h1>
      </div>
      </div>
  );
}

export default UserManage;