import { Link } from "react-router-dom";
import { auth } from "../Config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {useNavigate} from 'react-router-dom'


export const NavBar = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate()

  const handleSignOut = async () => {
   await auth.signOut()
   navigate('/Login')
  }

  return (
    <div className="navbar">
      <div className="links">
       {user &&  <Link to="/">Home</Link>}
        <Link to="/Login">Login</Link>     
        {user && <Link to="/CreatePost">Create Post</Link>}
      </div>

      <div className="user">
        {user && ( <>
            <p>{user?.displayName}</p>
        <img src={user?.photoURL || ""} width={50} height={50}></img>
        <button onClick={handleSignOut}>Log out</button></>
        )}
      </div>
    </div>
  );
};
