import { useToast } from "@chakra-ui/react";

function Message(message,info){
    const toast = useToast()
    toast({
        description: message,
        status: info,
        duration: 3000,
        isClosable: true,
      })
}
export default Message;