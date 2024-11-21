/**
 * @fileoverview Home Page
 * 
 * @description This page contains the logic for getting all of the posts and renders them
 * @dependencies ../components/PostCard
 */
import { useEffect, useState } from "react"
import PostCard from "../components/PostCard";


const Home = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        /**
         * @function fetchAllPosts
         * @description This function sends an API request to retrieve all posts from the server. It updates the component's state with the list of posts after a successful response.
         * 
         * @async
         * @returns {Promise<void>} A promise that resolves when the posts are successfully fetched and the state is updated with the posts.
         * @throws {Error} If there is an error during the fetch request, the error is logged to the console.
         */
        const fetchAllPosts = async () => {
            try {   
                const res = await fetch("/api/posts/allPosts", {
                    headers: {
                        "Authorization": "Bearer " + user.token
                    }
                })
                const json = await res.json()
                setPosts(json.posts)
            } catch (error) {
                console.log({error: error.message})
            }
        }
        fetchAllPosts()
    }, [])

    // render page
    return (
        <div className="home">
            {posts.length > 0 ? (
                posts.map((post) => (
                    <PostCard key={post._id} post={post} allPosts={posts} setPosts={setPosts} />
                ))
            ) : (
                <p>No posts available</p>
            )}
        </div>
        

    )
}

export default Home