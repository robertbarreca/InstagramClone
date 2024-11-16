import { useEffect, useState } from "react"
import {useUser} from "../context/UserContext"

const Profile = () => {
    const [photos, setPhotos] = useState([])
    const { state } = useUser()
    console.log(state)

    useEffect(() => {
        const getUserPosts = async () => {
            const user = JSON.parse(localStorage.getItem("user"))
            const res = await fetch("/api/posts/myposts", {
                headers: {
                    "Authorization": "Bearer " + user.token
                }
            })
            const json = await res.json()
            setPhotos(json.posts)
        }
        getUserPosts()    
    }, [])

    return (
        <div className="profile-container">
            <div className="profile-header-container">
                <div>
                    <img className="profilePic" alt="profile pic" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"/>
                </div>
                <div>
                    <h4>{state ? state.name: "loading"}</h4>
                    <div className="profile-info-container">
                        <h5>40 Posts</h5>
                        <h5>14 Followers</h5>
                        <h5>56 Following</h5>
                    </div>
                </div>
            </div>

            <div className="gallery">
                {photos && photos.map(pic => {
                    return (
                        <img alt={pic.title} className="galleryItem" src={pic.photo } key={pic._id} />
                    )
                })}
                
            </div>
        </div>
    )
}

export default Profile