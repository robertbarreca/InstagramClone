import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { useParams } from "react-router-dom";

const UserProfile = () => {
    const [influencerInfo, setInfluencerInfo] = useState(null);
    const [doesFollow, setDoesFollow] = useState(false);
    const { userId } = useParams();
    const { dispatch } = useUser();
    const user = JSON.parse(localStorage.getItem("user"));
    
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
                console.log(json)
                // Set initial doesFollow state
                setDoesFollow(Object.keys(json.user.followers).includes(user._id));
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
            console.log(json)
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
            console.error(`Error during ${action}:`, error.message);
        }
    };

    return (
        <>
            {influencerInfo ? (
                <div className="profile-container">
                    <div className="profile-header-container">
                        <div>
                            <img
                                className="profilePic"
                                alt="profile pic"
                                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
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
                            {doesFollow ? (
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
                            )}
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



