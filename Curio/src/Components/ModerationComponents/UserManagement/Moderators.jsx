import React from "react";
import { Button,Input,InputGroup, InputRightElement,Image } from "@chakra-ui/react";

function Moderators() {
  return (
    <div className="mt-4 d-flex flex-column gap-3">
      <div className="d-flex justify-content-end gap-2 me-4">
        <Button fontWeight={700} variant='outline' borderRadius={20} size='sm' colorScheme="blue"> Leave as mod</Button>
        <Button fontWeight={700} borderRadius={20} size='sm' colorScheme="blue"> Invite user as mod </Button>
      </div>

      <div className="m-2 me-3">
        <div style={{background:"rgb(237, 239, 241)"}} className="border rounded-top"> 
          <InputGroup size='sm' margin={2}   maxWidth='18rem'>
            <Input focusBorderColor='black' background="white" placeholder="Search" />
            <InputRightElement cursor='pointer'  className="bg-secondary rounded-end" children={<i className="fas fa-search  text-light" />} />
          </InputGroup>
        </div>
        <div className="d-flex border  justify-content-between align-items-center">
          <div className="d-flex gap-1 ms-3 m-1 align-items-center">
              <Image borderRadius={5} src='https://bit.ly/dan-abramov' boxSize={37} />
              <div>
                <h6 style={{fontSize:"0.9rem"}} >Username</h6>
                <p className="text-secondary"> 23 days </p>
              </div>
          </div>
          <div>
            <p style={{fontSize:"0.75rem"}} className="text-secondary me-3">everything</p>
          </div>
        </div>
      </div>
      
      <div className="m-2  me-3">
      <p style={{fontSize:"0.85rem",fontWeight:"600"}}>You can edit these moderators </p>
        <div className="d-flex border  justify-content-between align-items-center">
          <div className="d-flex gap-1 ms-3 m-1 align-items-center">
              <Image borderRadius={5} src='https://bit.ly/dan-abramov' boxSize={37} />
              <div>
                <h6 style={{fontSize:"0.9rem"}} >Username</h6>
                <p className="text-secondary"> 23 days </p>
              </div>
          </div>
          <div>
            <p style={{fontSize:"0.75rem"}} className="text-secondary me-3">everything</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Moderators;