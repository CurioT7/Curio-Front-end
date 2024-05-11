/**
 * Function component for scheduling a post.
 * @component
 * @param {Object} props - The component props.
 * @param {Function} props.setDateTime - Function to set the selected date and time.
 * @param {Function} props.setRepeat - Function to set the repeat option.
 * @param {Function} props.setTimeZone - Function to set the selected time zone.
 * @param {Object} props.subreddit - Subreddit data.
 * @module Schedule
 */

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
  import { AiFillSchedule } from "react-icons/ai";
  
  
function Schedule(props){
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [timeZone,setTimeZone] = React.useState("(GMT+3:00) Africa-Cairo")
    const timeZoneArr =["(GMT+3:00) Africa-Cairo","((GMT+2:00) Europe-Paris","(GMT+2:00) Europe-Vienna"]
    const repeatArr = ["Does not repeat","Hourly","Daily","Weekly","Monthly"]
    const [repeat,setRepeat] = React.useState("Hourly")
    const [dateTime, setDateTime] = React.useState('');

    /**
     * Function to handle the change in date and time input.
     * @param {Event} event - The input change event.
     */

    const handleDateTimeChange = (event) => {
        const localDateTime = new Date(event.target.value);
        const utcDateTime = localDateTime.toISOString().slice(0, -8);
        setDateTime(utcDateTime);        
    };
    const submitSchedule = () => {
        props.setDateTime(dateTime);
        props.setRepeat(repeat);
        props.setTimeZone(timeZone);
        onClose();
    }

    return(
        <div>
            <Button className="text-white rounded-end" isDisabled={props.subreddit.community === localStorage.getItem("username") || !props.subreddit.community}  borderRadius={0} onClick={onOpen} display="flex" colorScheme="blue"  gap={1} fontSize="0.75rem"    ><AiFillSchedule size={25}/></Button>
            <Modal isCentered size='4xl' isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader className="border-bottom mb-1 fw-normal">Schedule this post</ModalHeader>
                <ModalCloseButton />
                <ModalBody mb={10}>
                    
                    <div>
                        <p>Submit time</p>
                        <div className="row gap-3">
                            <div className="col">
                            <Input placeholder='Select Date and Time' size='md' type='datetime-local' value={dateTime} onChange={handleDateTimeChange} />
                            </div>
                            <div className="col">
                                <span className="d-flex  "> <p  className="m-0">Time Zone: </p>
                                    <Select value={timeZone} onChange={(e)=>{setTimeZone(e.target.value)}} >
                                    {timeZoneArr.map((time,index)=>
                                        (
                                            <option key={index} value={time}>{time}</option>
                                        )
                                    )}
                                    </Select> 
                                </span>
                            </div>
                            <div >
                                <label htmlFor=" repeat"> Repeat Options</label>
                                <Select id="repeat" width='fit-content' value={repeat} onChange={(e)=>{setRepeat(e.target.value)}}  size='md' mt={3}>
                                    {repeatArr.map((rep,index)=>
                                        (
                                            <option key={index} value={rep}>{rep}</option>
                                        )
                                    )}
                                </Select>
                            </div>
                        </div>
                        
                    </div>
                </ModalBody>

                <ModalFooter display='flex' justifyContent='end' borderBottomRadius={5} bg='rgb(237, 239, 241)'>
                    
                    <div>
                        <Button size='sm' borderRadius={20} variant='outline' colorScheme='blue' mr={3} onClick={onClose}>
                            cancel
                        </Button>
                        <Button size='sm' onClick={submitSchedule} colorScheme="blue" borderRadius={20}  >Apply</Button>
                    </div>
                    
                </ModalFooter>
            </ModalContent>
            </Modal>
        </div>
    )
}


export default Schedule;