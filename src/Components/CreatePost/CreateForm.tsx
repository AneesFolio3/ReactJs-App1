
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import {addDoc, collection} from 'firebase/firestore'
import {auth, db} from '../../Config/Firebase'
import { useAuthState } from "react-firebase-hooks/auth";
import {useNavigate} from 'react-router-dom'

export const CreateForm = () => {

    const postsRef = collection(db, 'posts')
    const [user] = useAuthState(auth);
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm();

      const schema = yup.object().shape({
        title : yup.string().required("You must add a title."),
        description : yup.string().required("You must add a description.")
      })

      const onSubmit = async(data:any) => {
        console.log(data)
        await addDoc(postsRef,{
            ...data,
            username:user?.displayName,
            id:user?.uid
        })
        reset();
        navigate('/')
      }

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label>Title</label>
          <input placeholder='Title...' {...register('title')} />
          {errors.title && <p style={{color:'red'}}> Title is required.</p>}
        </div>
        <div className="form-control">
          <label>Description</label>
          <textarea  placeholder='Description...' {...register('description', { required: true })} />
          {errors.description && <p style={{color:'red'}}>Description is required.</p>}
        </div>
        <div className="form-control">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};
