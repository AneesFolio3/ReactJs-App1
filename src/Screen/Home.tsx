import { auth, db } from "../Config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { getDocs, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Post } from "../Components/Post.tsx/Posts";

export interface IPostData {
  id: string;
  username: string;
  title: string;
  description: string;
}

export const Home = () => {
  const [user] = useAuthState(auth);
  const postsRef = collection(db, "posts");
  const [allPosts, setAllPosts] = useState<IPostData[] | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    const data = await getDocs(postsRef);
    console.log(
      "data===",
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
    setAllPosts(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as IPostData[]
    );
  };

  return (
    <div>
      {allPosts?.map((data) => (
        <Post data={data} />
      ))}
    </div>
  );
};
