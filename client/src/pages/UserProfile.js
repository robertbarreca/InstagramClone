/**
 * @fileoverview UserProfile
 * @description Fetches a user's profile information and renders it to the scren
 * 
 * @dependencies "react-router-dom, ../components/ProfileHeader, ../components/ProfileGallery"
 */

import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import ProfileHeader from "../components/ProfileHeader";
import ProfileGallery from "../components/ProfileGallery";

const UserProfile = () => {
    const [influencerInfo, setInfluencerInfo] = useState(null);
    const [doesFollow, setDoesFollow] = useState(false);
    const { userId } = useParams();
    const user = JSON.parse(localStorage.getItem("user"));

    
    // Dynamically determine if the profile belongs to the logged-in user
    const isOwner = useMemo(() => user._id === userId, [user._id, userId]);

    useEffect(() => {
        /**
         * @function getUserData
         * @description sends a request to the api to retrieve user data and then sets is in a state variable upon success, otherwise prints the error to the console
         * 
         * @reurns void
         */
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

    
    // render page
    return (
        <>
            {influencerInfo ? (
                <div className="profile-container">
                    <ProfileHeader
                        influencerInfo={influencerInfo}
                        setInfluencerInfo={setInfluencerInfo}
                        doesFollow={doesFollow}
                        setDoesFollow={setDoesFollow}
                        isOwner={isOwner}
                        userId={userId}
                    />

                    {/* Gallery */}
                    <ProfileGallery influencerInfo={influencerInfo}/>
                </div>
            ) : (
                <h2>Loading...</h2>
            )}
        </>
    );
}

export default UserProfile;



