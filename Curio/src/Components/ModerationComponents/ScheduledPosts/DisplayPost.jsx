import React from 'react'
import { Button } from '@chakra-ui/react'
import { LuClock } from "react-icons/lu";
import { BsArrowClockwise } from "react-icons/bs";
import { TiDocumentText } from "react-icons/ti";
import { FaPencil } from "react-icons/fa6";
import { useParams } from 'react-router-dom';
import PostNow from './ScheduledChilds/PostNow';
import Delete from './ScheduledChilds/DeletePost';
import EditRecurring from './ScheduledChilds/EditRecurring';
function DisplayPost(){
    const [posts, setPosts] = React.useState(["2","3"])
    const [reccuringPosts, setReccuringPosts] = React.useState(["2","3"])
    const { Community } = useParams();
    
    function handleNavigate(){
        
    }
  return (
    <div className='m-3 '>
       <div className='d-flex fixed  justify-content-end '> 
        <Button colorScheme='blue' size='sm'  borderRadius={20} className='mb-3'>Shedule Post</Button>
      </div>
      <h4>Scheduled posts</h4>
      <div className=' row gap-2'>
        <div className='col-lg-8 gap-1 col-12 '>
            {posts.length==0?(
            <div className=' border d-flex flex-column justify-content-center align-items-center'>
                <p className='mt-5 text-secondary'> No scheduled posts in r/community</p>
                <div> <LuClock size={50} color='gray'/></div>
                <p style={{fontSize:"0.8rem",cursor:'pointer'}} className='mt-3 fw-bold text-primary '>SHEDULE POST</p>
            </div>)
            :(<>{posts.map((time,index)=>{ return(<div key={index} className='border mb-2'>
                <div className='d-flex align-items-center ps-2 gap-1 border-bottom'>
                    <LuClock size={20} color='gray'/>
                    <span> 
                    <p style={{fontSize:"0.75rem"}} className='m-0'>
                        This post is scheduled for<b>5/7 @ 7:00pm (GMT+03:00) Africa - Cairo</b>
                    </p>
                    <p style={{fontSize:"0.75rem"}} className='m-0'>
                        Scheduled by <b>/User</b>
                    </p> 
                    </span>
                </div>
                <div className='d-flex align-items-center gap-1'>
                    <span style={{background:"rgb(248, 248, 248)"}} className='p-4 rounded m-1'>
                        <TiDocumentText size={25} color='gray'/>
                    </span>
                    <div className='d-flex gap-1 flex-column'>
                        <h6 className='m-0'> Title</h6>
                        <div className='d-flex gap-1 mt-2'> <b style={{fontSize:"0.75rem"}}>r/Community</b> <p style={{fontSize:"0.75rem"}} className='m-0 text-secondary'> u/dwd</p></div>
                        <div className='d-flex gap-1'> 
                            <PostNow isSubmitted/>
                            <Button onClick={handleNavigate} display="flex" gap={1} fontSize="0.75rem" _hover={{background:"rgb(232, 232, 232)"}}  variant='ghost' padding={1} size={1}><FaPencil/><p style={{fontSize:"0.75rem"}} className='m-0 text-secondary' >edit</p> </Button>
                            <Delete/>
                        </div>
                    </div>

                </div>
            </div>)})}</>)}
        </div>
        <div className='col-lg col-12 me-5'>
                {reccuringPosts.length==0?(<div className='border'>
                    <p style={{fontSize:"0.75rem"}} className='border-bottom p-2 fw-bold'>RECURRING POSTS</p>
                    <div className='d-flex flex-column align-items-center'>
                    <p className=' text-secondary'> No scheduled posts in r/community</p>
                    <div><BsArrowClockwise size={50} color='gray'/></div>
                    <p style={{fontSize:"0.8rem",cursor:'pointer'}} className='mt-3 fw-bold text-primary '>SHEDULE RECURRING POST</p>
                    </div>
                </div>):(
                <div className='border'> 
                    <p style={{fontSize:"0.75rem"}} className='border-bottom p-2 fw-bold'>RECURRING POSTS</p>
                    {reccuringPosts.map((time,index)=>{ return( <div key={index}  className=' gap-1 me-1 ms-2 border-bottom '>
                        <div className='d-flex m-2  justify-content-between'>
                            <div className='d-flex ms-1 align-items-center gap-1 '>
                                <BsArrowClockwise size={20} />
                                <span> 
                                <p style={{fontSize:"0.75rem"}} className='m-0'>
                                    {time}
                                </p>
                                <p style={{fontSize:"0.75rem"}} className='m-0'>
                                    Scheduled by <b>u/User</b>
                                </p> 
                                </span>
                            </div>
                            <EditRecurring/>
                        </div>
                        <div className='d-flex '>
                            <span style={{background:"rgb(248, 248, 248)"}} className='p-2 pe-3 ps-3 rounded m-2'>
                                <TiDocumentText size={25} color='gray'/>
                            </span>
                            <div className='d-flex gap-2 flex-column'>
                            <h6 style={{fontSize:"0.75rem"}} className='m-0  fw-medium'> Title</h6>
                             <p style={{fontSize:"0.75rem"}} className='m-0 fw-light'>r/Community</p> 
                            
                             </div>
                        </div>
                    </div>)})}
                </div>)}
        </div>
      </div>
    </div>
  )
}

export default DisplayPost
