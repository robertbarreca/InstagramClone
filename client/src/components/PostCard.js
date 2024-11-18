import { useState, useRef } from "react";

const PostCard = (props) => {
    const post = props.post;
    const user = JSON.parse(localStorage.getItem("user"));
    const [likes, setLikes] = useState(Object.keys(post.likes).length);
    const [hasLiked, setHasLiked] = useState(user._id in post.likes); 
    const [comments, setComments] = useState(post.comments)
    // console.log(post.comments)

    const commentInputRef = useRef();

    const likePost = async () => {
        try {
            const res = await fetch(`/api/posts/like/${post._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + user.token,
                },
            });

            if (!res.ok) {
                const errorText = await res.text(); 
                console.error("Error:", errorText);
                return;
            }

            const json = await res.json();
            setLikes(Object.keys(json.likes).length);
            setHasLiked(true); 
        } catch (error) {
            console.error("Fetch error:", error.message);
        }
    };

    const unlikePost = async () => {
        const res = await fetch(`/api/posts/unlike/${post._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + user.token
            }
        });

        const json = await res.json();
        setLikes(Object.keys(json.likes).length);
        setHasLiked(false); 
    };

    const makeComment = async (text) => {
        const res = await fetch(`/api/posts/comment/${post._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + user.token
            },
            body: JSON.stringify({
                text
            })
        })
        const json = await res.json()
        setComments(json.comments)
        // Clear the input field after the comment is posted
        commentInputRef.current.value = '';
    }

    return (
        <div className="card home-card">
            <h5>{post.creator.name}</h5>
            <div className="card-image">
                <img alt={post.creator.name + "'s post"} src={post.photo}></img>
            </div>
            <div className="card-content">
                {hasLiked ? (
                    <i className="material-icons heart-icon" onClick={unlikePost}>favorite</i>
                ) : (
                    <i className="material-icons" onClick={likePost}>favorite_border</i>
                )}

                <h6>{likes} likes</h6>
                <h6>{post.title}</h6>
                <p>{post.body}</p>
                <form onSubmit={
                    (e) => {
                        e.preventDefault()
                        makeComment(e.target[0].value)
                }}>
                    <input type="text" placeholder="add a comment" ref={commentInputRef}></input>
                </form>
                {comments.map(comm => {
                    return (
                        <span key={comm._id}>
                            <p>
                                <span className="user-label">
                                    {comm.author.name + " "}
                                </span>
                                {comm.text}
                            </p>
                        </span>
                    );
                })}
            </div>
        </div>
    );
};

export default PostCard;
