import { useToast } from '@chakra-ui/react';

export function showToast(message){
  const toast = useToast();

  toast({
    description: message,
    status: 'info',
    duration: 3000,
    isClosable: true,
  });
};
