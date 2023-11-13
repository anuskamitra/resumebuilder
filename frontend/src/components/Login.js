import React from "react";
import GoogleButton from "react-google-button";
import { InputControlForWelcome } from "./InputControl";
import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Styles from "./Welcome.module.css";

function Login() {
  const navigate = useNavigate();
  const [credentialsForLogin, setCredentialsForLogin] = useState({
    email: "",
    password: "",
  });
  const[wrongData,SetWrongData]=useState(false);
  const[showError,setShowError]=useState("");
  const googleAuth = () => {
    window
      .open("http://localhost:8000/auth/google", "_self")
      .then((response) => {
        if (response.status == 200) {
          console.log(response.data);
          navigate("/resume");
        }
      });
  };
  const handleCredentialLogin = async (e) => {
    e.preventDefault();
    console.log("email " + credentialsForLogin.email);
    console.log("password " + credentialsForLogin.password);
    try {
      axios
        .post("http://localhost:8000/login", credentialsForLogin)
        .then((response) => {
          console.log("response" + response);
          if (response.data=="successful") {
            SetWrongData(false);
            navigate("/resume");
          }
          else if(response.data=="notFound"){
              SetWrongData(true);
              setShowError("User Not found!")
          }
          else{
            SetWrongData(true);
            setShowError("Password do not match!")
          }
        });
    } catch (error) {
      console.log("from axios frontend   " + error);
    }
  };

  return (
    <React.Fragment> 
      <div className={Styles.login}>
    {wrongData?<p className={Styles.errMsg}>{showError}</p>:""}
        <div className={Styles.container}>
          <div className={Styles.colLeft}>
            <div className={Styles.text}>
              <h2>Welcome Back!</h2>
              <p>Update or Create your resume <br/>for Free.</p>
              <p>
                Create an account?
                <Link className={Styles.btn} to="/">Signup</Link>
              </p>
            </div>
          </div>

          <div className={Styles.colRight}>
            <div className={Styles.loginForm}>
              <h2>Login</h2>
              <p>
                <InputControlForWelcome
                  label="Enter your Email"
                  placeholder="example@gmail.com"
                  name="email"
                  value={credentialsForLogin.email}
                  required
                  type="email"
                  onChange={(event) =>{
                    setShowError("")
                    setCredentialsForLogin({
                      ...credentialsForLogin,
                      email: event.target.value,
                    })
                  
                   } }
                />
              </p>
              <p>
                <InputControlForWelcome
                  label="Enter Password"
                  required
                  type="password"
                  placeholder="Passport"
                  name="password"
                  value={credentialsForLogin.password}
                  onChange={(event) =>{
                    setShowError("")
                    setCredentialsForLogin({
                      ...credentialsForLogin,
                      password: event.target.value,
                    })
                  }}
                />
              </p>
              <p>
                <button type="submit" className={Styles.loginBtn} onClick={handleCredentialLogin}>
                  Login
                </button>
              </p>

              <p>
                <GoogleButton
                type="light" 
                onClick={googleAuth} />
              </p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Login;
