/**
 * @fileoverview Create Post Page
 * 
 * @description This component renders a create post form for existing users, allowing them to create a post and add it to the backend api.
 * 
 * @dependencies react-router-dom, materialize-css
 */

import { useState, useEffect } from "react"
import M from "materialize-css"
import { useNavigate } from "react-router-dom"
import uploadPicCloud from "../helpers"

const CreatePost = () => {
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")
    const navigate = useNavigate()

    // use useEffect so that function is called after uploaded to cloudinary
    useEffect(() => { 
        /**
         * @function createPost
         * @description uses the state variables to send a POST request to the backend API to create a new instagram post
         * 
         * @return {void} Sends a success message upon successful request, or an error message upon failiure
         */
        const createPost = async () => {
            const user = JSON.parse(localStorage.getItem("user"))
            try {
                const res = await fetch(`/api/posts/createpost`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + user.token
                    },
                    body: JSON.stringify({ title, body, image: url })
                })

                const json = await res.json()
                if (json.error) {
                    M.toast({ html: json.error, classes: "#c62828 red darken-3" })
                }
                else {
                    setTitle("")
                    setBody("")
                    setImage("")
                    setUrl("")

                    M.toast({ html: "Created post succesfully!", classes: "#43a047 green darken-1" })

                    navigate("/")
                }
            } catch (error) {
                console.log(error)
            }
        }
        // only call function if url exists
        if (url) {
            createPost()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url])

    /**
     * @function postDetails 
     * @description Verifies that state variables exist and that image is of type image. Then sends a post request to cloudinary to convert image to url.
     * 
     * @returns {void} Sets url state variable upon success, and sends error message upon failiure.
     */
    const postDetails = async () => {
        // verify that all fields are filled
        if (!image || !body || !title){
            M.toast({ html: "All fields must be filled", classes: "#c62828 red darken-3" })
                return
        }

        const secure_url = await uploadPicCloud(image)
        if (!secure_url) {
            return
        }
        else {
            setUrl(secure_url)
        }
    }

    // render page
    return (
        <div className="card input-filled create-post-card input-field">
            <input
                type="text"
                placeholder="title"
                value = {title}
                onChange={(e) => { setTitle(e.target.value) }}
            />
            <input
                type="text"
                placeholder="body"
                value = {body}
                onChange={(e) => { setBody(e.target.value) }}
            />
            <div className="file-field input-field">
            <div className="btn #64bf56 blue darken-1 input-field">
                <span>Upload Image</span>
                    <input className="file-input"
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
            </div>
            </div>
            <button className="btn waves-effect waves-light #64bf56 blue darken-1" onClick={postDetails} >
                    Create Post
                </button>
                </div>
    )
}

export default CreatePost