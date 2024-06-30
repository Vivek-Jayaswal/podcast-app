import { signOut } from "firebase/auth";
import Button from "../commo-components/Button/button.js";
import Header from "../commo-components/header/header.js";
import { useSelector } from "react-redux"
import { auth } from "../../firebase.js";
import { toast } from "react-toastify";

const Profile = () => {
    const user = useSelector((state) => state.user.user);
    
    if(!user){
        return <p>loading....</p>
    }
    
    const handleLogout = () => {
        console.log("logout");
        signOut(auth)
        .then(
            () => {
                toast.success("user logged out!")
            }
        ).catch((error) => {
            toast.error(error.message);
        })
    }

    return (
        <div>
            <Header />
            <h1>{user.name}</h1>
            <h1>{user.email}</h1>
            <h1>{user.uid}</h1>
            <Button onClick={handleLogout} text={"Logout"}/>
        </div>
    )
}

export default Profile;