import React from "react";
import { Button,Input,InputGroup, InputRightElement,Image } from "@chakra-ui/react";
import LeaveMode from "./ModeratorsChilds/LeaveMod";
import InvMode from "./ModeratorsChilds/InvMode";
import { fetchModerators } from "./ModeratorsChilds/ModeratorsEndPoints";
import { useParams } from 'react-router-dom'
function Moderators() {
  const { Community } = useParams();
  const[moderators,setModerators] = React.useState([]);
  const[role,setRole] = React.useState('');
  const[manageSettings,setManageSettings] = React.useState(false);
  React.useEffect(() => {
    async function fetchAndSetData() {
        const data = await fetchModerators(Community);
        if (data) {
            setModerators(data.moderators);
            data.moderators.map((mod)=>{
              if(mod.username===localStorage.getItem('username')){
                setRole(mod.role);
                setManageSettings(mod.manageSettings);
                return;
              }
            })

        }
    }
    fetchAndSetData();
  } , [Community]);
  return (
    <div className="mt-4 d-flex flex-column gap-3">
      <div className="d-flex justify-content-end gap-2 me-4">
        <LeaveMode />
        <InvMode />
      </div>
      {/* list of moderators */}
      <div className="m-2 me-3">
        <div style={{background:"rgb(237, 239, 241)"}} className="border rounded-top"> 
          <InputGroup size='sm' margin={2}   maxWidth='18rem'>
            <Input focusBorderColor='black' background="white" placeholder="Search" />
            <InputRightElement cursor='pointer'  className="bg-secondary rounded-end" children={<i className="fas fa-search  text-light" />} />
          </InputGroup>
        </div>
        { moderators.map((mod,index)=>(<div key={index} className="d-flex border  justify-content-between align-items-center">
          <div className="d-flex gap-1 ms-3 m-1 align-items-center">
              <Image borderRadius={5} src='https://bit.ly/dan-abramov' boxSize={37} />
              <div>
                <h6 style={{fontSize:"0.9rem"}} > {mod.username}</h6>
                <p className="text-secondary"> {mod.role} </p>
              </div>
          </div>
          <div>
            {(mod.everything || role==="creator") &&<p style={{fontSize:"0.75rem"}} className="text-secondary me-3">everything</p>}
          </div>
        </div>))}
      </div>
      {/* moderators can you edit */}
      {(role==="creator" ||manageSettings) && <div className="d-flex flex-column m-0">
      <p style={{fontSize:"0.85rem",fontWeight:"600"}}>You can edit these moderators </p>
      { moderators.map((mod,index) =>( <div className="m-2  me-3">
        
        <div className="d-flex border  justify-content-between align-items-center">
          <div className="d-flex gap-1 ms-3 m-1 align-items-center">
              <Image borderRadius={5} src='https://bit.ly/dan-abramov' boxSize={37} />
              <div>
                <h6 style={{fontSize:"0.9rem"}} >{mod.username}</h6>
                <p className="text-secondary"> {mod.role} </p>
              </div>
          </div>
          <div >
            <p style={{fontSize:"0.75rem"}} className="text-secondary d-flex gap-1 align-items-center me-3">everything <InvMode role={mod.role} username={mod.username} manageUsers={mod.manageUsers} createLiveChats={mod.createLiveChats} manageSettings={mod.manageSettings} managePostsAndComments={mod.managePostsAndComments} everything={mod.everything} edit={true} /></p>
            
          </div>
        </div>
        
      </div>))} </div>}

      {/* invited moderators */}
      <div className="m-2  me-3">
        <p style={{fontSize:"0.85rem",fontWeight:"600"}}>Invited  Moderators </p>
        <div className="d-flex border  justify-content-between align-items-center">
          <div className="d-flex gap-1 ms-3 m-1 align-items-center">
              <Image borderRadius={5} src='https://bit.ly/dan-abramov' boxSize={37} />
              <div>
                <h6 style={{fontSize:"0.9rem"}} >Username</h6>
                <p className="text-secondary"> 23 days </p>
              </div>
          </div>
          <div >
            <p style={{fontSize:"0.75rem"}} className="text-secondary d-flex gap-1 align-items-center me-3">everything <LeaveMode user="Mostafa" invited={true} /></p>
            
          </div>
        </div>
        
      </div>

    </div>
  );
}

export default Moderators;