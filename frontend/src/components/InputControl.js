import React from "react";
import Styles from "./InputControl.module.css";

  function InputControl({label,...props}){
    return (<div className={Styles.container}>
    {label &&<label>{label}</label>}
        <input type="text" {...props} />
  </div>)
 } 
 export default InputControl;