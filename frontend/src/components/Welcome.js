import React from "react";
import GoogleButton from "react-google-button";
import { InputControlForWelcome } from "./InputControl";
import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Styles from "./Welcome.module.css";

function Welcome() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
 const[isRegistered, setIsRegistered]=useState(false);
 
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

  const handleCredentialRegister = async (e) => {
    e.preventDefault();
    console.log("email " + credentials.email);
    console.log("password " + credentials.password);
    try {
      axios
        .post("http://localhost:8000/register", credentials)
        .then((response) => {
          console.log("response+ " + response);
          if (response.data===true) {
            console.log("hello")
            navigate("/resume");
          } else {
            console.log("res  "+response.data)
            setIsRegistered(true);
          }
        }).catch((error)=>{
          console.log("error found "+error);
        });
    } catch (error) {
      console.log("from axios frontend   " + error);
    }
  };

  return (
    <React.Fragment>
   
   

    <div className={Styles.login}>
    {isRegistered?<p className={Styles.errMsg}>Alreday Registered! Login to continue</p>:""}
      <div className={Styles.container}>
        <div className={Styles.colLeft}>
          <div className={Styles.text}>
            <h2>Welcome To ResumeBuilder!</h2>
            <p>
              Create your own resume <br />
              for Free.
            </p>
            <p>
              Already have an account?<br/>
              <Link className={Styles.btn} to="/login">
                Login
              </Link>
            </p>
          </div>
        </div>

        <div className={Styles.colRight}>
          <div className={Styles.loginForm}>
            <h2>Signup</h2>
            <p>
              <InputControlForWelcome
                label="Enter your Email"
                placeholder="example@gmail.com"
                name="email"
                value={credentials.email}
                type="email"
                onChange={(event) =>
                  setCredentials({ ...credentials, email: event.target.value })
                }
              />
            </p>
            <p>
              <InputControlForWelcome
                label="Enter Password"
                placeholder="Password"
                name="password"
                value={credentials.password}
                type="password"
                required
                onChange={(event) =>
                  setCredentials({
                    ...credentials,
                    password: event.target.value,
                  })
                }
              />
            </p>
            <p>
              <button type="submit" className={Styles.loginBtn} onClick={handleCredentialRegister}>
                Register
              </button>
            </p>
            <p>
              <GoogleButton 
              type="light"
              label="Signup with Google"
              onClick={googleAuth} />
            </p>
          </div>
        </div>
      </div>
    </div> 
    {/* :""} */}
    </React.Fragment>
  );
}

export default Welcome;
