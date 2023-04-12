import { IPostData } from "../../Screen/Home";
import {
  doc,
  addDoc,
  getDocs,
  collection,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../../Config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

interface IPostProps {
  data: IPostData | null;
}

interface ILikesData {
  postId: string;
  userId: string;
}

export const Post = (props: IPostProps) => {
  const post = props.data;
  const likesRef = collection(db, "likes");
  const [user] = useAuthState(auth);
  const [likes, setLikes] = useState<ILikesData[] | null>(null);

  //query
  const likeDocs = query(likesRef, where("postId", "==", post?.id));

  const hasUserLiked = likes?.find((data => data.userId === user?.uid))

  useEffect(() => {
    getLikes();
  }, []);

  const getLikes = async () => {
    const res = await getDocs(likeDocs);
    setLikes(
      res.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as unknown as ILikesData[]
    );
  };

  const addLike = async () => {
    await addDoc(likesRef, {
      postId: post?.id,
      userId: user?.uid,
    });
    getLikes();
  };

  const removeLike = async () => {
    const dislikeQuery = query(likesRef, where("postId", "==", post?.id), where("userId", "==", user?.uid));
    const likeToDeleteData = await getDocs(dislikeQuery)
    const likeToDelete = doc(db, 'likes', likeToDeleteData.docs[0].id)
    await deleteDoc(likeToDelete)
    getLikes();
  };

  return (
    <div className="App">
      <div className="title">
        <h1>{post?.title}</h1>
      </div>
      <div className="body">
        <p>{post?.description}</p>
      </div>
      <div className="footer">
        <p>{post?.username}</p>
      </div>
      <div>
        <button onClick={!hasUserLiked ? addLike : removeLike}>{hasUserLiked ? <>&#128077;</> : <>&#128529;</>}</button>
        {/* <button onClick={removeLike}>&#128529;</button> */}
      </div>
      <div>
        {hasUserLiked ?  <p>Likes:{likes?.filter((data) => data.postId === post?.id).length}</p> : <p>No Likes</p>}
       
      </div>
    </div>
  );
};
