import React from "react";
import Styles from "./InputControl.module.css";

  export default function InputControl({label,...props}){
    return (<div className={Styles.container}>
    {label &&<label>{label}</label>}
        <input type="text" {...props} />
  </div>)
 } 

function InputControlForWelcome({label,...props}){
  return (
    <React.Fragment>
  {label &&<label className={Styles.labelForLogin}>{label}</label>}
      <input className={Styles.inputForLogin} {...props} />
      </React.Fragment>
)
} 


 export{InputControlForWelcome};