import { Navigate, Outlet } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../../firebase";


const PrivateRoute = ()=>{
    const [user , loading , error] = useAuthState(auth);


    if(loading) {
        return <p>Loading....</p>
    }
    else if(!user || error){
        return <Navigate to="/" replace/>
    }
    else{
        return <Outlet/>
    }

}

export default PrivateRoute;