import { useEffect, useState } from "react"
import PostCard from "../components/PostCard";


const Home = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        const fetchAllPosts = async () => {
            const res = await fetch("/api/posts/allPosts", {
                headers: {
                    "Authorization": "Bearer " + user.token
                }
            })
            const json = await res.json()
            setPosts(json.posts)
        }
        fetchAllPosts()
    }, [])

    console.log(posts)
    return (
        <div className="home">
            {posts.length > 0 ? (
                posts.map((post) => (
                    <PostCard key={post._id} post={post} />
                ))
            ) : (
                <p>No posts available</p>
            )}
        </div>
        

    )
}

export default Home