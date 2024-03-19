import { Text } from '@chakra-ui/react'
function PasswordErrorMessage (props){
    return (
        <Text fontSize='xs'color='red'fontWeight='bold'>{props.text}</Text>
    );
};

export default PasswordErrorMessage;