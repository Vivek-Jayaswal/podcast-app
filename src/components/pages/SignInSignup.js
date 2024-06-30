import Header from "../commo-components/header/header.js";
import { useState } from "react";
import Signup from "../pages/Signup.js"
import "./signup.scss"
import Login from "./Login.js";

const SignInSignup = () => {
 
    const [flag , setFlag] = useState(false)
    

    return (
        <div>
            <Header />
            <div className="input-wrapper">
                {!flag ? <h1>Signup</h1> : <h1>Login</h1>}
                {!flag ? <Signup setFlag={setFlag} flag={flag}/> : <Login setFlag={setFlag} flag={flag}/>}
            </div>
        </div>
    )
}
export default SignInSignup;
