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
    const [image, setImage] = useState("")
    
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

    useEffect(() => {
        const uploadPic = async () => {
    // Check if the file is an image
    if (!image.type.startsWith('image/')) {
        M.toast({ html: "Please upload a valid image file", classes: "#c62828 red darken-3" })
        setImage("")
        return
    }

    try {
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "instaclone")
        data.append("cloud_name", "dgbh16ua3")

        let res = await fetch("https://api.cloudinary.com/v1_1/dgbh16ua3/image/upload", {
            method: "POST",
            body: data,
        })

        const json = await res.json()
        dispatch({ type: "UPDATE_PIC", payload: json.secure_url })

        // Update influencerInfo with the new profile pic URL
        setInfluencerInfo((prev) => ({
            ...prev,
            user: {
                ...prev.user,
                pic: json.secure_url,  // Update the profile pic URL
            },
        }));

        // Now call uploadPicBackend with the correct URL
        uploadPicBackend(json.secure_url)

    } catch (error) {
        console.error(error)
        return
    }
}

const uploadPicBackend = async (newPicUrl) => {
    try {
        console.log("upload pic backend called")

        const res = await fetch("/api/users/updatepic", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",  // Corrected header
                "Authorization": "Bearer " + user.token
            },
            body: JSON.stringify({
                pic: newPicUrl  // Use the new URL passed as an argument
            })
        })

        const json = await res.json()
        console.log(json)

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
        <>
            {influencerInfo ? (
                <div className="profile-container">
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

                    {/* Gallery */}
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
}

export default UserProfile;



