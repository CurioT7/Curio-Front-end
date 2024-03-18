import './child.css'
import Titles from './Titles';
import { Select, Switch, Flex, Spacer, Box } from '@chakra-ui/react'

function DropDown (props){

    
return(
    <Box >
        <Flex className='col'  mb={5}  alignItems='center'>
        {props.isSort &&  <Titles title="Community content sort"
                    description="Choose how you would like content organized in communities you visit. This will not affect global feeds such as Home, or Popular."/> }
        {props.isGlobal &&  <Titles title="Global content view"
                    description="Choose how you would like content displayed in feeds. This control is also found above your feed."/> }
           
            <Spacer/>
            <Select className="fw-bold " textAlign={[ 'left', 'center' ]}  variant='unstyled' onChange={props.onChangeSort} value={props.value} size='xs' width='fit-content'  textTransform="uppercase" >
               
                    {props.isSort && <>
                        <option className='fw-bold' value='Hot' >Hot</option>
                        <option className='fw-bold' value='New' >New</option>
                        <option className='fw-bold' value='Top' >Top</option>
                        <option className='fw-bold' value='Rising' >Rising</option>
                        
                         </>}
                         {props.isGlobal && <>
                            <option className='fw-bold' value='Card' >Card</option>
                            <option className='fw-bold' value='Classic' >Classic</option>
                            <option className='fw-bold' value='Compact' >Compact</option>
                            
                        
                         </>}
            </Select>
                        
        </Flex>

        <Flex ms={5} className='col'  mb={5}  alignItems='center'>
          <Titles title="Remember per community"
                    description="Enable if you would like each community to remember and use the last content sort you selected for that community."/>
            <Spacer/>
            
            <Switch size='lg' isChecked={props.isChecked} onChange={props.onChangeRemember}></Switch>
            
        </Flex>
    </Box>
)

}

export default DropDown;