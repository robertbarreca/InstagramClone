/**
 * @fileoverview Post Card
 * 
 * @description This file renders all information related to a singular post including, likes, comments, the post title, body and author
 * 
 * @dependencies materialize-css, react-router-dom
 */

import { useState, useRef } from "react";
import M from "materialize-css"
import { Link } from "react-router-dom";

const PostCard = (props) => {
    const post = props.post;
    const user = JSON.parse(localStorage.getItem("user"));
    const [likes, setLikes] = useState(Object.keys(post.likes).length);
    const [hasLiked, setHasLiked] = useState(user._id in post.likes); 
    const [comments, setComments] = useState(post.comments)

    const commentInputRef = useRef();

/**
 * @function likePost
 * @description This function sends an API request to update the likes for the current post. It updates the like count and the user's like status in the component's state after a successful response.
 * @async
 * @returns {Promise<void>} A promise that resolves when the like count is successfully updated, 
 *                           or logs an error if the request fails.
 * @throws {Error} If there is an error during the fetch request, the error is logged to the console.
 */
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

/**
 * @function likePost
 * @description This function sends an API request to update the likes for the current post. It updates the like count and the user's like status in the component's state after a successful response.
 * @async
 * @returns {Promise<void>} A promise that resolves when the like count is successfully updated, 
 *                           or logs an error if the request fails.
 * @throws {Error} If there is an error during the fetch request, the error is logged to the console.
 */
    const unlikePost = async () => {
        try {
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
        } catch (error) {
            console.log({error: error.message})
        }
        
    };

    /**
     * @function deletePost
     * @description This function sends an API request to delete a post. It then update the posts state variable upon success
     * 
     * @async
     * @returns {Promise<void>} A promise that resolves when the like count is successfully updated, or logs an error if the request fails.
     * @throws {Error} If there is an error during the fetch request, the error is logged to the console.
     */
    const deletePost = async () => {
        const res = await fetch(`/api/posts/delete/${post._id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + user.token
            }
        })
        const json = await res.json()
        console.log(json)
        // update posts to rerender page
        const updatedPosts = props.allPosts.filter((p) => p._id !== post._id);
        props.setPosts(updatedPosts)
        M.toast({ html: "Post deleted successfully!", classes: "#43a047 green darken-1" })
    }

/**
 * @function makeComment
 * @description This function sends an API request to add a new comment to the current post. It updates the post's comment section in the component's state with the new comment after a successful response.
 * 
 * @async
 * @returns {Promise<void>} A promise that resolves when the comment is successfully added and the state is updated with the new comment.
 * @throws {Error} If there is an error during the fetch request, the error is logged to the console.
 */
    const makeComment = async () => {
        const text = commentInputRef.current.value;

        if (!text) {
            M.toast({ html: "comments must have text", classes: "#c62828 red darken-3" })
            return
        }

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
            <h5>
                {/* navigate to own profile or other conditionally */}
                <Link
                    to={`/profile/${post.creator._id}`}>
                    {post.creator.name}
                </Link>
                {post.creator._id === user._id &&
                    <i className="material-icons del-btn" onClick={deletePost}>
                        delete
                    </i>}
            </h5>
            <div className="card-image">
                <img alt={post.creator.name + "'s post"} src={post.photo}></img>
            </div>
            {/* display hearts conditionally */}
            <div className="card-content">
                {hasLiked ? (
                    <i className="material-icons heart-icon" onClick={unlikePost}>favorite</i>
                ) : (
                    <i className="material-icons" onClick={likePost}>favorite_border</i>
                )}

                <h6>{likes} likes</h6>
                <h6 className="post-title">{post.title}</h6>
                <p>{post.body}</p>
                {/* comment form */}
                <form onSubmit={
                    (e) => {
                        e.preventDefault()
                        makeComment()
                }}>
                    <input type="text" placeholder="add a comment" ref={commentInputRef}></input>
                </form>
                {/* display comments */}
                {comments && comments.map(comm => {
    return (
        <span key={comm._id}>
            <p>
                <span className="user-label">
                    {/* Check if comm.author is valid */}
                    {comm.author && (
                        <Link to={`/profile/${comm.author._id}`}>
                            {comm.author.name + " "}
                        </Link>
                    )}
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
