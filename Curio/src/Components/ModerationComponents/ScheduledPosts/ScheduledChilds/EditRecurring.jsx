import React from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
  } from '@chakra-ui/react'
  import { Button,Input,Select } from "@chakra-ui/react";
  import { FaPencil } from "react-icons/fa6";
  import { TiDocumentText } from "react-icons/ti";
  import DeleteRec from "./DeleteRecurring";
function EditRecurring(props){
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [timeZone,setTimeZone] = React.useState("(GMT+3:00) Africa-Cairo")
    const timeZoneArr =["(GMT+3:00) Africa-Cairo","((GMT+2:00) Europe-Paris","(GMT+2:00) Europe-Vienna"]
    const repeatArr = ["Does not repeat","Hourly","Daily","Weekly","Monthly"]
    const [repeat,setRepeat] = React.useState("Hourly")
    const [dateTime, setDateTime] = React.useState('');

    const handleDateTimeChange = (event) => {
        const localDateTime = new Date(event.target.value);
        const utcDateTime = localDateTime.toISOString().slice(0, -8);
        setDateTime(utcDateTime);
        
        
    };
    return(
        <div>
            <Button className="text-primary" onClick={onOpen} display="flex" gap={1} fontSize="0.75rem" _hover={{background:"none"}}  variant='ghost' padding={1} size={1}><FaPencil/></Button>
            <Modal isCentered size='4xl' isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader className="border-bottom mb-1">Confirm</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <div className="d-flex mb-2 border-bottom justify-content-between align-items-center">
                        <div className='d-flex align-items-center '>
                            <span style={{background:"rgb(248, 248, 248)"}} className='p-4 pt-3 pb-3 rounded m-2'>
                                <TiDocumentText size={25} color='gray'/>
                            </span>
                            <div className='d-flex gap-1 flex-column'>
                            <h6  className='m-0 '> Title</h6>
                            <div className='d-flex gap-1 mt-2'> <b style={{fontSize:"0.8rem"}}>r/Community</b> <p style={{fontSize:"0.8rem"}} className='m-0 '> u/dwd</p></div>
                            
                            </div>
                        </div>
                        <p style={{fontSize:"0.85rem",cursor:"pointer"}} className="m-0 fw-bold text-secondary">Edit Post</p>
                    </div>
                    <div>
                        <p>When do you want to submit this post</p>
                        <div className="row gap-3">
                            <div className="col">
                            <Input placeholder='Select Date and Time' size='md' type='datetime-local' value={dateTime} onChange={handleDateTimeChange} />
                            </div>
                            <div className="col">
                                <span className="d-flex  "> <p  className="m-0">Time Zone: </p>
                                    <Select value={timeZone} >
                                    {timeZoneArr.map((time,index)=>{
                                        return(
                                            <option key={index} value={time}>{time}</option>
                                        )
                                    })}
                                    </Select> 
                                </span>
                            </div>
                            <div className="">
                                <Select width='fit-content' value={repeat}  size='md' mt={3}>
                                    {repeatArr.map((rep,index)=>{
                                        return(
                                            <option key={index} value={rep}>{rep}</option>
                                        )
                                    })}
                                </Select>
                            </div>
                        </div>
                        
                    </div>
                </ModalBody>

                <ModalFooter display='flex' justifyContent='space-between' borderBottomRadius={5} bg='rgb(237, 239, 241)'>
                    <DeleteRec onClose={onClose}/>
                    <div>
                        <Button size='md' borderRadius={20} variant='outline' colorScheme='blue' mr={3} onClick={onClose}>
                            cancel
                        </Button>
                        <Button size='md' onClick={onClose} colorScheme="blue" borderRadius={20}  >Update</Button>
                    </div>
                    
                </ModalFooter>
            </ModalContent>
            </Modal>
        </div>
    )
}


export default EditRecurring;