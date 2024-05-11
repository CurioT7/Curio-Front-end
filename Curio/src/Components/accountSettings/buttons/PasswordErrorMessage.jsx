/**
 * Renders a password error message component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.text - The error message text to display.
 * @returns {JSX.Element} - The rendered PasswordErrorMessage component.
 */
import { Text } from '@chakra-ui/react'
function PasswordErrorMessage (props){
    return (
        <Text fontSize='xs'color='red'fontWeight='bold'>{props.text}</Text>
    );
};

export default PasswordErrorMessage;