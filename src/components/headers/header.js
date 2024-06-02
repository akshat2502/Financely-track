import "./style.css";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userImg from "../../assets/users.svg";

function Header() {

    const [user, loading] = useAuthState(auth);
    const navigate= useNavigate();

    function logoutfunc() {
     try {
        signOut(auth).then(() => {
            navigate("/");
        }).catch((error) => {
          toast.error("Sorry, Facing some issue")
        });
        
     } catch (error) {
        toast.error(error.message);
     }   
    }

    useEffect(()=>{
        if(user){
            navigate("/dashboard");
        }
    },[user,loading])

    return <div className="navbar">
        <p className="logo">Financely</p>
        {user && 
        (<div style={ {display: "flex", alignItems: "center", gap:"0.75rem"} }>
            <img 
            src={user.photoURL? user.photoURL: userImg} 
            style={{borderRadius: "50%", height: "1.6rem", width: "1.6rem"}}/>
            <p className="logo link" onClick={logoutfunc}>Logout</p>
            </div>
        )}
    </div>
}

export default Header;
