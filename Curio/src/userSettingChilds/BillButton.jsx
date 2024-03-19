import { Button } from "@chakra-ui/react";

const BillButton = (props) => {
  return (
    <Button
      style={{
        borderRadius: "30px", // Adjust the value as needed to achieve the desired shape
        padding: "10px 20px", // Adjust padding as needed
        // boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)", // Optional: add a shadow for depth
      }}
      variant='outline'
    >
      {props.name}
    </Button>
  );
};

export default BillButton;