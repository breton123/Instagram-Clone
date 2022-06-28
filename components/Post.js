import {
    BookmarkIcon,
    ChatIcon,
    DotsHorizontalIcon,
    EmojiHappyIcon,
    HeartIcon,
    PaperAirplaneIcon
} from "@heroicons/react/outline";
import {HeartIcon as HeartIconFilled} from "@heroicons/react/solid";
import { addDoc, collection, onSnapshot, query, serverTimestamp, orderBy, setDoc, doc, deleteDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import Moment from "react-moment";

function Post({ id, username, userImg, img, caption }) {
    const { data: session } = useSession();
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState([]);
    const [hasLiked, setHasLiked] = useState(false);

    useEffect(
        () => onSnapshot(
            query(
                collection(db, "posts", id, "comments"), 
                orderBy("timestamp","desc")), 
                snapshot => setComments(snapshot.docs)), [db, id]);

    useEffect(
        () => onSnapshot(
            collection(db, "posts", id, "likes"),  
            snapshot => setLikes(snapshot.docs)), [db, id]);

    useEffect(() => {
        setHasLiked(
            likes.findIndex((like) => (like.id === session?.user?.uid)) !== -1);
    }, [likes]);

    const likePost = async (e) => {
        if (hasLiked) {
            await deleteDoc(doc(db, "posts", id, "likes", session?.user?.uid));
        } else {
        await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
            username: session.user.username
        });
        }
    };

    console.log(!session);

    const sendComment = async (e) => {
        e.preventDefault();
        const commentToSend = comment;
        setComment("");

        await addDoc(collection(db, "posts", id, "comments"), {
            comment: commentToSend,
            username: session.user.username,
            userImage: session.user.image,
            timestamp: serverTimestamp(),
        });
    };

    return (
        <div className="bg-white my-7 border rounded-sm">
            <div className="flex items-center p-2">
                <img src={userImg} className="rounded-full h-12 w-12 object-contain border p-1 mr-3"></img>
                <p className="flex-1 font-bold">{username}</p>
                <DotsHorizontalIcon className="h-5"/>
            </div>

            <img src={img} className="object-cover w-full"></img>
            <div className="flex justify-between px-4 pt-4">
                <div className="flex space-x-4">
                {session && (
                        hasLiked ? (
                            <HeartIconFilled onClick={likePost} className="postBtn text-red-500" />
                        ) : (
                            <HeartIcon onClick={likePost} className="postBtn"/>
                        )
                        )}
                    
                {session && (
                    <ChatIcon className="postBtn" />
                )}
                    <PaperAirplaneIcon className="postBtn" />
                </div>
                <BookmarkIcon className="postBtn" />
            </div>

            <p className="p-5 truncate">
                {likes.length > 0 && (
                    <p className="font-bold mb-1 -mt-2">{likes.length} likes </p>
                )}
                <span className="font-bold mr-1">{username} </span>
                {caption}
            </p>

            {comments.length > 0 && (
                <div className="ml-5 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
                    {comments.map(comment => (
                        <div key={comment.id} className="flex items-center space-x-2 mb-3">
                            <img src={comment.data().userImage} className="h-7 rounded-full"></img>
                            <p className="text-sm flex-1"><span className="font-bold">{comment.data().username}</span>{" "}{comment.data().comment}</p>
                            <Moment fromNow className="text-xs pr-5">
                                {comment.data().timestamp?.toDate()}
                            </Moment>
                        </div>
                    ))}
                </div>
            )}

            <form className="flex items-center p-4">
                <EmojiHappyIcon className="h-7" />
                <input onChange={e => setComment(e.target.value)} value={comment} type="text" className="border-none flex-1 focus:ring-0" placeholder="Add a comment..."></input>
                <button onClick={sendComment} type="submit" disabled={!comment.trim()} className="font-semibold text-blue-400">Post</button>
            </form>
        </div>
    );
}

export default Post;