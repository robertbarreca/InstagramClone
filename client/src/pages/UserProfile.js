import { useEffect, useState } from "react"
// import { useUser } from "../context/UserContext"
import { useParams } from "react-router-dom"

const UserProfile = () => {
    const [userInfo, setUserInfo] = useState(null)
    // const { state } = useUser()
    const {userId} = useParams()

    useEffect(() => {
        const getUserPosts = async () => {
            const user = JSON.parse(localStorage.getItem("user"))
            const res = await fetch(`/api/users/${userId}`, {
                headers: {
                    "Authorization": "Bearer " + user.token
                }
            })
            const json = await res.json()
            setUserInfo(json)
            console.log(setUserInfo)
        }
        getUserPosts()    
    }, [userId])

    return (
        <>
            {userInfo ? (
                <div className="profile-container">
                    <div className="profile-header-container">
                        <div>
                            <img className="profilePic" alt="profile pic" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"/>
                        </div>
                        <div>
                            <h4>{userInfo.user.name}</h4>
                            <div className="profile-info-container">
                                <h5>
                                    {userInfo.posts.length}
                                    {userInfo.posts.length === 1 ? " Post" : " Posts"}
                                </h5>
                                <h5>14 Followers</h5>
                                <h5>56 Following</h5>
                            </div>
                        </div>
                    </div>

                    <div className="gallery">
                        {userInfo.posts.map(post => {
                            return (
                                <img alt={post.title} className="galleryItem" src={post.photo } key={post._id} />
                            )
                        })}
                        
                    </div>
                </div>
            ) : <h2>Loading...</h2>}
        </>
        
    )
}

export default UserProfile