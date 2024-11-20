import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { useParams } from "react-router-dom";
import M from "materialize-css"

const UserProfile = () => {
    const [influencerInfo, setInfluencerInfo] = useState(null);
    const [doesFollow, setDoesFollow] = useState(false);
    const { userId } = useParams();
    const { dispatch } = useUser();
    const user = JSON.parse(localStorage.getItem("user"));
    const [isOwner] = useState(user._id === userId)
    // console.log(isOwner)
    
    useEffect(() => {
        const getUserData = async () => {
            try {
                const res = await fetch(`/api/users/${userId}`, {
                    headers: {
                        "Authorization": "Bearer " + user.token,
                    },
                });
                const json = await res.json();
                setInfluencerInfo(json);
                // Set initial doesFollow state
                setDoesFollow(user._id in json.user.followers);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        getUserData();
    }, [user.token, userId, user._id]);

    const handleFollowToggle = async (action) => {
        try {
            const endpoint = action === "follow" ? "follow" : "unfollow";
            const res = await fetch(`/api/users/${endpoint}/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + user.token,
                },
            });
            const json = await res.json();
            if (!res.ok) {
                M.toast({ html: json.error, classes: "#c62828 red darken-3" })
                return
            }
            
            // Update userInfo and doesFollow state
            setInfluencerInfo((prev) => ({
                ...prev,
                user: {
                    ...prev.user,
                    followers: Object.keys(json.influencer.followers),
                    following: Object.keys(json.influencer.following),
                },
            }));

            setDoesFollow(action === "follow");

            // Update global state
            dispatch({
                type: "UPDATE",
                payload: {
                    followers: Object.keys(json.wannabe.followers),
                    following: Object.keys(json.wannabe.following),
                },
            });
        } catch (error) {
            console.log(`Error during ${action}:`, error.message);
        }
    };

    return (
        <>
            {/* {console.log(influencerInfo.user.pic)} */}
            {influencerInfo ? (
                <div className="profile-container">
                    <div className="profile-header-container">
                        <div>
                            <img
                                className="profilePic"
                                alt="profile pic"
                                src={influencerInfo.user.pic}
                            />
                        </div>
                        <div>
                            <h4>{influencerInfo.user.name}</h4>
                            <div className="profile-info-container">
                                <h5>
                                    {influencerInfo.posts.length}{" "}
                                    {influencerInfo.posts.length === 1 ? "Post" : "Posts"}
                                </h5>
                                <h5>
                                    {Object.keys(influencerInfo.user.followers).length}{" "}
                                    {influencerInfo.user.followers.length === 1 ? "Follower" : "Followers"}
                                </h5>
                                <h5>{Object.keys(influencerInfo.user.following).length} Following</h5>
                            </div>
                            {!isOwner && (doesFollow ? (
                                <button
                                    className="btn waves-effect waves-light #64bf56 blue darken-1 toggle-btn"
                                    onClick={() => handleFollowToggle("unfollow")}
                                >
                                    Unfollow
                                </button>
                            ) : (
                                <button
                                    className="btn waves-effect waves-light #64bf56 blue darken-1 toggle-btn"
                                    onClick={() => handleFollowToggle("follow")}
                                >
                                    Follow
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="gallery">
                        {influencerInfo.posts.map((post) => (
                            <img
                                alt={post.title}
                                className="galleryItem"
                                src={post.photo}
                                key={post._id}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <h2>Loading...</h2>
            )}
        </>
    );
};

export default UserProfile;



