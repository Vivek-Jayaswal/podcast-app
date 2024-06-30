import { useState } from "react";
import InputComponent from "../commo-components/Input/input.js";
import Button from "../commo-components/Button/button.js"
import "./signup.scss";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db, storage } from "../../firebase.js"
import { doc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setUser } from "../../slices/userSlice.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";



const Signup = ({ setFlag, flag }) => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleSignup = async () => {
        console.log("handle signup");
        setLoading(true);
        if (password === confirmPassword && password.length >= 6) {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                console.log("user : ", user);

                await setDoc(doc(db, "users", user.uid), {
                    name: fullName,
                    email: user.email,
                    uid: user.uid,
                });

                dispatch(setUser({
                    name: fullName,
                    email: user.email,
                    uid: user.uid,
                }))
                setLoading(false)
                toast.success("signup success");
                navigate("/profile");
            } catch (error) {
                setLoading(false);
                toast.error(error.message);
            }
        }
        else {
            setLoading(false);
            if (password !== confirmPassword) {
                toast.error("please make sure your password and confirmed password are same")
            } 
            else if (password.length < 6) {
                toast.error("please make sure your password more then 6 digit long")
            }
        }
    }

    return (
        <div className="signup-container">
            <InputComponent
                type={"text"}
                value={fullName}
                setState={setFullName}
                placeholder={"Full Name"}
                required={true}
            />
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
            <InputComponent
                type={"password"}
                value={confirmPassword}
                setState={setConfirmPassword}
                placeholder={"Confirm Password"}
                required={true}
            />
            <Button text={loading ? "Loading..." : "Signup"} disabled={loading} onClick={handleSignup} />
            <p className="flag-btn">Already have an account <button type="link" onClick={() => setFlag(!flag)}>Login</button></p>
        </div>
    )
}

export default Signup;