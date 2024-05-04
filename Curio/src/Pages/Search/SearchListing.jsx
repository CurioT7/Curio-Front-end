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

function SearchListing ()  {
    const [value, setValue] = React.useState('Relevance')
    const[icon,setIcon] = React.useState(<BsRocket fontSize={18} />)
    const [isOpen, setIsOpen] = React.useState(false);
    const handleClose = () => {
        setIsOpen(false);
      };
    function changeListVal(val){
        setValue(val)
        if(val === 'Relevance') setIcon(<BsRocket fontSize={18} />)
        if(val === 'Hot') setIcon(<HiOutlineFire fontSize={18} />)
        if(val === 'Top') setIcon(<TbArrowBigUpLines fontSize={18} />)
        if(val === 'New') setIcon(<LuBadge fontSize={18} />)
        if(val === 'Most Comments') setIcon(<BsArrowUpRightCircle fontSize={18} />)
        handleClose();
    }

  return (
    <div className='search-sorting'>
        <p> Sort By:</p>
        <Popover isOpen={isOpen} onClose={handleClose} >
            <PopoverTrigger>
                <Button variant='ghost' onClick={() => setIsOpen(true)}  borderRadius={20} size='sm'> <span className='fw-normal d-flex gap-2'> {icon} {value}</span> </Button>
            </PopoverTrigger>
            <PopoverContent margin={0} padding={0}  width='fit-content' className='shadow'>
                <PopoverBody margin={0} padding={0} className='search-sorting-content' >
                    <Text margin={0} padding={0} onClick={()=>changeListVal('Relevance') }><div className=' search-sorting-item'><BsRocket fontSize={18} /><span>Relevance</span></div></Text>
                    <Text margin={0} padding={0} onClick={()=>changeListVal('Hot')}><div className=' search-sorting-item'><HiOutlineFire fontSize={18} /><span>Hot</span></div></Text>
                    <Text margin={0} padding={0} onClick={()=>changeListVal('Top')}><div className=' search-sorting-item'><TbArrowBigUpLines fontSize={18} /><span>Top</span></div></Text>
                    <Text margin={0} padding={0} onClick={()=>changeListVal('New')}><div className=' search-sorting-item'><LuBadge fontSize={18}/><span>New</span></div></Text>
                    <Text margin={0} padding={0} onClick={()=>changeListVal('Most Comments')}><div className=' search-sorting-item'><BsArrowUpRightCircle fontSize={18}/><span>Most Comments</span></div></Text>
                </PopoverBody>
            </PopoverContent>
        </Popover>
        {(value==="Relevance"||value==="Top"||value==="Most Comments") &&<Popover>
            <PopoverTrigger>
            <Button variant='ghost' borderRadius={20} size='sm'><span className='fw-normal'>Trigger</span> </Button>
            </PopoverTrigger>
            <PopoverContent margin={0} padding={0}  width='fit-content' className='shadow'>
                <PopoverBody margin={0} padding={0} className='search-sorting-content' >
                    <Text margin={0} padding={0} ><div className=' search-sorting-item'><span>Relevance</span></div></Text>
                    <Text margin={0} padding={0}><div className=' search-sorting-item'><span>Hot</span></div></Text>
                    <Text margin={0} padding={0}><div className=' search-sorting-item'><span>Top</span></div></Text>
                    <Text margin={0} padding={0}><div className=' search-sorting-item'><span>New</span></div></Text>
                    <Text margin={0} padding={0}><div className=' search-sorting-item'><span>Most Comments</span></div></Text>
                </PopoverBody>
            </PopoverContent>
        </Popover>}
        <hr className=' ' style={{backgroundColor: "rgb(90, 111, 118)"}}></hr>
    </div>
  )
}

export default SearchListing
