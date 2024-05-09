import React from 'react'
import { Checkbox } from "@chakra-ui/react";
function InvCheckBox(props){
    const [checked, setChecked] = React.useState(false)
    function handleChange(e) {
        setChecked(e.target.checked)
        props.setChecked(e.target.checked)
        props.onChange(e.target.checked)
    }
    setTimeout(() => {
        setChecked(props.isChecked)
    }, 0);
  return (
    <div>
        <Checkbox disabled={props.denyAccess} isChecked={checked} onChange={handleChange}   >
            {props.label}
        </Checkbox>
        <p style={{fontSize:"0.75rem"}} className="text-secondary ms-4 " >{props.description}</p>
    </div>
  )
}

export default InvCheckBox
