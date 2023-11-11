
import React from 'react'
import GoogleButton from 'react-google-button'
import InputControl from './InputControl'
import axios from 'axios';
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
 
function Welcome() {
   const navigate = useNavigate();
 const [credentials,setCredentials]=useState({email:"",password:""})
  const [credentialsForLogin,setCredentialsForLogin]=useState({email:"",password:""})

    const googleAuth=()=>{
        window.open("http://localhost:8000/auth/google","_self")
        .then(response=>{
          if(response.status==200){
            console.log(response.data);
            navigate("/resume");
          }
        })
    }


  const handleCredentialRegister=async(e)=>{
    e.preventDefault();
    console.log("email "+credentials.email);
    console.log("password "+credentials.password)
    try{
     axios.post("http://localhost:8000/register",credentials)
     .then(response=>{
      console.log("response+ "+response)
      if(response.status==200){
        navigate("/resume");
      }
      else{
        navigate("/")
      }
     })
    }
    catch(error){
        console.log("from axios frontend   "+error);
     }
  }
  const handleCredentialLogin=async(e)=>{
    e.preventDefault();
    console.log("email "+credentialsForLogin.email);
    console.log("password "+credentialsForLogin.password)
    try{
     axios.post("http://localhost:8000/login",credentialsForLogin)
     .then(response=>{
      console.log("response"+response)
      if(response.status==200){
        navigate("/resume");
      };
     })
    }
    catch(error){
        console.log("from axios frontend   "+error);
     }
  }
  return (
    <div>
    <div>Welcome</div>
    <InputControl 
     label="Enter your mailid"
     placeholder="example@gmail.com"
     name="email"
      value={credentials.email}
      onChange={(event) => setCredentials({...credentials,email:event.target.value})} 
     />
     <InputControl 
     label="Enter your Password"
     placeholder="PASSWORD"
     name="password"
      value={credentials.password}
      onChange={(event) => setCredentials({...credentials,password:event.target.value})} 
     />
     <button type="submit" onClick={handleCredentialRegister}>Register</button>

     <InputControl 
     label="Enter your mailid"
     placeholder="example@gmail.com"
     name="email"
      value={credentialsForLogin.email}
      onChange={(event) => setCredentialsForLogin({...credentialsForLogin,email:event.target.value})} 
     />
       <InputControl 
     label="Enter your Password"
     placeholder="PASSWORD"
     name="password"
      value={credentialsForLogin.password}
      onChange={(event) => setCredentialsForLogin({...credentialsForLogin,password:event.target.value})} 
     />
       <button type="submit" onClick={handleCredentialLogin}>Register</button>
    <GoogleButton
     onClick={googleAuth}
  />
  
  </div>
  )
}

export default Welcome
