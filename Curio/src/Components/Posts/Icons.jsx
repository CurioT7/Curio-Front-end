import React from "react";
import { IconButton, Tooltip } from "@chakra-ui/react";

function Icons(props) {
  const handleClick = () => {
    if (props.onClick) {
      props.onClick(); // Call the onClick function passed from the parent component
    }
  };

  return (
    <span>
      <Tooltip label={props.label} placement="top">
        <IconButton
          colorScheme="gray"
          aria-label={props.label}
          size="sm"
          variant="ghost"
          icon={<i className={props.icon} />}
          onClick={handleClick} // Add onClick event handler
        />
      </Tooltip>
    </span>
  );
}

export default Icons;
