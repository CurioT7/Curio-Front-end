import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { Flex,Avatar,Box,Heading,IconButton,Text,Image,Button } from '@chakra-ui/react'
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiLike } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi"
import { BiUpvote } from "react-icons/bi";
import { FaRegCommentAlt } from "react-icons/fa";
import { LuShare } from "react-icons/lu";
import { SlOptions } from "react-icons/sl";
import './Post.css'
function Post() {
    return (
        <div>
            <Card className='Post' variant='ghost' >
                <CardHeader>
                    <Flex spacing='4'>
                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                        <Avatar size='sm' name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />

                        <Box>
                        <h6 className='user-name'>User</h6>
                        
                        </Box>
                    </Flex>
                    <IconButton
                        variant='ghost'
                        colorScheme='gray'
                        aria-label='See menu'
                        icon={<SlOptions />}
                    />
                    </Flex>
                </CardHeader>
                <CardBody>
                    <Heading as='h3' size='md'>title</Heading>
                    <Text className='text-body'>
                    With Chakra UI, I wanted to sync the speed of development with the speed
                    of design. I wanted the developer to be just as excited as the designer to
                    create a screen.
                    </Text>
                </CardBody>
                {/* <Image
                    objectFit='cover'
                    src='https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                    alt='Chakra UI'
                /> */}

                <CardFooter
                    display='flex'
                    flexDirection='row'
                    justifyContent='flex-start'
                    flexWrap='wrap'
                    sx={{
                    '& > button': {
                        minW: '136px',
                    },
                    }}
                >   
                    <Box>
                    
                        <Button flex='1' variant='ghost' leftIcon={<BiUpvote />}>
                        7
                        </Button>
                        
                        <Button flex='1' variant='ghost' leftIcon={<BiDownvote />}>
                        1
                        </Button>
                        <Button flex='1' variant='ghost' leftIcon={<FaRegCommentAlt />}>
                        12
                        </Button>
                        <Button flex='1' variant='ghost' leftIcon={<LuShare />}/>
                        
                    </Box>
                    
                </CardFooter>
            </Card>
        </div>
    )
}
export default Post;