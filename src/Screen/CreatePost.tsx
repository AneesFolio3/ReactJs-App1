import { auth } from "../Config/Firebase";
import {useAuthState} from "react-firebase-hooks/auth"
import { CreateForm } from "../Components/CreatePost/CreateForm";

export const CreatePost = () => {
    const [user] = useAuthState(auth)
  return (
    <div className="App">
      <h1>Create Post</h1>
      <CreateForm/>
    </div>
  );
};
