import { useToast } from "@chakra-ui/react";

function Toast(props){
    const toast = useToast()
    toast({
        description: props.message,
        status: props.info,
        duration: 3000,
        isClosable: true,
      })
}
export default Toast;