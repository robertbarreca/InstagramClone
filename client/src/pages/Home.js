/**
 * @fileoverview Home Page
 * 
 * @description This page contains the logic for getting all of the posts and renders them
 * @dependencies ../components/PostCard
 */
import { useEffect, useState, useRef } from "react"
import PostCard from "../components/PostCard";


const Home = () => {
    const [posts, setPosts] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 15;
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(posts.length / postsPerPage);
    const topRef = useRef();

    const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
        setCurrentPage(newPage);
    }
    };

    // Scroll to top when currentPage changes
    useEffect(() => {
        if (topRef.current) {
            topRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [currentPosts]);


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
                const res = await fetch(`${process.env.REACT_APP_API_URL}/api/posts/allPosts`, {
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
            <div ref={topRef}/>
            {posts.length > 0 ? (
                <>
                {currentPosts.map((post) => (
                    <PostCard key={post._id} post={post} allPosts={posts} setPosts={setPosts} />
                ))}
                <div className="pagination">
                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    Prev
                    </button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                    Next
                    </button>
                </div>
                </>
            ) : (
                <p>No posts available</p>
            )}
        </div>
    )
}

export default Home