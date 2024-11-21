import { useEffect, useState } from "react";
import M from "materialize-css"
import { useUser } from "../context/UserContext";
import uploadPicCloud from "../helpers";

const ProfileHeader = ({
    influencerInfo,
    setInfluencerInfo,
    doesFollow,
    setDoesFollow,
    isOwner,
    userId
}) => {
    const[image, setImage] = useState("")
    const user = JSON.parse(localStorage.getItem("user"))
    const { dispatch } = useUser()
    

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

    useEffect(() => {
        const uploadPic = async () => {
            const secure_url = await uploadPicCloud(image)
            if (!secure_url) {
                return
            }
            try{
                dispatch({ type: "UPDATE_PIC", payload: secure_url })

                // Update influencerInfo with the new profile pic URL
                setInfluencerInfo((prev) => ({
                    ...prev,
                    user: {
                        ...prev.user,
                        pic: secure_url,  // Update the profile pic URL
                    },
                }));

                // Now call uploadPicBackend with the correct URL
                uploadPicBackend(secure_url)

            } catch (error) {
                console.error(error)
                return
            }
        }

    const uploadPicBackend = async (newPicUrl) => {
        try {
            await fetch("/api/users/updatepic", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",  // Corrected header
                    "Authorization": "Bearer " + user.token
                },
                body: JSON.stringify({
                    pic: newPicUrl  // Use the new URL passed as an argument
                })
            })

            // Handle any further logic after the backend response if needed
        } catch (error) {
            console.log({error: error.message})
        }
    }
        if (image) {
            uploadPic()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [image])

    return (
        <div className="profile-header-container">
                        {/* Profile Picture and Follow Button Container */}
                        <div className="profile-pic-follow-container">
                            <img
                                className="profilePic"
                                alt="profile pic"
                                src={influencerInfo.user.pic}
                            />
                            {!isOwner && (
                                <button
                                    className="btn waves-effect waves-light #64bf56 blue darken-1 toggle-btn"
                                    onClick={() => handleFollowToggle(doesFollow ? "unfollow" : "follow")}
                                >
                                    {doesFollow ? "Unfollow" : "Follow"}
                                </button>
                            )}
                            {isOwner && (
                                <div className="file-field input-field">
                                    <div className="btn #64bf56 blue darken-1">
                                        <span>Update Pic</span>
                                        <input
                                            type="file"
                                            onChange={(e) => setImage(e.target.files[0])}
                                        />
                                    </div>
                                    <div className="file-path-wrapper">
                                        <input className="file-path validate" type="text" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Profile Info */}
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
                        </div>
                    </div>
    )
}

export default ProfileHeader