import { Switch, Flex, Spacer, Box } from '@chakra-ui/react'
import Titles from '../feedSettings/childs/Titles';
import 'G:/university/Senior 1/Spring/Software/Project/Code/Front End/Curio-Front-end/Curio/src/Components/style/userSettingsStyle.css'
function Email (){

    return(
        <Box className='container'>
            <Box className='settings-section col'> 
                <Box className="user-settings-header">
                    <h2 className="settings-heading ">Feeding settings</h2>
                    <h3 className="headings-titles text-uppercase fw-bold mb-3">content preferences</h3>
                </Box>
            </Box>
        </Box>
    )
}

export default Email;