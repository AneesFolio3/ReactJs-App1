
import {signInWithPopup} from 'firebase/auth'
import { auth, provider } from '../Config/Firebase'
import {useNavigate} from 'react-router-dom'



export const Login = () => {

    const navigate = useNavigate()

    const signInWithGoogle = async () => {
       const response = await signInWithPopup(auth,provider)
       if(response){
        navigate('/')
       }
    }

    return(
        <div>
        <p>Sign In with google to Continue</p>
        <button onClick={signInWithGoogle}>Google Sign-In</button>
        </div>
    )
}