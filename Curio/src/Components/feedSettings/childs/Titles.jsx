import 'G:/university/Senior 1/Spring/Software/Project/Code/Front End/Curio-Front-end/Curio/src/Components/style/userSettingsStyle.css'
import {Box} from '@chakra-ui/react'

function Titles(props){
    return(
    <Box className='col-10'>
        <h3 className="headings-settings d-flex fw-500 mb-1">{props.title} </h3> 
        <p className="headings-description fw-normal text-muted">{props.description}</p>
    </Box>
    )
}

export default Titles;