import { useState, useEffect } from "react"
import M from "materialize-css"
import { useNavigate } from "react-router-dom"

const CreatePost = () => {
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")
    const navigate = useNavigate()

    useEffect(() => { 
        // send request to backend with created url for picture
        const createPost = async () => {
            try {
                const res = await fetch(`/api/posts/createpost`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("jwt")
                    },
                    body: JSON.stringify({ title, body, image: url })
                })

                const json = await res.json()
                if (json.error) {
                    M.toast({ html: json.error, classes: "#c62828 red darken-3" })
                }
                else {
                    M.toast({ html: "Created post succesfully!", classes: "#43a047 green darken-1" })
                    navigate("/")
                }
            } catch (error) {
                console.log(error)
            }
        }
        if (url) {
            createPost()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url])

    const postDetails = async () => {
        // verify that all fields are filled
        if (!image || !body || !title){
            M.toast({ html: "All fields must be filled", classes: "#c62828 red darken-3" })
                return
        }

        // Check if the file is an image
        if (!image.type.startsWith('image/')) {
            M.toast({ html: "Please upload a valid image file", classes: "#c62828 red darken-3" })
            return
        }
        // add url to cloud if all fields are filled and image is of type image
        try {
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "instaclone")
        data.append("cloud_name", "dgbh16ua3")
        const res = await fetch("https://api.cloudinary.com/v1_1/dgbh16ua3/image/upload", {
            method: "POST",
            body: data,
        })
            const json = await res.json()
        setUrl(json.url)
        } catch (error) {
            console.error(error)
            return
        }
    }
    return (
        <div className="card input-filled create-post-card">
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
            <div className="btn #64bf56 blue darken-1">
                <span>Upload Image</span>
                    <input
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