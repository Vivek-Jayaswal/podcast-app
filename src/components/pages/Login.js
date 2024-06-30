import { useState } from "react";
import Button from "../commo-components/Button/button.js"
import InputComponent from "../commo-components/Input/input";
import "./login-component.scss"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase.js";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setUser } from "../../slices/userSlice.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const Login = ({ setFlag, flag }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        console.log("handle login");
        setLoading(true)
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            )
            
            const user = userCredential.user;
            const userDoc = await getDoc(doc(db, "users", user.uid));
            const userData = userDoc.data();
            dispatch(setUser({
                name: userData.name,
                email: userData.email,
                uid: userData.uid,
            }))
            setLoading(false);
            toast.success("Login Successfull")
            navigate("/profile");
        } catch (error) {
            toast.error(error.message);
            setLoading(false);
        }
    }
    return (
        <div className="login-container">
            <InputComponent
                type={"email"}
                value={email}
                setState={setEmail}
                placeholder={"Enter your email"}
                required={true}
            />
            <InputComponent
                type={"password"}
                value={password}
                setState={setPassword}
                placeholder={"Password"}
                required={true}
            />
            <Button text={loading ? "Loading..." : "Login"} disabled={loading} onClick={handleLogin} />
            <p className="logi-flag-btn">If you don't have an account <button type="link" onClick={() => setFlag(!flag)}>Sign up</button></p>
        </div>
    )
}

export default Login;