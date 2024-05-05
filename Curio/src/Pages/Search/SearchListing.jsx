import React from 'react'
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
  } from '@chakra-ui/react'
import { Button,Text } from '@chakra-ui/react'
import { BsRocket } from "react-icons/bs";
import { HiOutlineFire } from "react-icons/hi";
import { TbArrowBigUpLines } from "react-icons/tb";
import { LuBadge } from "react-icons/lu";
import { BsArrowUpRightCircle } from "react-icons/bs";
import { AiOutlineSchedule } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";


function SearchListing (props)  {
    const [value, setValue] = React.useState('Relevance')
    const [timeInterval, setTimeInterval] = React.useState('All Time')
    const [icon,setIcon] = React.useState(<BsRocket fontSize={18} />)
    const [isOpen, setIsOpen] = React.useState(false);
    const [timeOpen, setTimeOpen] = React.useState(false);
    function handleClose(){
        setIsOpen(false);
      };
    function handleTimeClose (){
        setTimeOpen(false);
    }
    function changeListVal(val){
        setValue(val)
        if(val === 'Relevance') setIcon(<BsRocket fontSize={18} />)
        if(val === 'Hot') setIcon(<HiOutlineFire fontSize={18} />)
        if(val === 'Top') setIcon(<TbArrowBigUpLines fontSize={18} />)
        if(val === 'New') setIcon(<LuBadge fontSize={18} />)
        if(val === 'Most Comments') setIcon(<BsArrowUpRightCircle fontSize={18} />)
        handleClose();
    }

    function changeTimeInterval(val){
        setTimeInterval(val)
        handleClose();
    }
  return (
    <div className='search-sorting'>
        {(props.displaySort==1 || props.displaySort==2 ) &&<p> Sort By:</p>}
        {(props.displaySort==1 || props.displaySort==2 ) &&<Popover isOpen={isOpen} onClose={handleClose} >
            <PopoverTrigger>
                <Button variant='ghost' onClick={() => setIsOpen(true)}  borderRadius={20} size='sm'> <span className='fw-normal text-secondary d-flex gap-2'> {icon} {value} <IoIosArrowDown className='mt-1'/></span> </Button>
            </PopoverTrigger>
            <PopoverContent margin={0} padding={0}  width='fit-content' className='shadow'>
                <PopoverBody margin={0} padding={0} className='search-sorting-content' >
                    <Text margin={0} padding={0} onClick={()=>changeListVal('Relevance') }><div className=' search-sorting-item'><BsRocket fontSize={18} /><span>Relevance</span></div></Text>
                    {props.displaySort==1 &&<Text margin={0} padding={0} onClick={()=>changeListVal('Hot')}><div className=' search-sorting-item'><HiOutlineFire fontSize={18} /><span>Hot</span></div></Text>}
                    <Text margin={0} padding={0} onClick={()=>changeListVal('Top')}><div className=' search-sorting-item'><TbArrowBigUpLines fontSize={18} /><span>Top</span></div></Text>
                    <Text margin={0} padding={0} onClick={()=>changeListVal('New')}><div className=' search-sorting-item'><LuBadge fontSize={18}/><span>New</span></div></Text>
                    {props.displaySort==1 && <Text margin={0} padding={0} onClick={()=>changeListVal('Most Comments')}><div className=' search-sorting-item'><BsArrowUpRightCircle fontSize={18}/><span>Most Comments</span></div></Text>}
                </PopoverBody>
            </PopoverContent>
        </Popover>}
        {((value==="Relevance"||value==="Top"||value==="Most Comments")&& props.displaySort==1) &&<Popover isOpen={timeOpen} onClose={handleTimeClose}>
            <PopoverTrigger>
            <Button variant='ghost' onClick={()=>setTimeOpen(true)} borderRadius={20} size='sm'><span className='fw-normal align-items-center text-secondary d-flex gap-2'><AiOutlineSchedule fontSize={18}/>{timeInterval} <IoIosArrowDown className='mt-1'/></span> </Button>
            </PopoverTrigger>
            <PopoverContent margin={0} padding={0}  width='fit-content' className='shadow'>
                <PopoverBody margin={0} padding={0} className='search-sorting-content' >
                    <Text margin={0} padding={0} onClick={()=>changeTimeInterval('All time')}><div className=' search-sorting-item'><span>All Time</span></div></Text>
                    <Text margin={0} padding={0} onClick={()=>changeTimeInterval('Past Year')}><div className=' search-sorting-item'><span>Past Year</span></div></Text>
                    <Text margin={0} padding={0} onClick={()=>changeTimeInterval('Past Month')}><div className=' search-sorting-item'><span>Past Month</span></div></Text>
                    <Text margin={0} padding={0} onClick={()=>changeTimeInterval('Past 24 Hours')}><div className=' search-sorting-item'><span>Past 24 Hours</span></div></Text>
                    <Text margin={0} padding={0} onClick={()=>changeTimeInterval('Past Hours')}><div className=' search-sorting-item'><span>Past Hours</span></div></Text>
                </PopoverBody>
            </PopoverContent>
        </Popover>}
        <hr className=' ' style={{backgroundColor: "rgb(90, 111, 118)"}}></hr>
    </div>
  )
}

export default SearchListing
