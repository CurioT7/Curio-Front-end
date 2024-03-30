// Icon.jsx file
import React from 'react';
import { IconButton, Tooltip } from '@chakra-ui/react';

function Icons(props) {
  return (
    <span>
      <Tooltip label={props.label} placement='top'>
        <IconButton 
          colorScheme='gray' 
          aria-label={props.label}
          size='sm' 
          variant='ghost' 
          icon={<i className={props.icon}/>}
        />
      </Tooltip>
    </span>
  );
}

export default Icons;
