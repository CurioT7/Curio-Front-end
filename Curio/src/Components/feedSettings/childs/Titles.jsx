import './child.css'
import {Box} from '@chakra-ui/react'

/**
 * Renders a component that displays a title and description for usersettings.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.title - The title to be displayed.
 * @param {string} props.description - The description to be displayed.
 * @returns {JSX.Element} The rendered component.
 */
function Titles(props){
    return(
    <Box className='col-10'>
        <h3 className="headings-settings d-flex fw-500 mb-1">{props.title} </h3> 
        <p className="headings-description fw-normal text-muted">{props.description}</p>
    </Box>
    )
}

export default Titles;